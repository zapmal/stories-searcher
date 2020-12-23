import React, { useReducer, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

import List from './components/List';
import SearchForm from './components/SearchForm';
import useLocalStorageState from './hooks/useLocalStorageState';
import { ReactComponent as HackerIcon } from './img/hacker.svg';
import {
  GlobalStyle,
  StyledContainer,
  StyledHeadlinePrimary
} from './styles';

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

  const handleSearchSubmit = (e) => {
    setUrl(`${API_ENDPOINT}${searchTerm}`);

    e.preventDefault();
  };

  const handleRemove = (id) => {
    dispatchStories({
      type: 'REMOVE_STORY',
      payload: id,
    });
  };

  return (
    <StyledContainer>

      <GlobalStyle/>

      <StyledHeadlinePrimary>
        My Hacker Stories <HackerIcon height='40px' width='40px' fill='#ffffff'/>
      </StyledHeadlinePrimary>

      <SearchForm 
        searchTerm={searchTerm}
        onSearch={handleSearch}
        onSearchSubmit={handleSearchSubmit}
      />
      
      {stories.isError && <p>Something went wrong...</p>}

      <ul>
        {stories.isLoading ? (
          <p>Loading...</p>
        ) : (
          <List list={stories.data} onRemove={handleRemove}/>
        )}
      </ul>

    </StyledContainer>
  );
}

export default App;