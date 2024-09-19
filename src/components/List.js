import React from 'react';
import PropTypes from 'prop-types';
import Item from './Item';

function List({ list, emptyListTitle, handler, titleHandler }) {
  return (
    <div className={`List ${list.length == 0 ? 'List-empty' : ''}`}>
      {list.length > 0 ? (
        list.map(item => (
          <div key={item.code} className="List-item">
            <Item item={item} handler={handler} titleHandler={titleHandler} />
          </div>
        ))
      ) : (
        <div className="">{emptyListTitle}</div>
      )}
    </div>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
      title: PropTypes.string,
      price: PropTypes.number,
      count: PropTypes.number,
    }),
  ).isRequired,
  handler: PropTypes.func,
  titleHandler: PropTypes.string,
  emptyListTitle: PropTypes.string,
};

export default React.memo(List);
