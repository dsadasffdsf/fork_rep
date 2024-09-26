import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { engDictHead, ruDictHead } from './dict';

function Head({ title, changeLanguage, language }) {
  // console.log(language);

  return (
    <>
      <div className="Head">
        <h1>{title}</h1>
        <button onClick={() => changeLanguage()}>
          {language === 'ru' ? ruDictHead.headBtnChange : engDictHead.headBtnChange}{' '}
          {language === 'ru' ? 'eng' : 'ru'}
        </button>
      </div>
    </>
  );
}

Head.propTypes = {
  title: PropTypes.node,
};

export default memo(Head);
