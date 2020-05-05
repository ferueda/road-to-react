import React, {
  useState,
  useEffect,
  useReducer,
  useCallback,
  useMemo,
} from 'react';
import axios from 'axios';
import './App.css';

import SearchForm from './components/SearchForm';
import List from './components/List';

import { useSemiPersistentState } from './hooks/useSemiPersistentState';

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

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query=';

const getSumComments = (stories) =>
  stories.data.reduce((acc, value) => acc + value.num_comments, 0);

const App = () => {
  const [search, setSearch] = useSemiPersistentState('search', '');
  const [url, setUrl] = useState(`${API_ENDPOINT}${search}`);
  const [stories, dispatchStories] = useReducer(storiesReducer, {
    data: [],
    isLoading: false,
    isError: false,
  });

  const sumComments = useMemo(() => getSumComments(stories), [stories]);

  const handleFetchStories = useCallback(async () => {
    dispatchStories({ type: 'STORIES_FETCH_INIT' });

    try {
      const res = await axios.get(url);
      const data = res.data;

      dispatchStories({
        type: 'STORIES_FETCH_SUCCESS',
        payload: data.hits,
      });
    } catch {
      dispatchStories({ type: 'STORIES_FETCH_FAILURE' });
    }
  }, [url]);

  useEffect(() => {
    handleFetchStories();
  }, [handleFetchStories]);

  const handleSearchInput = useCallback((event) => {
    setSearch(event.target.value);
  }, []);

  const handleSearchSubmit = useCallback(
    (event) => {
      event.preventDefault();
      setUrl(`${API_ENDPOINT}${search}`);
    },
    [search, API_ENDPOINT]
  );

  const handleRemoveStory = useCallback((item) => {
    dispatchStories({
      type: 'REMOVE_STORY',
      payload: item,
    });
  }, []);

  return (
    <div className='App'>
      <h1>My Hacker Stories with {sumComments} comments</h1>
      <SearchForm
        search={search}
        handleSearchInput={handleSearchInput}
        handleSearchSubmit={handleSearchSubmit}
      />
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
