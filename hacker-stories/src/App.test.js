import React from 'react';
import renderer from 'react-test-renderer';
import axios from 'axios';

jest.mock('axios');

import App from './App';
import MemoizedList, { ListItem as MemoizedListItem } from './components/List';
import SearchForm, { InputWithLabel } from './components/SearchForm';

const ListItem = MemoizedListItem.type;
const List = MemoizedList.type;

describe('ListItem', () => {
  const item = {
    title: 'React',
    url: 'https://reactjs.org/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  };

  const handleRemoveItem = jest.fn();
  let component;

  beforeEach(() => {
    component = renderer.create(
      <ListItem item={item} onRemoveItem={handleRemoveItem} />
    );
  });

  it('renders all properties', () => {
    expect(component.root.findByType('a').props.href).toEqual(
      'https://reactjs.org/'
    );
  });

  it('calls onRemoveItem on button click', () => {
    component.root.findByType('button').props.onClick();
    expect(handleRemoveItem).toHaveBeenCalledTimes(1);
    expect(handleRemoveItem).toHaveBeenCalledWith(item);
  });

  test('renders snapshot', () => {
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('List', () => {
  const list = [
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

  const handleRemoveItem = jest.fn();
  let component;

  beforeEach(() => {
    component = renderer.create(
      <List list={list} onRemoveItem={handleRemoveItem} />
    );
  });

  it('renders two items', () => {
    expect(component.root.findAllByType(ListItem).length).toEqual(2);
  });

  it('it calls onRemoveItem in every item', () => {
    component.root.findAllByType('button').forEach((b) => b.props.onClick());
    expect(handleRemoveItem).toHaveBeenCalledTimes(2);
  });
});

describe('SearchForm', () => {
  const searchFormProps = {
    search: 'React',
    handleSearchInput: jest.fn(),
    handleSearchSubmit: jest.fn(),
  };

  let component;

  beforeEach(() => {
    component = renderer.create(<SearchForm {...searchFormProps} />);
  });

  it('renders the input field with its value', () => {
    const value = component.root.findByType(InputWithLabel).props.value;
    expect(value).toEqual('React');
  });

  it('changed the input field', () => {
    const pseudoEvent = { target: 'Redux' };

    component.root.findByType('input').props.onChange(pseudoEvent);

    expect(searchFormProps.handleSearchInput).toHaveBeenCalledTimes(1);
    expect(searchFormProps.handleSearchInput).toHaveBeenCalledWith(pseudoEvent);
  });

  it('submits the form', () => {
    const pseudoEvent = {};

    component.root.findByType('form').props.onSubmit(pseudoEvent);

    expect(searchFormProps.handleSearchSubmit).toHaveBeenCalledTimes(1);
    expect(searchFormProps.handleSearchSubmit).toHaveBeenCalledWith(
      pseudoEvent
    );
  });

  it('disables the button and prevents submit', () => {
    component.update(<SearchForm {...searchFormProps} search='' />);

    expect(component.root.findByType('button').props.disabled).toBeTruthy();
  });
});

describe('App', () => {
  const list = [
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

  let component;

  it('succeeds fetching data with a list', async () => {
    const promise = Promise.resolve({
      data: {
        hits: list,
      },
    });

    axios.get.mockImplementationOnce(() => promise);

    await renderer.act(async () => {
      component = renderer.create(<App />);
    });

    expect(component.root.findByType(List).props.list).toEqual(list);
  });

  it('fails fetching data with a list', async () => {
    const promise = Promise.reject();

    axios.get.mockImplementationOnce(() => promise);

    await renderer.act(async () => {
      component = renderer.create(<App />);
    });

    expect(component.root.findByType('p').props.children).toEqual(
      'Something went wrong...'
    );
  });
});
