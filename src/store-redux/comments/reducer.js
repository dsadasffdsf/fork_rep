import { organizeComments } from '../../utils/comments';

export const initialCommentsState = {
  data: {},
  waiting: false,
};

export default function reducer(state = initialCommentsState, action) {
  switch (action.type) {
    case 'comments/load-start':
      return { ...state, data: {}, waiting: true };

    case 'comments/load-success':
      const comments = organizeComments(action.payload.items);
      return { ...state, data: { ...action.payload, items: comments }, waiting: false };

    case 'comments/load-error':
      return { ...state, data: {}, waiting: false };

    case 'comments/add-start':
      return { ...state, waiting: true }; 

    // case 'comments/add-success':
    //   return {
    //     ...state,
    //     data: {
    //       ...state.data,
    //       items: [...state.data.items, action.payload], 
    //     },
    //     waiting: false, 
    //   };

    // case 'comments/add-error':
    //   return {
    //     ...state,
    //     waiting: false,
    //     error: action.error, 
    //   };

    default:
      return state;
  }
}
