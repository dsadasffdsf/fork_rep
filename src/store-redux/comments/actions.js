export default {
  /**
   * Загрузка товара
   * @param id
   * @return {Function}
   */
  load: id => {
    return async (dispatch, getState, services) => {
      dispatch({ type: 'comments/load-start' });
      try {
        const res = await services.api.request({
          url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${id}`,
        });
        // console.log('API Response:', res);

        dispatch({ type: 'comments/load-success', payload: res.data.result });
        // console.log('Dispatching comments:', res.data.result);
      } catch (e) {
        dispatch({ type: 'comments/load-error' });
      }
    };
  },
  addNewComment: ({ commentData, id }) => {
    return async (dispatch, getState, services) => {
      try {
        const data = {
          text: commentData,
          parent: {
            _id: id,
            _type: 'article',
          },
        };
        // console.log(data, '-------------------dataaaaaaaaaa');

        const token = localStorage.getItem('token');
        if (!token) {
          dispatch({ type: 'comments/add-error', error: 'Токен не найден' });
          return;
        }
        const res = await services.api.request({
          url: `/api/v1/comments`,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Token': token,
          },
          body: JSON.stringify(data),
        });
        // const res = await this.services.api.request({
        //   url: '/api/v1/users/sign',
        //   method: 'POST',
        //   body: JSON.stringify(data),
        // })
        // dispatch(load(id));
        dispatch({ type: 'comments/add-success', payload: res.data.result });
      } catch (error) {
        dispatch({ type: 'comments/add-error', error: error.message });
      }
    };
  },
  addAnswerComment: ({ commentData, id }) => {
    return async (dispatch, getState, services) => {
      try {
        const data = {
          text: commentData,
          parent: {
            _id: id,
            _type: 'comment',
          },
        };
        // console.log(data,"dsfdsfsdfdsfdsfdsfasdfsfasdf");

        const token = localStorage.getItem('token');
        if (!token) {
          dispatch({ type: 'comments/add-error', error: 'Токен не найден' });
          return;
        }
        const res = await services.api.request({
          url: `/api/v1/comments`,
          method: 'POST',
          headers: {
            'X-Token': token,
          },
          body: JSON.stringify(data),
        });
        dispatch({ type: 'comments/add-success', payload: res.data.result });
      } catch (error) {
        dispatch({ type: 'comments/add-error', error: error.message });
      }
    };
  },
};
