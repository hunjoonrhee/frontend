import api from '../utils/api';
import * as types from '../constants/cart.constants';
import { commonUiActions } from '../action/commonUiAction';
const addToCart =
  ({ productId, size, quantity }) =>
  async (dispatch) => {
    try {
      dispatch({ type: types.ADD_TO_CART_REQUEST });
      const response = await api.post('/cart', { productId, size, quantity });
      dispatch({ type: types.ADD_TO_CART_SUCCESS, payload: response.data });
      dispatch(commonUiActions.showToastMessage('successfully added!', 'success'));
      dispatch(getCartList());
    } catch (err) {
      dispatch({ type: types.ADD_TO_CART_FAIL, payload: err });
      dispatch(commonUiActions.showToastMessage(err, 'error'));
      console.error(err);
    }
  };

const getCartList = () => async (dispatch) => {
  try {
    dispatch({ type: types.GET_CART_LIST_REQUEST });
    const response = await api.get('/cart');
    dispatch({ type: types.GET_CART_LIST_SUCCESS, payload: response.data });
  } catch (err) {
    dispatch({ type: types.GET_CART_LIST_FAIL, payload: err });
    dispatch(commonUiActions.showToastMessage(err, 'error'));
    console.error(err);
  }
};
const deleteCartItem = (item) => async (dispatch) => {
  try {
    dispatch({ type: types.DELETE_CART_ITEM_REQUEST });
    const response = await api.delete('/cart', { data: { productId: item.productId._id, size: item.size } });
    dispatch({ type: types.DELETE_CART_ITEM_SUCCESS, payload: response.data });
    dispatch(commonUiActions.showToastMessage('successfully deleted!', 'success'));
    dispatch(getCartList());
  } catch (err) {
    dispatch({ type: types.DELETE_CART_ITEM_FAIL, payload: err });
    dispatch(commonUiActions.showToastMessage(err, 'error'));
    console.error(err);
  }
};

const updateQty = (item) => async (dispatch) => {
  try {
    dispatch({ type: types.UPDATE_CART_ITEM_REQUEST });
    const response = await api.put('/cart', { productId: item.productId._id, size: item.size, quantity: item.quantity });

    dispatch({ type: types.UPDATE_CART_ITEM_SUCCESS, payload: response.data });
    dispatch(getCartList());
  } catch (err) {
    dispatch({ type: types.UPDATE_CART_ITEM_FAIL, payload: err });
    dispatch(commonUiActions.showToastMessage(err, 'error'));
    console.error(err);
  }
};
const getCartQty = () => async (dispatch) => {};

export const cartActions = {
  addToCart,
  getCartList,
  deleteCartItem,
  updateQty,
  getCartQty,
};
