import React, { useState } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import { getTradingData } from '../../../services/api';
import { processTradingHistory } from '../../../services/utils';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Form: React.FC = () => {

  const [stockSymbol, setStockSymbol] = useState('gme');
  const [data, setData] = useState({} as any);
  const [lowestPoints, setLowestPoints] = useState([] as any);

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
    setStockSymbol(event.target.value);
    console.log("User's form input so far: " + event.target.value);
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    console.log("Submitted form with this input: " + stockSymbol);

    // make API call, get trading data for this symbol 
    let rawData = await getTradingData(stockSymbol);
    // console.log(rawData);

    // format the data that came from the API call
    let processedData = await processTradingHistory(rawData);
    setData(processedData);

    let lowestPointsArr = Array.from(processedData.lowestPoints);

    console.log(lowestPointsArr);
    setLowestPoints(lowestPointsArr);
  }

  const formatTimestamp = (time: string) => {
    // ex: 09:55:00 to 9:55am
    // ex: 18:15:00 to 6:15pm
    if (time) {
      const [hour, minute] = time.split(':');
      let formattedHour = 0;
      let formattedSuffix = 'pm';
      if (hour) {
        formattedHour = +hour % 12 || 12;
        if (formattedHour < 12 || hour === '24') {
          formattedSuffix = 'am';
        }
      }
      return `${formattedHour}:${minute}${formattedSuffix}`;
    } else {
      return time;
    }
  }

  const renderDot = (props: any) => {
    const { cx, cy, stroke, dataKey, value } = props;

    const showDot = (value === data.lowestPoints.get(dataKey));

    return showDot ? (
      <circle cx={cx} cy={cy} fill={stroke} r="3" />
    ) : <></>;
  }

  const renderDollarSign = (label: string) => {
    return `$${label}`;
  }

  return (
    <div>
      <form noValidate onSubmit={handleSubmit}>
        <SearchBar symbol={stockSymbol} handleChange={inputStockSymbol} />
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

      {data?.lineData?.length > 0 &&
        lowestPoints.length > 0 && 
        <div style={{ height: 500 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              width={500}
              height={300}
              data={data.lineData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="timestamp" tickFormatter={formatTimestamp} />
              <YAxis tickFormatter={renderDollarSign} domain={['dataMin - 10', 'dataMax + 15']}/>
              <Tooltip />
              <Legend />
              {lowestPoints.map((element: any, index: number) => {
                return <Line key={'key'+index} type="monotone" dataKey={element[0]} stroke={strokeColors[index]} dot={renderDot}/>
              })}

            </LineChart>
          </ResponsiveContainer>
        </div>
      }

    </div>
  )
}

export default Form;