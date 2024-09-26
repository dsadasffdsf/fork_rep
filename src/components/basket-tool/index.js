import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat, plural } from '../../utils';
import './style.css';
import { Link } from 'react-router-dom';
import { engDictBasketTool, ruDictBasketTool } from './dict';

function BasketTool({ sum, amount, onOpen, language }) {
  const cn = bem('BasketTool');
  return (
    <div className={cn('wrapper')}>
      <Link to="/">
        <span className={cn('wrapper-redirect')}>
          {language === 'ru'
            ? ruDictBasketTool.basketToolToHome
            : engDictBasketTool.basketToolToHome}
        </span>
      </Link>
      <div className={cn()}>
        <span className={cn('label')}>
          {' '}
          {language === 'ru' ? ruDictBasketTool.basketToolTitle : engDictBasketTool.basketToolTitle}
        </span>
        <span className={cn('total')}>
          {amount
            ? `${amount} ${plural(amount, {
                one: `${language === 'ru' ? ruDictBasketTool.basketToolOneProduct : engDictBasketTool.basketToolOneProduct}`,
                few: `${language === 'ru' ? ruDictBasketTool.basketToolFewProduct : engDictBasketTool.basketToolManyProducts}`,
                many: `${language === 'ru' ? ruDictBasketTool.basketToolManyProducts : engDictBasketTool.basketToolManyProducts}`,
              })} / ${numberFormat(sum)} ₽`
            : `${language === 'ru' ? ruDictBasketTool.basketToolStatus : engDictBasketTool.basketToolStatus}`}
        </span>
        <button onClick={onOpen}>
          {language === 'ru'
            ? ruDictBasketTool.basketToolBtnOpen
            : engDictBasketTool.basketToolBtnOpen}
        </button>
      </div>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0,
};

export default memo(BasketTool);
