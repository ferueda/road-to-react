import React, { useState, useEffect, useRef, useReducer } from 'react';

const ListItem = ({ item, onRemoveItem }) => {
  const { title, url, author, num_comments, points } = item;

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
      <button type='button' onClick={() => onRemoveItem(item)}>
        Dismiss
      </button>
      <hr />
    </div>
  );
};

const List = ({ list, onRemoveItem }) => {
  return list.map((item) => (
    <ListItem key={item.objectID} item={item} onRemoveItem={onRemoveItem} />
  ));
};

const InputWithLabel = ({
  type = 'text',
  id,
  children,
  value,
  onInputChange,
  isFocused,
}) => {
  const inputRef = useRef();

  useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFocused]);

  return (
    <React.Fragment>
      <label htmlFor={id}>{children}</label>
      <input
        ref={inputRef}
        id={id}
        type={type}
        value={value}
        onChange={onInputChange}
      />
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

const storiesReducer = (state, action) => {
  switch (action.type) {
    case 'STORIES_FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case 'STORIES_FETCH_SUCCESS':
      return {
        ...state,
        data: action.payload,
        isLoading: false,
        isError: false,
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
          (story) => story.objectID !== action.payload.objectID
        ),
      };
    default:
      throw new Error();
  }
};

const App = () => {
  const [search, setSearch] = useSemiPersistentState('search', '');
  const [stories, dispatchStories] = useReducer(storiesReducer, {
    data: [],
    isLoading: false,
    isError: false,
  });

  useEffect(() => {
    const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query=';

    if (!search === '') return;

    dispatchStories({ type: 'STORIES_FETCH_INIT' });

    fetch(`${API_ENDPOINT}${search}`)
      .then((res) => res.json())
      .then((data) => {
        dispatchStories({
          type: 'STORIES_FETCH_SUCCESS',
          payload: data.hits,
        });
      })
      .catch(() => dispatchStories({ type: 'STORIES_FETCH_FAILURE' }));
  }, [search]);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleRemoveStory = (item) => {
    dispatchStories({
      type: 'REMOVE_STORY',
      payload: item,
    });
  };

  console.log('rendered');

  return (
    <div className='App'>
      <h1>My Hacker Stories</h1>
      <InputWithLabel
        type='text'
        value={search}
        id='search'
        isFocused
        onInputChange={handleSearch}
      >
        <strong>Search: </strong>
      </InputWithLabel>
      <hr />
      {stories.isError && <p>Something went wrong...</p>}
      {stories.isLoading ? (
        <p>Loading...</p>
      ) : (
        <List list={stories.data} onRemoveItem={handleRemoveStory} />
      )}
    </div>
  );
};

export default App;
