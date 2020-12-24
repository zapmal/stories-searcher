import Button from '../Button';

const LastSearches = ({
  lastSearches,
  onLastSearch
}) => (
  <>
    {lastSearches.map((searchTerm, index) => (
      searchTerm && <Button 
      padding='5px' 
      key={searchTerm + index} 
      type='button' 
      onClickEvent={() => onLastSearch(searchTerm)}
      >
        {searchTerm}
      </Button> 
    ))}
  </>
);

export default LastSearches;