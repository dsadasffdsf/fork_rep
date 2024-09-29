import { codeGenerator } from '../../utils';
import StoreModule from '../module';

class DetalProduct extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
  }

  initState() {
    return {
      list: [],
      detalProduct: {},
    };
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
    console.log(this.setState);
  }
}

export default DetalProduct;
