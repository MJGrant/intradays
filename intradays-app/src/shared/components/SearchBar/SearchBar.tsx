import React from 'react'

interface ISearchBar {
  symbol: string;
  handleChange: (value: any) => void;
}

const SearchBar: React.FC<ISearchBar> = ({ symbol, handleChange }) => {
  return (
    <>
      <input type="text" value={symbol} onChange={handleChange} />
      <input type="submit" value="Submit" />
    </>
  );
}

export default SearchBar;