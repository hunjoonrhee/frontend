import * as types from '../constants/cart.constants';

const initialState = {
  cartItems: [],
  cartItemCount: 0,
  totalPrice: 0,
  addToCartError: null,
  getCartListError: null,
  deleteCartItemError: null,
  updateCartItemError: null,
};

function cartReducer(state = initialState, action) {
  switch (action.type) {
    case types.GET_CART_LIST_SUCCESS:
      const cartItems = action.payload === '' ? [] : action.payload.cart.cartItems;
      const totalPrice = cartItems.length !== 0 && cartItems.reduce((total, item) => total + item.productId.price * item.quantity, 0);
      return {
        ...state,
        cartItems: cartItems,
        cartItemCount: cartItems.length,
        totalPrice: totalPrice,
      };
    case types.GET_CART_LIST_FAIL:
      return {
        ...state,
        getCartListError: action.payload,
      };
    case types.ADD_TO_CART_SUCCESS:
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      };
    case types.ADD_TO_CART_FAIL:
      return {
        ...state,
        addToCartError: action.payload,
      };
    case types.DELETE_CART_ITEM_SUCCESS:
      return {
        ...state,
        cartItems: action.payload.cart.cartItems,
      };
    case types.DELETE_CART_ITEM_FAIL:
      return {
        ...state,
        deleteCartItemError: action.payload,
      };
    case types.UPDATE_CART_ITEM_SUCCESS:
      return {
        ...state,
        cartItems: action.payload.cart.cartItems,
      };
    case types.UPDATE_CART_ITEM_FAIL:
      return {
        ...state,
        updateCartItemError: action.payload,
      };
    default:
      return state;
  }
}
export default cartReducer;
