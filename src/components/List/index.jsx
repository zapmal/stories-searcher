import { useState } from 'react';
import Item from '../Item';
import Button from '../Button';
import { sortBy } from 'lodash';

const SORTS = {
  NONE: list => list,
  TITLE: list => sortBy(list, 'title'),
  AUTHOR: list => sortBy(list, 'author'),
  COMMENTS: list => sortBy(list, 'num_comments').reverse(),
  POINTS: list => sortBy(list, 'points').reverse(),
};

const List = ({ list, onRemove }) => {
  const [sort, setSort] = useState({
    key: 'NONE',
    isReverse: false,
  });

  const handleSort = key => {
    const isReverse = sort.key === key && !sort.isReverse;
    setSort({ key, isReverse });
  };
  
  const sortFunction = SORTS[sort.key];
  const sortedList = sort.isReverse 
    ? sortFunction(list).reverse()
    : sortFunction(list);

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <span style={{ width: '40.1%' }}>
          <Button 
            type='button' 
            padding='8px'
            active={sort.key === 'TITLE'}
            onClickEvent={() => handleSort('TITLE')}
          >
            TITLE 
          </Button>
        </span>
        <span style={{ width: '20%' }} >
          <Button 
            type='button' 
            padding='8px'
            active={sort.key === 'AUTHOR'}
            onClickEvent={() => handleSort('AUTHOR')}
          >
            AUTHOR 
          </Button>
        </span>
        <span style={{ width: '12%' }}>
          <Button 
            type='button' 
            padding='8px'
            active={sort.key === 'COMMENTS'}
            onClickEvent={() => handleSort('COMMENTS')}
          >
            COMMENTS 
          </Button>
        </span>
        <span style={{ width: '10%' }}>
          <Button 
            type='button' 
            padding='8px'
            active={sort.key === 'POINTS'}
            onClickEvent={() => handleSort('POINTS')}
          >
          POINTS 
          </Button>
        </span>
      </div>

      {sortedList.map(({ objectID, ...item }) => (
        <Item 
          key={objectID} 
          id={objectID}
          {...item} 
          onRemoveItem={onRemove}
        />
      ))}
    </div>
  );
};

export default List;