import React from 'react'
import { Input, Button } from '@toyota-research-institute/lakefront';

interface ISearchBar {
  symbol: string;
  handleChange: (value: any) => void;
}

const SearchBar: React.FC<ISearchBar> = ({ symbol, handleChange }) => {
  return (
    <>
      <Input type="text" value={symbol} onChange={handleChange} />
      <Button color="primary">Submit</Button>
    </>
  );
}

export default SearchBar;