import React, { useState } from 'react';
import { ReactComponent as Check } from './check.svg';

export const ListItem = React.memo(({ item, onRemoveItem }) => {
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

const SortPanel = ({ handleSortBy }) => {
  const sortTypes = ['Points', 'Comments', 'Author', 'Title'];

  return (
    <div>
      <span>Sort by </span>
      {sortTypes.map((el) => (
        <button key={el} onClick={(event) => handleSortBy(event)}>
          {el}
        </button>
      ))}
    </div>
  );
};

const sortList = (list, sort) => {
  const sortedList = list.sort((a, b) => {
    switch (sort.by) {
      case 'points':
        return b.points - a.points;
      case 'comments':
        return b.num_comments - a.num_comments;
      case 'author':
        return b.author.toLowerCase() > a.author.toLowerCase()
          ? -1
          : b.author.toLowerCase() < a.author.toLowerCase()
          ? 1
          : 0;
      case 'title':
        return b.title.toLowerCase() > a.title.toLowerCase()
          ? -1
          : b.title.toLowerCase() < a.title.toLowerCase()
          ? 1
          : 0;
      default:
        throw new Error();
    }
  });

  return sort.isReverse ? sortedList.reverse() : sortedList;
};

const List = ({ list, onRemoveItem }) => {
  const [sort, setSort] = useState({
    by: 'points',
    isReverse: false,
  });

  const handleSortBy = (event) => {
    const value = event.target.textContent.toLowerCase();
    if (value === sort.by) {
      setSort({ isReverse: !sort.isReverse, by: value });
    } else {
      setSort({ dir: false, by: value });
    }
  };

  return (
    <React.Fragment>
      <SortPanel handleSortBy={handleSortBy} />
      {sortList(list, sort).map((item) => (
        <ListItem key={item.objectID} item={item} onRemoveItem={onRemoveItem} />
      ))}
    </React.Fragment>
  );
};

export default React.memo(List);
