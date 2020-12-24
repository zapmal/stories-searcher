import React, { useReducer, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

import List from './components/List';
import SearchForm from './components/SearchForm';
import LastSearches from './components/LastSearches';
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

const extractSearchTerm = (url) => url.replace(API_ENDPOINT, '');

const getLastSearches = (urls) => (
  urls
    .reduce((result, url, index) => {
      const searchTerm = extractSearchTerm(url);

      if (index === 0) return result.concat(searchTerm);

      const previousSearchTerm = result[result.length - 1];

      if (searchTerm === previousSearchTerm) {
        return result;
      } else {
        return result.concat(searchTerm);
      }
    }, [])
    .slice(-6)
    .slice(0, -1)
    .map(extractSearchTerm)
);

const getUrl = searchTerm => `${API_ENDPOINT}${searchTerm}`;

const App = () => {
  const [stories, dispatchStories] = useReducer(
    storiesReducer,
    { data: [], isLoading: false, isError: false },
  );
  const [searchTerm, setSearchTerm] = useLocalStorageState('search', ''); 
  const [urls, setUrls] = useState([getUrl(searchTerm)]);

  const handleFetchStories = useCallback(async () => {
    dispatchStories({ type: 'STORIES_FETCH_INIT' });

    try {
      const lastUrl = urls[urls.length - 1];
      const result = await axios.get(lastUrl);
      
      dispatchStories({
        type: 'STORIES_FETCH_SUCCESS',
        payload: result.data.hits,
      });
    } catch {
      dispatchStories({ type: 'STORIES_FETCH_FAILURE' });
    }

  }, [urls]);

  useEffect(() => {
    handleFetchStories();
  }, [handleFetchStories]);

  const handleSearchTermInput = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleRemove = (id) => {
    dispatchStories({
      type: 'REMOVE_STORY',
      payload: id,
    });
  };

  const handleSearch = (searchTerm) => {
    const url = getUrl(searchTerm);
    setUrls(urls.concat(url));
  };

  const handleSearchSubmit = (e) => {
    handleSearch(searchTerm);

    e.preventDefault();
  };

  const handleLastSearch = (searchTerm) => {
    setSearchTerm(searchTerm);

    handleSearch(searchTerm);
  };

  const lastSearches = getLastSearches(urls);

  return (
    <StyledContainer>

      <GlobalStyle/>

      <StyledHeadlinePrimary>
        My Hacker Stories <HackerIcon height='40px' width='40px' fill='#ffffff'/>
      </StyledHeadlinePrimary>

      <SearchForm 
        searchTerm={searchTerm}
        onSearch={handleSearchTermInput}
        onSearchSubmit={handleSearchSubmit}
      />

      <LastSearches
        lastSearches={lastSearches}
        onLastSearch={handleLastSearch}
      />
            
      {stories.isError && <p>Something went wrong on our side.</p>}

      <ul>
        {stories.isLoading ? (
          <p>Loading...</p>
        ) : (
          <List list={stories.data} onRemove={handleRemove} />
        )}
      </ul>

    </StyledContainer>
  );
}

export default App;