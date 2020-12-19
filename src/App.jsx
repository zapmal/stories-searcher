import React, { useState } from 'react';
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

const App = () => {
  const [stories, setStories] = useState(initialStories);
  const [searchTerm, setSearchTerm] = useLocalStorageState('search', 'React'); 

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  const handleRemove = id => {
    const newStories = stories.filter(
      story => id !== story.objectID
    );
    setStories(newStories);
  };

  const searchedStories = stories.filter(story => 
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

      <ul>
        <List list={searchedStories} onRemove={handleRemove}/>
      </ul>
    </div>
  );
}

export default App;