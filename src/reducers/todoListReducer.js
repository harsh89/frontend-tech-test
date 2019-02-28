const initialState = {
  tasks: [],
  message: '',
  isErrorStateActive: false
};

const todoList = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return {
        ...state,
        tasks: action.payload,
        message: '',
        isErrorStateActive: false
      }
    case 'GET_INITIAL':
      return {
        ...state,
        tasks: action.payload,
        message: '',
        isErrorStateActive: false
      }
    case 'TOGGLE_ITEM':
      return {
        ...state,
        tasks: action.payload,
        message: '',
        isErrorStateActive: false
      }
    case 'DELETE_ITEM':
      return {
        ...state,
        tasks: action.payload,
        message: '',
        isErrorStateActive: false
      }
    case 'ERROR_STATE':
      return {
        ...state,
        message: action.payload,
        isErrorStateActive: true
      }
    default:
      return state
  }
}

export default todoList
