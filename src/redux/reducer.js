const initialState = {
  showMenu: false
};
const shapes = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_SHOW_MENU':
      return {
        ...state,
        showMenu: action.show
      };
    default:
      return state;
  }
};

export default shapes;
