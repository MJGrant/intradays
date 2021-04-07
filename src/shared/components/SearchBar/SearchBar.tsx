import React from 'react'
import { Input, Button } from '@toyota-research-institute/lakefront';

interface ISearchBar {
  symbol: string;
  error: string;
  handleChange: (value: any) => void;
}

const SearchBar: React.FC<ISearchBar> = ({ error, symbol, handleChange }) => {
  return (
    <>
      <Input error={error} type="text" value={symbol} onChange={handleChange} className="space-around no-left-margin"/>
      <Button color="primary" className="space-around no-left-margin">Submit</Button>
      <br/>
      <br/>
    </>
  );
}

export default SearchBar;