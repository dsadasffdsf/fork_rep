import StoreModule from '../module';

/**
 * Состояние каталога - параметры фильтра и список товара
 */
class CatalogState extends StoreModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      list: [],
      params: {
        page: 1,
        limit: 10,
        category: 'all',
        sort: 'order',
        query: '',
      },
      count: 0,
      waiting: false,
      categoriesList: [],
    };
  }

  /**
   * Инициализация параметров.
   * Восстановление из адреса
   * @param [newParams] {Object} Новые параметры
   * @return {Promise<void>}
   */
  async initParams(newParams = {}) {
    const urlParams = new URLSearchParams(window.location.search);
    // console.log(urlParams.toString(), '-----------------------------000');

    let validParams = {};
    if (urlParams.has('page')) validParams.page = Number(urlParams.get('page')) || 1;
    if (urlParams.has('limit'))
      validParams.limit = Math.min(Number(urlParams.get('limit')) || 10, 50);
    if (urlParams.has('sort')) validParams.sort = urlParams.get('sort');
    if (urlParams.has('query')) validParams.query = urlParams.get('query');
    if (urlParams.has('category')) {
      const categoryValue = urlParams.get('category');
      // console.log(categoryValue, 'categoryValue------------------');

      if (categoryValue !== 'all') {
        validParams.category =  urlParams.get('category');
      }
    }

    await this.setParams({ ...this.initState().params, ...validParams, ...newParams }, true);
  }

  /**
   * Сброс параметров к начальным
   * @param [newParams] {Object} Новые параметры
   * @return {Promise<void>}
   */
  async resetParams(newParams = {}) {
    // Итоговые параметры из начальных, из URL и из переданных явно
    const params = { ...this.initState().params, ...newParams };
    // Установка параметров и загрузка данных
    await this.setParams(params);
  }

  /**
   * Установка параметров и загрузка списка товаров
   * @param [newParams] {Object} Новые параметры
   * @param [replaceHistory] {Boolean} Заменить адрес (true) или новая запись в истории браузера (false)
   * @returns {Promise<void>}
   */
  async setParams(newParams = {}, replaceHistory = false) {
    const params = { ...this.getState().params, ...newParams };
    // console.log(params, 'params------------------------');

    // Установка новых параметров и признака загрузки
    this.setState(
      {
        ...this.getState(),
        params,
        waiting: true,
      },
      'Установлены параметры каталога',
    );

    // Сохранить параметры в адрес страницы
    let urlSearch = new URLSearchParams(params).toString();
    const url = window.location.pathname + '?' + urlSearch + window.location.hash;
    if (replaceHistory) {
      window.history.replaceState({}, '', url);
    } else {
      window.history.pushState({}, '', url);
    }

    const apiParams = {
      limit: params.limit,
      skip: (params.page - 1) * params.limit,
      fields: 'items(*),count',
      sort: params.sort,
      'search[query]': params.query,
    };

    if (params.category !== 'all') {
      apiParams['search[category]'] = params.category;
    } else {
      delete apiParams['search[category]'];
    }

    // console.log(apiParams);

    // console.log(new URLSearchParams(apiParams).toString());

    const response = await fetch(`/api/v1/articles?${new URLSearchParams(apiParams)}`);
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
        count: json.result.count,
        waiting: false,
      },
      'Загружен список товаров из АПИ',
    );
  }
  async setCategory() {
    const response = await fetch(`/api/v1/categories?fields=title,parent(title)`);
    const categories = [];
    const data = await response.json();
    categories.push({ value: 'all', title: 'Все' });

    // Функция для создания дерева категорий
    function buildCategoryTree(items) {
      const tree = [];
      const map = {};

      // Создаем мапу, где ключом является id категории
      items.forEach(item => {
        map[item._id] = { ...item, children: [] };
      });

      // Строим дерево категорий
      items.forEach(item => {
        if (item.parent) {
          const parentId = item.parent._id;
          if (map[parentId]) {
            map[parentId].children.push(map[item._id]);
          }
        } else {
          tree.push(map[item._id]);
        }
      });

      return tree;
    }

    // Функция для "плоской" итерации по дереву с добавлением префиксов (вложенность)
    function flattenTree(tree, prefix = '') {
      tree.forEach(node => {
        categories.push({ value: node._id, title: `${prefix}${node.title}` });

        if (node.children.length > 0) {
          flattenTree(node.children, `${prefix}-`); // Увеличиваем вложенность
        }
      });
    }

    // Строим дерево категорий
    const categoryTree = buildCategoryTree(data.result.items);

    // Плоская итерация по дереву и добавление категорий с вложенностью
    flattenTree(categoryTree);
    this.setState(
      {
        ...this.getState(),
        categoriesList: [...categories],
      },
      'Сбор и фильтрация категорий',
    );

    // { value: '*', title: 'Все' },
    // { value: '66fab39363bfe248a856308c', title: 'Электроника' },
    // { value: '66fab39363bfe248a856308d', title: '-Телефоны' },
    // { value: '66fab39363bfe248a8563094', title: '--Смартфоны' },
  }
}

export default CatalogState;
