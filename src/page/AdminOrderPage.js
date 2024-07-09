import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import SearchBox from '../component/SearchBox';
import { useDispatch, useSelector } from 'react-redux';
import { orderActions } from '../action/orderAction';
import OrderDetailDialog from '../component/OrderDetailDialog';
import OrderTable from '../component/OrderTable';
import * as types from '../constants/order.constants';
import ReactPaginate from 'react-paginate';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { commonUiActions } from '../action/commonUiAction';
import { IconContext } from 'react-icons';
import { AiFillLeftCircle, AiFillRightCircle } from 'react-icons/ai';

const AdminOrderPage = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useSearchParams();
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState({
    page: query.get('page') || 1,
    orderNum: query.get('orderNum') || '',
  });
  const [open, setOpen] = useState(false);
  const { orderList, totalPageNum, pageSize, updateOrderSuccess } = useSelector((state) => state.order);
  const tableHeader = ['#', 'Order#', 'Order Date', 'User', 'Order Item', 'Address', 'Total Price', 'Status'];

  useEffect(() => {
    dispatch(orderActions.getOrderList({ ...searchQuery }));
  }, [query, updateOrderSuccess]);

  useEffect(() => {
    if (searchQuery.orderNum === '') {
      delete searchQuery.orderNum;
    }
    const params = new URLSearchParams(searchQuery);
    const queryString = params.toString();

    navigate('?' + queryString);
  }, [searchQuery]);

  const openEditForm = (order) => {
    setOpen(true);
    dispatch({ type: types.SET_SELECTED_ORDER, payload: order });
  };

  const handlePageClick = ({ selected }) => {
    setSearchQuery({ ...searchQuery, page: selected + 1 });
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="locate-center">
      <Container>
        <div className="mt-2 display-center mb-2">
          <SearchBox searchQuery={searchQuery} setSearchQuery={setSearchQuery} placeholder="Order number" field="orderNum" />
        </div>

        <OrderTable header={tableHeader} data={orderList} openEditForm={openEditForm} />
        <ReactPaginate
          nextLabel={
            <IconContext.Provider value={{ color: '#B8C1CC', size: '36px' }}>
              <AiFillRightCircle />
            </IconContext.Provider>
          }
          onPageChange={handlePageClick}
          pageRangeDisplayed={pageSize}
          pageCount={totalPageNum}
          previousLabel={
            <IconContext.Provider value={{ color: '#B8C1CC', size: '36px' }}>
              <AiFillLeftCircle />
            </IconContext.Provider>
          }
          renderOnZeroPageCount={null}
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          className="display-center list-style-none"
        />
      </Container>

      {open && <OrderDetailDialog open={open} handleClose={handleClose} />}
    </div>
  );
};

export default AdminOrderPage;
