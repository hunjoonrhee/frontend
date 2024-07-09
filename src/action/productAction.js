import api from '../utils/api';
import * as types from '../constants/product.constants';
import { toast } from 'react-toastify';
import { commonUiActions } from './commonUiAction';

const getProductList = (query) => async (dispatch) => {
  try {
    dispatch({ type: types.PRODUCT_GET_REQUEST });
    const response = await api.get('/product', {
      params: { ...query },
    });
    dispatch({ type: types.PRODUCT_GET_SUCCESS, payload: response.data });
  } catch (err) {
    dispatch({ type: types.PRODUCT_GET_FAIL, payload: err });
    dispatch(commonUiActions.showToastMessage(err.message, 'error'));
    console.error(err);
  }
};
const getProductDetail = (sku) => async (dispatch) => {
  try {
    dispatch({ type: types.GET_PRODUCT_DETAIL_REQUEST });
    const response = await api.get(`/product/${sku}`);
    dispatch({ type: types.GET_PRODUCT_DETAIL_SUCCESS, payload: response.data });
  } catch (err) {
    dispatch({ type: types.GET_PRODUCT_DETAIL_FAIL, payload: err });
    dispatch(commonUiActions.showToastMessage(err, 'error'));
    console.error(err);
  }
};

const createProduct = (formData) => async (dispatch) => {
  try {
    dispatch({ type: types.PRODUCT_CREATE_REQUEST });
    const response = await api.post('/product', formData);
    dispatch({ type: types.PRODUCT_CREATE_SUCCESS, payload: response.data });
    dispatch(commonUiActions.showToastMessage('creating a new product succeed!', 'success'));
  } catch (err) {
    dispatch({ type: types.PRODUCT_CREATE_FAIL, payload: err });
    dispatch(commonUiActions.showToastMessage(err, 'error'));
    console.error(err);
  }
};
const deleteProduct = (sku) => async (dispatch) => {
  try {
    dispatch({ type: types.PRODUCT_DELETE_REQUEST });
    await api.delete(`/product/${sku}`);
    dispatch({ type: types.PRODUCT_DELETE_SUCCESS, payload: sku });
    dispatch(commonUiActions.showToastMessage('product is successfully deleted!', 'success'));
    dispatch(getProductList());
  } catch (err) {
    dispatch({ type: types.PRODUCT_DELETE_FAIL, payload: err });
    dispatch(commonUiActions.showToastMessage(err, 'error'));
    console.error(err);
  }
};

const editProduct = (formData, sku) => async (dispatch) => {
  try {
    dispatch({ type: types.PRODUCT_EDIT_REQUEST });
    const response = await api.put(`/product/${sku}`, formData);
    dispatch({ type: types.PRODUCT_EDIT_SUCCESS, payload: response.data });
    dispatch(commonUiActions.showToastMessage('product is successfully edited!', 'success'));
    dispatch(getProductList());
  } catch (err) {
    dispatch({ type: types.PRODUCT_EDIT_FAIL, payload: err });
    dispatch(commonUiActions.showToastMessage(err, 'error'));
    console.error(err);
  }
};

export const productActions = {
  getProductList,
  createProduct,
  deleteProduct,
  editProduct,
  getProductDetail,
};
