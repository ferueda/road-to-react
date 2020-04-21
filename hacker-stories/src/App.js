import React, { useState, useEffect } from 'react';

const ListItem = ({ title, url, author, num_comments, points }) => {
  return (
    <div>
      <span>
        <a href={url} target='_blank' rel='noopener noreferrer'>
          {title}
        </a>{' '}
        by {author}
      </span>
      <br />
      <span>Comments: {num_comments}</span>
      <br />
      <span>Points: {points}</span>
      <hr />
    </div>
  );
};

const List = ({ list }) => {
  return list.map(({ objectID, ...item }) => (
    <ListItem key={objectID} {...item} />
  ));
};

const InputWithLabel = ({ type = 'text', id, label, value, onInputChange }) => {
  return (
    <React.Fragment>
      <label htmlFor={id}>{label}: </label>
      <input id={id} type={type} value={value} onChange={onInputChange} />
    </React.Fragment>
  );
};

const useSemiPersistentState = (key, initialState) => {
  const [value, setValue] = useState(localStorage.getItem(key) || initialState);

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue];
};

const App = () => {
  const stories = [
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
    },
  ];

  const [search, setSearch] = useSemiPersistentState('search', '');

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  console.log('rendered');

  return (
    <div className='App'>
      <h1>My Hacker Stories</h1>
      <InputWithLabel
        type='text'
        value={search}
        id='search'
        label='Search'
        onInputChange={handleSearch}
      />
      <hr />
      <List
        list={stories.filter((story) =>
          story.title.toLowerCase().includes(search.toLowerCase())
        )}
      />
    </div>
  );
};

export default App;
