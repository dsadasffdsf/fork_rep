/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    let uniqueСode = 0;
    const updatedList = [
      ...initState.list.map(item => {
        if (item.code > uniqueСode) {
          uniqueСode = item.code;
        }
        return { ...item, selection: 0, selected: false };
      }),
    ];

    this.state = {
      list: [...updatedList],
      uniqueСode: uniqueСode+1,
    };
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);

    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    };
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;

    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление новой записи
   */
  addItem() {
    this.setState({
      ...this.state,
      list: [
        ...this.state.list,
        { code: this.state.uniqueСode, title: 'Новая запись', selection: 0, selected: false },
      ],
      uniqueСode: this.state.uniqueСode + 1,
    });

  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.filter(item => item.code !== code),
    });
  }

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          if (item.selected === false) {
            item = { ...item, selection: item.selection + 1 };
          }
          item.selected = !item.selected;
        } else {
          item.selected = false;
        }
        return item;
      }),
    });
  }
}

export default Store;
