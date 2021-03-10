import React, { useState } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import { getTradingData } from '../../../services/api';
import { processTradingHistory } from '../../../services/utils';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface IForm {

}

const Form: React.FC<IForm> = ({ }) => {

  const [stockSymbol, setStockSymbol] = useState('gme');
  const [data, setData] = useState([] as any);

  const inputStockSymbol = (event: any) => {
    setStockSymbol(event.target.value);
    console.log("User's form input so far: " + event.target.value);
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    console.log("Submitted form with this input: " + stockSymbol);
    // commented out API call for now while I work with mock data 
    // let rawData = await getTradingData(stockSymbol);
    // console.log(rawData);
    // we don't pass anything to processTradingData yet, because currently it
    // is using mock data 
    let processedData = await processTradingHistory([]);
    setData(processedData);
    //console.log(processedData);
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
          data && data.length > 0 && data.map((d: any) => (
            <p key={d.timestamp}>
              {d.timestamp}
            </p>
          ))
        }
      */}
      </form>

      <div style={{ height: 500 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" />
            <YAxis tickFormatter={renderDollarSign} domain={['dataMin - 10', 'dataMax + 15']}/>
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="2021-03-04" stroke="#8884d8" />
            <Line type="monotone" dataKey="2021-03-03" stroke="#82ca9d" />
            <Line type="monotone" dataKey="2021-03-02" stroke="#82caff" />
            <Line type="monotone" dataKey="2021-03-01" stroke="#ff66ff" />
          </LineChart>
        </ResponsiveContainer>
      </div>

    </div>
  )
}

export default Form;