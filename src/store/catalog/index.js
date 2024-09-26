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

  changeLanguage() {
    this.setState({
      ...this.getState(),
      language: 'eng' === this.store.state.catalog.language ? 'ru' : 'eng',
    });
  }

  async load({ limit = 10, skip = 0 } = {}) {
    const response = await fetch(`/api/v1/articles?limit=${limit}&skip=${skip}}`);
    const json = await response.json();

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
    const productResponse = await fetch(
      `/api/v1/articles/${id}?fields=*,madeIn(title),category(title)`,
    );
    const productData = await productResponse.json();
    // console.log(productData.result, '------------------------');

    const productDataForDetal = {
      _id: productData.result._id,
      title: productData.result.title,
      description: productData.result.description,
      category: productData.result.category.title,
      country: productData.result.madeIn.title,
      edition: productData.result.edition,
      price: productData.result.price,
    };

    this.setState(
      {
        ...this.getState(),
        list: [productData.result],
        detalProduct: productDataForDetal,
      },
      'Загружены товары из АПИ',
    );
    // console.log(this.store.state.catalog ,"loggggggg");
  }
}

export default Catalog;
