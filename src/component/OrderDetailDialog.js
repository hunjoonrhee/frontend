import React, { useState } from 'react';
import { Form, Modal, Button, Col, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import '../style/adminOrder.style.css';
import { ORDER_STATUS } from '../constants/order.constants';
import { orderActions } from '../action/orderAction';
import { currencyFormat } from '../utils/number';
import { commonUiActions } from '../action/commonUiAction';

const OrderDetailDialog = ({ open, handleClose }) => {
  const { selectedOrder } = useSelector((state) => state.order);
  const [orderStatus, setOrderStatus] = useState(selectedOrder.status);
  const dispatch = useDispatch();

  const handleStatusChange = (event) => {
    setOrderStatus(event.target.value);
  };
  const submitStatus = () => {
    dispatch(orderActions.updateOrder(selectedOrder._id, orderStatus));
    handleClose();
  };

  if (!selectedOrder) {
    dispatch(commonUiActions.showToastMessage('selected order not found!', 'error'));
  }
  return (
    <Modal show={open} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Order Detail</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Order Num.: {selectedOrder.orderNum}</p>
        <p>Order date: {selectedOrder.createdAt.slice(0, 10)}</p>
        <p>Email: {selectedOrder.userId.email}</p>
        <p>Address:{selectedOrder.shipTo.address + ' ' + selectedOrder.shipTo.city}</p>
        <p>
          Contact:
          {`${selectedOrder.contact.firstName + selectedOrder.contact.lastName} ${selectedOrder.contact.contact}`}
        </p>
        <p>Order Detail</p>
        <div className="overflow-x">
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Unit Price</th>
                <th>Qty</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {selectedOrder.orderItems.length > 0 &&
                selectedOrder.orderItems.map((item) => (
                  <tr key={item._id}>
                    <td>{item._id}</td>
                    <td>{item.productId.name}</td>
                    <td>{currencyFormat(item.price)}</td>
                    <td>{item.quantity}</td>
                    <td>{currencyFormat(item.price * item.quantity)}</td>
                  </tr>
                ))}
              <tr>
                <td colSpan={4}>Total:</td>
                <td>{currencyFormat(selectedOrder.totalPrice)}</td>
              </tr>
            </tbody>
          </Table>
        </div>
        <Form onSubmit={submitStatus}>
          <Form.Group as={Col} controlId="status">
            <Form.Label>Status</Form.Label>
            <Form.Select value={orderStatus} onChange={handleStatusChange}>
              {ORDER_STATUS.map((item, idx) => (
                <option key={idx} value={item.toLowerCase()}>
                  {item}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <div className="order-button-area">
            <Button variant="light" onClick={handleClose} className="order-button">
              Close
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default OrderDetailDialog;
