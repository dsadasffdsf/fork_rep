import { memo } from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import './style.css';
import { Link } from 'react-router-dom';

function List({ list, renderItem ,onClose}) {
  return (
    <div className="List">
      {list.map((item) => (
        <Link to={`/products/${item._id}`} state={item._id} key={item._id} onClick={onClose}>
          <div className="List-item">{renderItem(item)}</div>
        </Link>
      ))}
    </div>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
  ).isRequired,
  renderItem: PropTypes.func,
};

List.defaultProps = {
  renderItem: (item) => {},
};

export default memo(List);
