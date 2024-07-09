import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../action/cartAction';
import CartProductCard from '../component/CartProductCard';
import OrderReceipt from '../component/OrderReceipt';
import '../style/cart.style.css';
import { productActions } from '../action/productAction';

const CartPage = () => {
  const dispatch = useDispatch();
  const { cartItems, totalPrice } = useSelector((state) => state.cart);
  const { product } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(cartActions.getCartList());
    //카트리스트 불러오기
  }, []);

  return (
    <Container>
      <Row>
        <Col xs={12} md={7}>
          {cartItems.length === 0 ? (
            <div className="text-align-center empty-bag">
              <h2>Your Cart is empty!</h2>
              <div>Please add products in to cart</div>
            </div>
          ) : (
            cartItems.map((i) => {
              return <CartProductCard item={i} key={i.sku} />;
            })
          )}
        </Col>
        <Col xs={12} md={5}>
          <OrderReceipt cartItems={cartItems} totalPrice={totalPrice} />
        </Col>
      </Row>
    </Container>
  );
};

export default CartPage;
