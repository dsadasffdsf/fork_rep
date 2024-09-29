import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { useLocalization } from '../../store/localization/localizetion-context';

function Head({ title }) {
  // console.log(language);
  const { translation, language, setLanguage } = useLocalization();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ru' : 'en');
  };
  return (
    <>
      <div className="Head">
        <h1>{title}</h1>
        <button className="Head-change-language" onClick={toggleLanguage}>
          {translation[language].head.headBtnChange} {language === 'en' ? 'Русский' : 'English'}
        </button>
      </div>
    </>
  );
}

Head.propTypes = {
  title: PropTypes.node,
};

export default memo(Head);
