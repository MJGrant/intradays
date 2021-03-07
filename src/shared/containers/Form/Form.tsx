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
    let processedData = processTradingHistory([]);
    setData(processedData);
    console.log(processedData);
  }

  const renderDollarSign = (label: string) => {
    return `$${label}`;
  }

  return (
    <div>
      <form noValidate onSubmit={handleSubmit}>
        <SearchBar symbol={stockSymbol} handleChange={inputStockSymbol} />
        {
          data.map((d: any) => (
            <p>
              {d.timestamp}
            </p>
          ))
        }
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
            <YAxis tickFormatter={renderDollarSign}/>
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Friday 03-05-2021" stroke="#8884d8" />
            <Line type="monotone" dataKey="Thursday 03-04-2021" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>

    </div>
  )
}

export default Form;