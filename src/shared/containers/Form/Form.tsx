import React, { useMemo, useState } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import { getTradingData } from '../../../services/api';
import { processTradingHistory } from '../../../services/utils';
import { Checkbox } from '@toyota-research-institute/lakefront';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Form: React.FC = () => {

  const [stockSymbol, setStockSymbol] = useState('GME');
  const [inputErr, setInputErr] = useState('');
  const [data, setData] = useState({} as any);
  const [loading, setLoading] = useState(false);
  
  const [lowestPoints, setLowestPoints] = useState([] as any);
  const [highestPoints, setHighestPoints] = useState([] as any);

  const [includeLowestPoints, setIncludeLowestPoints] = useState(true);
  const [includeHighestPoints, setIncludeHighestPoints] = useState(true);

  const [includePreMarket, setIncludePreMarket] = useState(true);
  const [includeAfterHours, setIncludeAfterHours] = useState(true);

  const filteredData = useMemo(() => {
    const filtered = data?.lineData?.filter((line: any) => {
      
      // only return premarket if flag is true
      if (includePreMarket) {
        if (line.timestamp <= '08:30:00') {
          return line;
        }
      }

      // always return timestamps during main market hours
      if (line.timestamp >= '08:30:00' && line.timestamp <= '16:00:00') {
        return line;
      }

      // only include afterhours if flag is true
      if (includeAfterHours) {
        if (line.timestamp >= '16:00:00') {
          return line;
        }
      }
    });

    return { data, ...{ lineData: filtered } };
  }, [data, includePreMarket, includeAfterHours]);

  const strokeColors = [
    "#000000",
    "#140503",
    "#290b07",
    "#3d100a",
    "#52150e",
    "#661b12",
    "#7a2015",
    "#8f2519",
    "#a32a1c",
    "#b83020",
    "#cc3523",
    "#d14939",
    "#d65d4f",
    "#e0867b",
    "#db7265",
    "#e69a91",
    "#ebaea7",
    "#f0c2bd",
    "#f5d7d3",
    "#f5d7d3",
    "#f5d7d3",
    "#f5d7d3"
  ];

  const inputStockSymbol = (event: any) => {
    setStockSymbol(event.target.value.toUpperCase());
    console.log("User's form input so far: " + event.target.value);
  }

  const toggleIncludePreMarket = (event: any) => {
    setIncludePreMarket(prevProps => !prevProps);
  }

  const toggleIncludeAfterHours = (event: any) => {
    setIncludeAfterHours(prevProps => !prevProps);
  }

  const toggleIncludeLowestPoints = (event: any) => {
    setIncludeLowestPoints(prevProps => !prevProps);
  }

  const toggleIncludeHighestPoints = (event: any) => {
    setIncludeHighestPoints(prevProps => !prevProps);
  }


  const formatTimestamp = (time: string) => {
    // ex: 09:55:00 to 9:55am
    // ex: 18:15:00 to 6:15pm
    if (time) {
      const [hour, minute] = time.split(':');

      //determine if this is am or pm
      let formattedSuffix = 'pm';
      if (+hour <12 || +hour === 24) {
        formattedSuffix = 'am';
      }

      // turn 24-hour time into 12, ex: "15:00:00" into "03:00"
      let formattedHour = 0;
      if (hour) {
        formattedHour = +hour % 12 || 12;
      }

      return `${formattedHour}:${minute}${formattedSuffix}`;
    } else {
      return time;
    }
  }

  const CustomTooltip = ( props: any ) => {
    if (props.active && props.payload && props.payload.length) {
      //  : ${props.payload[0].value}
      return (
        <div className="custom-tooltip">
          <p className="label">{`${formatTimestamp(props.label)}`}</p>
        </div>
      );
    }
  
    return null;
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    console.log("Submitted form with this input: " + stockSymbol);

    if (stockSymbol.length === 0) {
      setInputErr("Please input a stock symbol");
    } else {
      setInputErr("");

      setLoading(true);
      let rawData = await getTradingData(stockSymbol);
      setLoading(false);

      // format the data that came from the API call
      let processedData = await processTradingHistory(rawData);
      setData(processedData);
      
      let lowestPointsArr = Array.from(processedData.lowestPoints);
      let highestPointsArr = Array.from(processedData.highestPoints);

      console.log(lowestPointsArr);
      setLowestPoints(lowestPointsArr);
      setHighestPoints(highestPointsArr);
    }
    
  }


  const renderDot = (props: any) => {
    const { cx, cy, stroke, dataKey, value } = props;

    if (includeLowestPoints && (value === data.lowestPoints.get(dataKey))) {
      return <rect x={cx-4} y={cy-4} width={8} height={8} fill={stroke} r="5" />;
    }

    if (includeHighestPoints && (value === data.highestPoints.get(dataKey))) {
      return <circle cx={cx} cy={cy} fill={stroke} r="4" />;
    }

    //const showDot = (value === data.lowestPoints.get(dataKey));

    return <></>;
  }

  const renderDollarSign = (label: string) => {
    return `$${label}`;
  }

  return (
    <div>
      <form noValidate onSubmit={handleSubmit}>
        <SearchBar symbol={stockSymbol} handleChange={inputStockSymbol} error={inputErr} />
        {/*
        {
          data.lowestPoints && Array.from(data.lowestPoints, ([key, value]) => {
            return <p key={value}>
              {key} : {value}
            </p>
          })
        }
        {/*
          data.lowestPoints && data.lowestPoints.length > 0 && data.lowestPoints.map((d: any) => (
            <p key={d}>
              {d}
            </p>
          ))
          */}
      </form>

      {loading && !data?.lineData && (
        <div style={{height: 100 }}>LOADING...</div>
      )}

      {data?.lineData?.length > 0 &&
        lowestPoints.length > 0 && 
        <div style={{ height: 500 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              width={500}
              height={300}
              data={filteredData.lineData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="timestamp" tickFormatter={formatTimestamp} />
              <YAxis tickFormatter={renderDollarSign} domain={['dataMin - 10.00', 'dataMax + 15']}/>
              <Tooltip content={ <CustomTooltip />}/>
              <Legend />
              {lowestPoints.map((element: any, index: number) => {
                return <Line 
                          key={'key'+index} 
                          type="monotone" 
                          dataKey={element[0]} 
                          stroke={strokeColors[index]} 
                          dot={renderDot}
                          connectNulls={true}
                        />
              })}

            </LineChart>
          </ResponsiveContainer>
          <Checkbox label="Include pre-market" checked={includePreMarket} onChange={toggleIncludePreMarket}/>
          <Checkbox label="Include after-hours" checked={includeAfterHours} onChange={toggleIncludeAfterHours}/>

          <br/><br/>
          <Checkbox label="Show lowest price of the day" checked={includeLowestPoints} onChange={toggleIncludeLowestPoints}/>
          <Checkbox label="Show highest price of the day" checked={includeHighestPoints} onChange={toggleIncludeHighestPoints}/>
        </div>
      }

    </div>
  )
}

export default Form;