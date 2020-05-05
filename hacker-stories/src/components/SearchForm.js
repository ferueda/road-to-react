import React, { useRef, useEffect } from 'react';

const InputWithLabel = ({
  type = 'text',
  id,
  children,
  value,
  onInputChange,
  isFocused,
}) => {
  const inputRef = useRef();

  useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFocused]);

  return (
    <React.Fragment>
      <label htmlFor={id}>{children}</label>
      <input
        ref={inputRef}
        id={id}
        type={type}
        value={value}
        onChange={onInputChange}
      />
    </React.Fragment>
  );
};

const SearchForm = ({ handleSearchInput, search, handleSearchSubmit }) => {
  return (
    <form onSubmit={handleSearchSubmit}>
      <InputWithLabel
        type='text'
        value={search}
        id='search'
        isFocused
        onInputChange={handleSearchInput}
      >
        <strong>Search: </strong>
      </InputWithLabel>
      <button type='submit' disabled={!search}>
        Search
      </button>
    </form>
  );
};

export default React.memo(SearchForm);
