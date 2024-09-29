import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat, plural } from '../../utils';
import './style.css';
import NavMenu from '../nav-menu';
import { useLocalization } from '../../store/localization/localizetion-context';

function BasketTool({ sum, amount, onOpen }) {
  const cn = bem('BasketTool');
  const { translation, language } = useLocalization();
  return (
    <div className={cn('wrapper')}>
      <NavMenu />
      <div className={cn()}>
        <span className={cn('label')}>{translation[language].basketTool.basketToolTitle}</span>
        <span className={cn('total')}>
          {amount
            ? `${amount} ${plural(amount, {
                one: translation[language].basketTool.basketToolOneProduct,
                few: translation[language].basketTool.basketToolFewProduct,
                many: translation[language].basketTool.basketToolManyProducts,
              })} / ${numberFormat(sum)} ₽`
            : `${translation[language].basketTool.basketToolStatus}`}
        </span>
        <button onClick={onOpen}>{translation[language].basketTool.basketToolBtnOpen}</button>
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
