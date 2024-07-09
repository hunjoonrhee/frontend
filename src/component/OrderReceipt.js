import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';
import { currencyFormat } from '../utils/number';

const OrderReceipt = ({ cartItems, totalPrice }) => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="receipt-container">
      <h3 className="receipt-title">Order History</h3>
      <ul className="receipt-list">
        {cartItems.map((item) => {
          return (
            <li>
              <div className="display-flex space-between">
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <div style={{ marginRight: '10px' }}>{item.productId.name}, </div>
                  <div>{item.quantity} pcs.</div>
                </div>

                <div>€ {item.productId.price * item.quantity}</div>
              </div>
            </li>
          );
        })}
      </ul>
      <div className="display-flex space-between receipt-title">
        <div>
          <strong>Total: € {totalPrice}</strong>
        </div>
        <div>
          <strong>€ {totalPrice}</strong>
        </div>
      </div>
      {location.pathname.includes('/cart') && (
        <Button variant="dark" className="payment-button" onClick={() => navigate('/payment')} disabled={cartItems.length === 0}>
          Continue payment
        </Button>
      )}

      <div>
        Accepted Payment Methods Price and shipping charges will not be confirmed until you reach the payment stage.
        <div>Read about 30-day return window, return fees and additional shipping charges if not received Returns and Refunds</div>
      </div>
    </div>
  );
};

export default OrderReceipt;
