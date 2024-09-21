import item from './components/Items/Item';
import { generateCode } from './utils';

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    const updateInitState = [
      ...initState.list.map(item => {
        return { ...item, count: 0 };
      }),
    ];
    this.state = { list: updateInitState, basketList: [], basketCount: 0, totalPrice: 0 };
    this.listeners = []; // Слушатели изменений состояния

    //привязка к store для работы контекста
    this.addBasket = this.addBasket.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
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
      list: [...this.state.list, { code: generateCode(), title: 'Новая запись' }],
    });
  }
  addBasket(code) {
    // Проверка на повторный товар

    const actionItem = this.state.list.find(item => item.code === code);

    const rep = this.state.basketList.some(item => {
      return item.code === actionItem.code;
    });

    if (rep) {
      this.setState({
        ...this.state,
        basketList: this.state.basketList.map(item => {
          if (item.code === actionItem.code) {
            return { ...item, count: item.count + 1 };
          }
          return item;
        }),
        totalPrice: this.state.totalPrice + Number(actionItem.price),
      });
    } else {
      this.setState({
        ...this.state,
        basketList: [...this.state.basketList, { ...actionItem, count: 1 }],
        basketCount: this.state.basketCount + 1,
        totalPrice: this.state.totalPrice + Number(actionItem.price),
      });
    }
  }
  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    let item = this.state.basketList.find(item => item.code === code);
    this.setState({
      ...this.state,
      // Новый список, в котором не будет удаляемой записи
      totalPrice: Number(this.state.totalPrice) - Number(item.price * item.count),
      basketList: this.state.basketList.filter(item => item.code !== code),
      basketCount: this.state.basketCount - 1,
    });
  }

  /**
   * Выделение записи по коду
   * @param code
   */
}

export default Store;
