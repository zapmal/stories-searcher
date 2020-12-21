import InputWithLabel from './InputWithLabel';

const SearchForm = ({ searchTerm, onSearch, onSearchSubmit }) => {
  return (
    <form onSubmit={onSearchSubmit} className='search-form'>
      {/* isFocused = true */}
      <InputWithLabel
        id='search'
        value={searchTerm}
        isFocused
        onInputChange={onSearch}
      >
      </InputWithLabel>

      <button className='button button_large' type='submit' disabled={!searchTerm}>
        Submit
      </button>

    </form>
  );
};

export default SearchForm;