import React, { useReducer, useEffect } from 'react';
import List from './components/List';
import InputWithLabel from './components/InputWithLabel';
import useLocalStorageState from './hooks/useLocalStorageState';

const initialStories = [
  {
    title: 'React',
    url: 'https://reactjs.org/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: 'Redux',
    url: 'https://redux.js.org/',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
  }
];

const getAsyncStories = () => (
  new Promise(resolve => {
    setTimeout(() => resolve({ data: { stories: initialStories } }),
      2000
    )
  })
);

const storiesReducer = (state, action) => {
  switch(action.type) {
    case 'STORIES_FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case 'STORIES_FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case 'STORIES_FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case 'REMOVE_STORY':
      return {
        ...state,
        data: state.data.filter(
          story => story.objectID !== action.payload
        )
      };
    default:
      throw new Error();
  }
};

const App = () => {
  const [stories, dispatchStories] = useReducer(
    storiesReducer,
    { data: [], isLoading: false, isError: false },
  );
  const [searchTerm, setSearchTerm] = useLocalStorageState('search', 'React'); 

  useEffect(() => {
    dispatchStories({ type: 'STORIES_FETCH_INIT' });

    getAsyncStories()
      .then(result => {
        dispatchStories({
          type: 'STORIES_FETCH_SUCCESS',
          payload: result.data.stories,
        });
      })
      .catch(() => {
        dispatchStories({
          type: 'STORIES_FETCH_FAILURE',
        });
      });
  }, []);

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  const handleRemove = id => {
    dispatchStories({
      type: 'REMOVE_STORY',
      payload: id,
    });
  };

  const searchedStories = stories.data.filter(story => 
    story.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  ); 

  return (
    <div>
      <h1>My Hacker Stories</h1>

       {/* isFocused = true */}
      <InputWithLabel
        id='search'
        value={searchTerm}
        isFocused
        onInputChange={handleSearch}
      >
        Search: 
      </InputWithLabel>

      <hr/>
      
      {stories.isError && <p>Something went wrong...</p>}

      <ul>
        {stories.isLoading ? (
          <p>Loading...</p>
        ) : (
          <List list={searchedStories} onRemove={handleRemove}/>
        )}
      </ul>

    </div>
  );
}

export default App;