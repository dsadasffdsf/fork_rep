import { codeGenerator } from '../../utils';
import StoreModule from '../module';

class Catalog extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
  }

  initState() {
    return {
      list: [],
      language: 'ru',
    };
  }

  async load({ limit = 10, skip = 0 } = {}) {
    const response = await fetch(`/api/v1/articles?limit=${limit}&skip=${skip}}`);
    const json = await response.json();
    // console.log(json,"data-----------------------------");
    
    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
      },
      'Загружены товары из АПИ',
    );
  }
  async maxCountProducts() {
    const response = await fetch(`/api/v1/articles?fields=items(),count&limit=1`);
    const json = await response.json();
    // console.log(json.result.count, 'order');

    this.setState(
      {
        ...this.getState(),
        maxCountProducts: json.result.count,
      },
      'Загружены товары из АПИ',
    );
  }
}

export default Catalog;
