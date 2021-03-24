import React from 'react'
import { Input, Button } from '@toyota-research-institute/lakefront';

interface ISearchBar {
  symbol: string;
  handleChange: (value: any) => void;
}

const SearchBar: React.FC<ISearchBar> = ({ symbol, handleChange }) => {
  return (
    <>
      <Input type="text" value={symbol} onChange={handleChange} className="space-around no-left-margin"/>
      <Button color="primary" className="space-around">Submit</Button>
      <br/>
      <br/>
    </>
  );
}

export default SearchBar;