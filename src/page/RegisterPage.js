import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { userActions } from '../action/userAction';
import '../style/register.style.css';
const RegisterPage = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
    confirmPassword: '',
    policy: false,
  });
  const navigate = useNavigate();
  const [passwordError, setPasswordError] = useState('');
  const [policyError, setPolicyError] = useState(false);
  const { registerError } = useSelector((state) => state.user);

  const register = (event) => {
    event.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return;
    }
    if (formData.policy === false) {
      setPolicyError(true);
      return;
    }

    setPasswordError('');
    setPolicyError(false);
    dispatch(userActions.registerUser({ email: formData.email, name: formData.name, password: formData.password }, navigate));
  };

  const isPasswordMatched = formData.password === formData.confirmPassword;

  return (
    <Container className="register-area">
      {registerError && (
        <div>
          <Alert variant="danger" className="error-message">
            {registerError}
          </Alert>
        </div>
      )}
      <Form onSubmit={register}>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            id="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            id="name"
            placeholder="Enter name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            id="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            id="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            isInvalid={!isPasswordMatched}
          />
          {!isPasswordMatched && formData.confirmPassword && <h6 style={{ color: 'red' }}>password doesn't match!</h6>}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            label="이용약관에 동의합니다"
            id="policy"
            onChange={(e) => setFormData({ ...formData, policy: e.target.checked })}
            value={formData.policy}
            checked={formData.policy}
            required
            isInvalid={policyError}
          />
        </Form.Group>
        <Button variant="danger" type="submit">
          회원가입
        </Button>
      </Form>
    </Container>
  );
};

export default RegisterPage;
