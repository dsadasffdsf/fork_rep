import React from 'react';
import { createElement, pluralRules } from './utils.js';
import './styles.css';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;

  const deleteItemHandler = (event, item) => {
    event.stopPropagation();
    store.deleteItem(item.code);
  };

  

  return (
    <div className="App">
      <div className="App-head">
        <h1>Приложение на чистом JS</h1>
      </div>
      <div className="App-controls">
        <button onClick={() => store.addItem()}>Добавить</button>
      </div>
      <div className="App-center">
        <div className="List">
          {list.map(item => (
            <div key={item.code} className="List-item">
              <div
                className={'Item' + (item.selected ? ' Item_selected' : '')}
                onClick={() => store.selectItem(item.code)}
              >
                <div className="Item-code">{item.code}</div>
                <div className="Item-title">
                  {item.title}{' '}
                  {item.selection >= 1 ? (
                    <span className="Item-selection">
                      | Выделяли {item.selection}{pluralRules(item.selection)}
                    </span>
                  ) : (
                    ''
                  )}
                </div>

                <div className="Item-actions">
                  <button onClick={(event) => deleteItemHandler(event,item)}>Удалить</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
