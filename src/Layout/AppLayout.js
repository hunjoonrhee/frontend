import React, { useEffect } from 'react';
import { useLocation } from 'react-router';
import { Col, Row } from 'react-bootstrap';
import Sidebar from '../component/Sidebar';
import Navbar from '../component/Navbar';
import ToastMessage from '../component/ToastMessage';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../action/userAction';
import { commonUiActions } from '../action/commonUiAction';
import { cartActions } from '../action/cartAction';

const AppLayout = ({ children }) => {
  const location = useLocation();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(userActions.loginWithToken());
  }, []);

  useEffect(() => {
    dispatch(cartActions.getCartList());
  }, [user]);

  return (
    <div>
      <ToastMessage />
      {location.pathname.includes('admin') ? (
        <Row className="vh-100">
          <Col xs={12} md={3} className="sidebar mobile-sidebar">
            <Sidebar />
          </Col>
          <Col xs={12} md={9}>
            {children}
          </Col>
        </Row>
      ) : (
        <>
          <Navbar user={user} />
          {children}
        </>
      )}
    </div>
  );
};

export default AppLayout;
