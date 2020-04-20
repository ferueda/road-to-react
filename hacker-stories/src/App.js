import React, { useState } from 'react';

const List = ({ list }) => {
  return list.map((item) => (
    <div key={item.objectID}>
      <span>
        <a href={item.url} target='_blank' rel='noopener noreferrer'>
          {item.title}
        </a>{' '}
        by {item.author}
      </span>
      <br />
      <span>Comments: {item.num_comments}</span>
      <br />
      <span>Points: {item.points}</span>
      <hr />
    </div>
  ));
};

const Search = ({ search, onSearch }) => {
  return (
    <div>
      <label htmlFor='search'>Search: </label>
      <input id='search' type='text' value={search} onChange={onSearch} />
      <p>
        Searching for <strong>{search}</strong>
      </p>
    </div>
  );
};

const App = () => {
  const [search, setSearch] = useState('');
  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

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

  return (
    <div className='App'>
      <h1>My Hacker Stories</h1>
      <Search search={search} onSearch={handleSearch} />
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
