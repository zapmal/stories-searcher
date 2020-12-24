import InputWithLabel from '../InputWithLabel';
import Button from '../Button';
import { ReactComponent as SearchIcon } from '../../img/magnifier.svg';
import StyledSearchForm from './styles';

const SearchForm = ({ searchTerm, onSearch, onSearchSubmit }) => {
  return (
    <StyledSearchForm onSubmit={onSearchSubmit}>
      {/* isFocused = true */}
      <InputWithLabel
        id='search'
        value={searchTerm}
        isFocused
        onInputChange={onSearch}
      />

      <Button padding='10px' type='submit' disabled={!searchTerm}>
        <SearchIcon height='20px' width='20px' fill='#ffffff'/>
      </Button>

    </StyledSearchForm>
  );
};

export default SearchForm;