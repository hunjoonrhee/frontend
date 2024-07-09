import React, { useEffect, useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../action/userAction';

import '../style/login.style.css';
import { GoogleLogin } from '@react-oauth/google';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { logInError } = useSelector((state) => state.user);
  const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  const loginWithEmail = (event) => {
    event.preventDefault();
    const payload = { email: email, password: password };
    dispatch(userActions.loginWithEmail(payload));
  };

  const handleGoogleLogin = async (googleData) => {
    // 구글로 로그인 하기
    dispatch(userActions.loginWithGoogle(googleData.credential));
  };

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user]);

  return (
    <>
      <Container className="login-area">
        {logInError && (
          <div className="error-message">
            <Alert variant="danger">{logInError}</Alert>
          </div>
        )}
        <Form className="login-form" onSubmit={loginWithEmail}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" required value={email} onChange={(event) => setEmail(event.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" required value={password} onChange={(event) => setPassword(event.target.value)} />
          </Form.Group>
          <div className="display-space-between login-button-area">
            <Button variant="danger" type="submit">
              Login
            </Button>
            <div>
              Don't have an account yet? <Link to="/register">Sign Up</Link>{' '}
            </div>
          </div>

          <div className="text-align-center mt-2">
            <div className="display-center">
              <GoogleLogin
                onSuccess={handleGoogleLogin}
                onError={() => {
                  console.log('Login Failed');
                }}
              />
            </div>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default Login;
