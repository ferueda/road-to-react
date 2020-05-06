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
import LastSearches from './components/LastSearches';

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
        isLoading: false,
        isError: false,
        data:
          action.payload.page === 0
            ? action.payload.list
            : state.data.concat(action.payload.list),
        page: action.payload.page,
      };
    case 'STORIES_FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
        data: [],
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

const API_BASE = 'https://hn.algolia.com/api/v1';
const API_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';

const getSumComments = (stories) =>
  stories.data.reduce((acc, value) => acc + value.num_comments, 0);

const extractSearchTerm = (url) =>
  url
    .substring(url.lastIndexOf('?') + 1, url.lastIndexOf('&'))
    .replace(PARAM_SEARCH, '');

const getLastSearches = (urls) =>
  urls
    .reduce((result, url, index) => {
      const searchTerm = extractSearchTerm(url);

      if (index === 0) {
        return result.concat(searchTerm);
      }

      const previousSearchTerm = result[result.length - 1];

      if (searchTerm === previousSearchTerm) {
        return result;
      } else {
        return result.concat(searchTerm);
      }
    }, [])
    .slice(-6)
    .slice(0, -1);

const getUrl = (search, page) =>
  `${API_BASE}${API_SEARCH}?${PARAM_SEARCH}${search}&${PARAM_PAGE}${page}`;

const App = () => {
  const [search, setSearch] = useSemiPersistentState('search', '');
  const [urls, setUrls] = useState([getUrl(search, 0)]);
  const [stories, dispatchStories] = useReducer(storiesReducer, {
    data: [],
    isLoading: false,
    isError: false,
    page: 0,
  });

  const sumComments = useMemo(() => getSumComments(stories), [stories]);

  const handleFetchStories = useCallback(async () => {
    dispatchStories({ type: 'STORIES_FETCH_INIT' });

    try {
      const lastUrl = urls[urls.length - 1];
      const results = await axios.get(lastUrl);

      dispatchStories({
        type: 'STORIES_FETCH_SUCCESS',
        payload: {
          list: results.data.hits,
          page: results.data.page,
        },
      });
    } catch {
      dispatchStories({ type: 'STORIES_FETCH_FAILURE' });
    }
  }, [urls]);

  useEffect(() => {
    handleFetchStories();
  }, [handleFetchStories]);

  const handleSearch = (search, page) => {
    const url = getUrl(search, page);
    setUrls([...urls, url]);
  };

  const handleMore = () => {
    const lastUrl = urls[urls.length - 1];
    const search = extractSearchTerm(lastUrl);
    handleSearch(search, stories.page + 1);
  };

  const handleSearchInput = useCallback((event) => {
    setSearch(event.target.value);
  }, []);

  const handleSearchSubmit = useCallback(
    (event) => {
      event.preventDefault();
      handleSearch(search, 0);
    },
    [search]
  );

  const handleRemoveStory = useCallback((item) => {
    dispatchStories({
      type: 'REMOVE_STORY',
      payload: item,
    });
  }, []);

  const handleLastSearch = (search) => {
    handleSearch(search, 0);
  };

  const lastSearches = getLastSearches(urls);

  return (
    <div className='App'>
      <h1>My Hacker Stories with {sumComments} comments</h1>
      <SearchForm
        search={search}
        handleSearchInput={handleSearchInput}
        handleSearchSubmit={handleSearchSubmit}
      />
      <LastSearches
        lastSearches={lastSearches}
        onLastSearch={handleLastSearch}
      />
      <hr />
      <List list={stories.data} onRemoveItem={handleRemoveStory} />
      {stories.isLoading ? (
        <p>Loading...</p>
      ) : (
        <button onClick={handleMore}>More</button>
      )}

      {stories.isError && <p>Something went wrong...</p>}
    </div>
  );
};

export default App;
