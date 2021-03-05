import React, { useState } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import { getTradingData } from '../../../services/api';
interface IForm {
  
}

const Form: React.FC<IForm> = ({}) => {

  const [stockSymbol, setStockSymbol ] = useState('gme');

  const inputStockSymbol = (event: any) => {
    setStockSymbol(event.target.value);
    console.log("User's form input so far: " + event.target.value);
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    console.log("Submitted form with this input: " + stockSymbol);
    let results = await getTradingData(stockSymbol);
    console.log(results);
  }

  return (
    <div>
      <form noValidate onSubmit={ handleSubmit }>
        <SearchBar symbol={stockSymbol} handleChange={inputStockSymbol} />
      </form>
    </div>
  )
}

export default Form;