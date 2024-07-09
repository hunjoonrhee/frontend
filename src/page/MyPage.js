import React, { useEffect } from 'react';
import { Button, Card, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { orderActions } from '../action/orderAction';
import OrderStatusCard from '../component/OrderStatusCard';
import '../style/orderStatus.style.css';
import { useNavigate } from 'react-router-dom';

const MyPage = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { myOrders } = useSelector((state) => state.order);
  const token = sessionStorage.getItem('token');

  useEffect(() => {
    dispatch(orderActions.getMyOrderList());
  }, [user]);

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token]);

  return (
    <Container className="status-card-container">
      {myOrders.length === 0 ? (
        <Card className="text-center">
          <Card.Body>
            <Card.Title>No Orders Found</Card.Title>
            <Card.Text>You haven't placed any orders yet. Start shopping now!</Card.Text>
            <Button variant="primary" href="/">
              Go to Shop
            </Button>
          </Card.Body>
        </Card>
      ) : (
        myOrders.map((order) => {
          return <OrderStatusCard order={order} />;
        })
      )}
    </Container>
  );
};

export default MyPage;
