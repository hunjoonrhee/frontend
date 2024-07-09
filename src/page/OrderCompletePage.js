import React from 'react';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import '../style/paymentPage.style.css';

const OrderCompletePage = () => {
  const { orderNumber } = useSelector((state) => state.order);
  //만약 주문번호가 없는상태로 이페이지에 왔다면 다시 메인페이지로 돌아가기
  if (!orderNumber) {
    return (
      <Container className="confirmation-page">
        <h1>Order Failed!</h1>
        <div>
          Go to the main page
          <Link to="/"> Main Page</Link>
        </div>
      </Container>
    );
  }
  return (
    <Container className="confirmation-page">
      <img src="/image/greenCheck.png" width={100} className="check-image" alt="greenCheck.png" />
      <h2>Your order has been completed!</h2>
      <div>Order number: {orderNumber}</div>
      <div>
        To confirm your order, please check the My Order menu.
        <div className="text-align-center">
          <Link to={'/account/purchase'}>Go to my order</Link>
        </div>
      </div>
    </Container>
  );
};

export default OrderCompletePage;
