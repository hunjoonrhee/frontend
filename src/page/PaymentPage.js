import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import OrderReceipt from '../component/OrderReceipt';
import '../style/paymentPage.style.css';
import { useSelector, useDispatch } from 'react-redux';
import { orderActions } from '../action/orderAction';
import { useNavigate } from 'react-router';
import { commonUiActions } from '../action/commonUiAction';
import { cc_expires_format } from '../utils/number';
import PaymentForm from '../component/PaymentForm';
import { cartActions } from '../action/cartAction';

const PaymentPage = () => {
  const dispatch = useDispatch();
  const { cartItems, totalPrice } = useSelector((state) => state.cart);

  const [cardValue, setCardValue] = useState({
    cvc: '',
    expiry: '',
    focus: '',
    name: '',
    number: '',
  });
  const navigate = useNavigate();
  const [firstLoading, setFirstLoading] = useState(true);
  const [shipInfo, setShipInfo] = useState({
    firstName: '',
    lastName: '',
    contact: '',
    address: '',
    city: '',
    zip: '',
  });

  //맨처음 페이지 로딩할때는 넘어가고  오더번호를 받으면 성공페이지로 넘어가기

  const handleSubmit = (event) => {
    event.preventDefault();
    const { firstname, lastName, contact, address, city, zip } = shipInfo;
    const data = {
      totalPrice,
      shipTo: { address, city, zip },
      contact: { firstname, lastName, contact },
      orderList: cartItems.map((item) => {
        return {
          productId: item.productId._id,
          price: item.productId.price,
          quantity: item.quantity,
          size: item.size,
        };
      }),
    };
    //오더 생성하가ㅣ
    dispatch(orderActions.createOrder(data, navigate));
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setShipInfo({ ...shipInfo, [name]: value });
  };

  const handlePaymentInfoChange = (event) => {
    const { name, value } = event.target;
    if (name === 'expiry') {
      let newValue = cc_expires_format(value);
      setCardValue((prev) => ({ ...prev, [name]: newValue }));
      return;
    }

    setCardValue((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputFocus = (e) => {
    setCardValue({ ...cardValue, focus: e.target.name });
  };
  //카트에 아이템이 없다면 다시 카트페이지로 돌아가기 (결제할 아이템이 없으니 결제페이지로 가면 안됌)
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/cart');
    }
  }, [cartItems]);

  return (
    <Container>
      <Row>
        <Col lg={7}>
          <div>
            <h2 className="mb-2">Shipping address</h2>
            <div>
              <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="lastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" onChange={handleFormChange} required name="lastName" />
                  </Form.Group>

                  <Form.Group as={Col} controlId="firstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" onChange={handleFormChange} required name="firstName" />
                  </Form.Group>
                </Row>

                <Form.Group className="mb-3" controlId="formGridAddress1">
                  <Form.Label>Contact</Form.Label>
                  <Form.Control placeholder="010-xxx-xxxxx" onChange={handleFormChange} required name="contact" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGridAddress2">
                  <Form.Label>Address</Form.Label>
                  <Form.Control placeholder="Apartment, studio, or floor" onChange={handleFormChange} required name="address" />
                </Form.Group>

                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>City</Form.Label>
                    <Form.Control onChange={handleFormChange} required name="city" />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridZip">
                    <Form.Label>Zip</Form.Label>
                    <Form.Control onChange={handleFormChange} required name="zip" />
                  </Form.Group>
                </Row>
                <div className="mobile-receipt-area">{/* <OrderReceipt /> */}</div>
                <div>
                  <h2 className="payment-title">Payment information</h2>
                  <PaymentForm handleInputFocus={handleInputFocus} cardValue={cardValue} handlePaymentInfoChange={handlePaymentInfoChange} />
                </div>

                <Button variant="dark" className="payment-button pay-button" type="submit">
                  Make payment
                </Button>
              </Form>
            </div>
          </div>
        </Col>
        <Col lg={5} className="receipt-area">
          <OrderReceipt cartItems={cartItems} totalPrice={totalPrice} />
        </Col>
      </Row>
    </Container>
  );
};

export default PaymentPage;
