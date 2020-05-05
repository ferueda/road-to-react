import React from 'react';
import renderer from 'react-test-renderer';

import App from './App';
import List, { ListItem as MemoizedListItem } from './components/List';
import SearchForm, { InputWithLabel } from './components/SearchForm';

const ListItem = MemoizedListItem.type;

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
