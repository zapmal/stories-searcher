import InputWithLabel from './InputWithLabel';

const SearchForm = ({ searchTerm, onSearch, onSearchSubmit }) => {
  return (
    <form onSubmit={onSearchSubmit}>
      {/* isFocused = true */}
      <InputWithLabel
        id='search'
        value={searchTerm}
        isFocused
        onInputChange={onSearch}
      >
        Search: 
      </InputWithLabel>

      <button type='submit' disabled={!searchTerm}>
        Submit
      </button>

    </form>
  );
};

export default SearchForm;