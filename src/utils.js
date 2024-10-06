/**
 * Плюрализация
 * Возвращает вариант с учётом правил множественного числа под указанную локаль
 * @param value {Number} Число, под которое выбирается вариант формы.
 * @param variants {Object<String>} Варианты форм множественного числа.
 * @example plural(5, {one: 'товар', few: 'товара', many: 'товаров'})
 * @param [locale] {String} Локаль (код языка)
 * @returns {String}
 */
export function plural(value, variants = {}, locale = 'ru-RU') {
  // Получаем фурму кодовой строкой: 'zero', 'one', 'two', 'few', 'many', 'other'
  // В русском языке 3 формы: 'one', 'few', 'many', и 'other' для дробных
  // В английском 2 формы: 'one', 'other'
  const key = new Intl.PluralRules(locale).select(value);
  // Возвращаем вариант по ключу, если он есть
  return variants[key] || '';
}

/**
 * Генератор чисел с шагом 1
 * @returns {Function}
 */
export function codeGenerator(start = 0) {
  return () => ++start;
}

/**
 * Форматирование разрядов числа
 * @param value {Number}
 * @param options {Object}
 * @returns {String}
 */
export function numberFormat(value, locale = 'ru-RU', options = {}) {
  return new Intl.NumberFormat(locale, options).format(value);
}


export function buildCategoryTree(items) {
  const tree = [];
  const map = {};
  const categories = [{ value: 'all', title: 'Все' }]; // Первый элемент - "Все"

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

  // Рекурсивная функция для  итерации по дереву с добавлением префиксов
  function flattenTree(tree, prefix = '') {
    tree.forEach(node => {
      categories.push({ value: node._id, title: `${prefix} ${node.title}`.trim() });

      if (node.children.length > 0) {
        flattenTree(node.children, `${prefix} -`);
      }
    });
  }

  // Итерация по дереву и добавление категорий с вложенностью
  flattenTree(tree);

  return categories;
}