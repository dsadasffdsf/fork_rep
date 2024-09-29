import React from 'react';
import { Link } from 'react-router-dom';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import { useLocalization } from '../../store/localization/localizetion-context';


function NavMenu() {
  const cn = bem('Nav-menu');

  const { translation, language } = useLocalization();
  return (
    <Link to="/page/1">
      <span className={cn('wrapper-redirect')}>
      {translation[language].basketTool.basketToolToHome}
      </span>
    </Link>
  );
}

export default NavMenu;
