import React, { useReducer, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import List from './components/List';
import InputWithLabel from './components/InputWithLabel';
import useLocalStorageState from './hooks/useLocalStorageState';

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query=';

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
  const [searchTerm, setSearchTerm] = useLocalStorageState('search', ''); 
  const [url, setUrl] = useState(`${API_ENDPOINT}${searchTerm}`);

  const handleFetchStories = useCallback(async () => {
    dispatchStories({ type: 'STORIES_FETCH_INIT' });

    try {
      const result = await axios.get(url);
      
      dispatchStories({
        type: 'STORIES_FETCH_SUCCESS',
        payload: result.data.hits,
      });
    } catch {
      dispatchStories({ type: 'STORIES_FETCH_FAILURE' });
    }

  }, [url]);

  useEffect(() => {
    handleFetchStories();
  }, [handleFetchStories]);

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = () => {
    setUrl(`${API_ENDPOINT}${searchTerm}`);
  };

  const handleRemove = id => {
    dispatchStories({
      type: 'REMOVE_STORY',
      payload: id,
    });
  };

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

      <button
        type='button'
        disabled={!searchTerm}
        onClick={handleSearchSubmit}
      >
        Submit
      </button>

      <hr/>
      
      {stories.isError && <p>Something went wrong...</p>}

      <ul>
        {stories.isLoading ? (
          <p>Loading...</p>
        ) : (
          <List list={stories.data} onRemove={handleRemove}/>
        )}
      </ul>

    </div>
  );
}

export default App;