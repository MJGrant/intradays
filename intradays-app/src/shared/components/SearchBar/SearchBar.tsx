import React from 'react'

interface ISearchBar {
  symbol: string;
  handleChange: (value: any) => void;
}

const SearchBar: React.FC<ISearchBar> = ({ symbol, handleChange }) => {
  return (
    <>
      <p>Search bar here</p>
    </>
  );
}

export default SearchBar;