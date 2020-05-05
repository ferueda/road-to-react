import React from 'react';
import { ReactComponent as Check } from './check.svg';

const ListItem = React.memo(({ item, onRemoveItem }) => {
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
        Dismiss <Check height='14px' width='14px' />
      </button>
      <hr />
    </div>
  );
});

const List = ({ list, onRemoveItem }) => {
  return list.map((item) => (
    <ListItem key={item.objectID} item={item} onRemoveItem={onRemoveItem} />
  ));
};

export default React.memo(List);
