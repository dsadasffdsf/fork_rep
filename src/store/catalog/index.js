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
    };
  }

  async load({ limit = 10, skip = 0 } = {}) {
    const response = await fetch(`/api/v1/articles?limit=${limit}&skip=${skip}}`);
    const json = await response.json();
    console.log(this);

    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
      },
      'Загружены товары из АПИ',
    );
  }
  async maxOrder() {
    const response = await fetch(`/api/v1/articles?sort=-order&limit=1`);
    const json = await response.json();
    // console.log(json.result.items[0].order, 'order');

    this.setState(
      {
        ...this.getState(),
        maxOrder: json.result.items[0].order,
      },
      'Загружены товары из АПИ',
      
    );
  }
  async fetchItemById(id) {
    const response = await fetch(`/api/v1/articles/${id}`);
    const json = await response.json();
    console.log(json.result, 'Фетч');

    this.setState(
      {
        ...this.getState(),
        detalProduct: json.result,
      },
      'Загружены товары из АПИ',
      
    );
  }
}

export default Catalog;
