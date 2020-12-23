import Item from '../Item';

const List = ({ list, onRemove }) => (
  list.map(({ objectID, ...item }) => (
    <Item 
      key={objectID} 
      id={objectID}
      {...item} 
      onRemoveItem={onRemove}
    />
  ))
);

export default List;