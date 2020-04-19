import React from 'react';

const List = ({ list }) => {
  return list.map((item) => (
    <div key={item.objectID}>
      <span>
        <a href={item.url} target='_blank' rel='noopener'>
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

  const handleChange = (event) => {
    console.log(event);
  };

  return (
    <div className='App'>
      <h1>My Hacker Stories</h1>
      <label htmlFor='search'>Search: </label>
      <input id='search' type='text' onChange={handleChange} />
      <hr />
      <List list={stories} />
    </div>
  );
};

export default App;
