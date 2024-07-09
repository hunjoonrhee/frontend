import * as types from '../constants/order.constants';

const initialState = {
  orderNumber: null,
  createOrderError: null,
  orderList: [],
  myOrders: [],
  selectedOrder: {},
  getOrderListError: null,
  getMyOrderListError: null,
  updateOrderError: null,
  updateOrderSuccess: null,
  totalPageNum: 0,
  pageSize: 0,
};

function orderReducer(state = initialState, action) {
  switch (action.type) {
    case types.GET_ORDER_LIST_SUCCESS:
      return {
        ...state,
        orderList: action.payload.response.data,
        pageSize: action.payload.response.pageSize,
        totalPageNum: action.payload.response.totalPageNum,
        updateOrderSuccess: null,
      };
    case types.GET_ORDER_LIST_FAIL:
      return {
        ...state,
        getOrderListError: action.payload,
      };
    case types.GET_MY_ORDER_LIST_SUCCESS:
      return {
        ...state,
        myOrders: action.payload.orders,
      };
    case types.GET_MY_ORDER_LIST_FAIL:
      return {
        ...state,
        getMyOrderListError: action.payload,
      };
    case types.CREATE_ORDER_SUCCESS:
      return {
        ...state,
        orderNumber: action.payload.orderNum,
      };
    case types.CREATE_ORDER_FAIL:
      return {
        ...state,
        createOrderError: action.payload,
      };
    case types.UPDATE_ORDER_SUCCESS:
      return {
        ...state,
        selectedOrder: action.payload.selectedOrder,
        updateOrderSuccess: action.payload.status,
      };
    case types.UPDATE_ORDER_FAIL:
      return {
        ...state,
        updateOrderError: action.payload,
      };
    case types.SET_SELECTED_ORDER:
      return {
        ...state,
        selectedOrder: action.payload,
      };
    default:
      return state;
  }
}
export default orderReducer;
