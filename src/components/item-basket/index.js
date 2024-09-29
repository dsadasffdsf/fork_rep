import { memo, useCallback } from 'react';
import propTypes from 'prop-types';
import { numberFormat } from '../../utils';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import './style.css';
import { useLocalization } from '../../store/localization/localizetion-context';
import { Link } from 'react-router-dom';

function ItemBasket(props) {
  const cn = bem('ItemBasket');
  const { translation, language } = useLocalization();

  const callbacks = {
    onRemove: e => {
      e.preventDefault();
      props.onRemove(props.item._id);
    },
  };
  const onCloseModal = e => {
    if (e.target.closest('button') === null) {
      props.onClose();
    }
  };

  return (
    <Link to={`/products/${props.item._id}`} state={props.item._id} key={props.item._id}>
      <div className={cn()} onClick={e => onCloseModal(e)}>
        <div className={cn('title')}>{props.item.title}</div>
        <div className={cn('right')}>
          <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
          <div className={cn('cell')}>
            {numberFormat(props.item.amount || 0)} {translation[language].basket.basketBtnCount}
          </div>
          <div className={cn('cell')}>
            <button onClick={callbacks.onRemove}>
              {translation[language].basket.basketBtnDelete}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

ItemBasket.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
    amount: PropTypes.number,
  }).isRequired,
  onRemove: propTypes.func,
};

ItemBasket.defaultProps = {
  onRemove: () => {},
};

export default memo(ItemBasket);
