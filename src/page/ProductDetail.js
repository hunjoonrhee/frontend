import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Row, Col, Button, Dropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { productActions } from '../action/productAction';
import { ColorRing } from 'react-loader-spinner';
import { cartActions } from '../action/cartAction';
import { commonUiActions } from '../action/commonUiAction';
import { currencyFormat } from '../utils/number';
import '../style/productDetail.style.css';

const ProductDetail = () => {
  const dispatch = useDispatch();
  const { product } = useSelector((state) => state.product);
  const { user } = useSelector((state) => state.user);

  const [size, setSize] = useState('');
  const { sku } = useParams();

  const [sizeError, setSizeError] = useState(false);

  useEffect(() => {
    //상품 디테일 정보 가져오기
    dispatch(productActions.getProductDetail(sku));
  }, [dispatch, sku]);

  if (!product) {
    return;
  }
  function getAvailableSizes(obj) {
    const keysArr = [];
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        keysArr.push(key);
      }
    }
    return keysArr;
  }

  const availableSize = getAvailableSizes(product?.stock);
  const navigate = useNavigate();

  const addItemToCart = () => {
    //사이즈를 아직 선택안했다면 에러
    if (!size) {
      setSizeError(true);
    }
    if (!user) {
      navigate('/login');
    }

    dispatch(
      cartActions.addToCart({
        productId: product._id,
        size: size,
        quantity: 1,
      }),
    );
    // 카트에 아이템 추가하기
  };
  const selectSize = (value) => {
    // 사이즈 추가하기
    setSize(value);
    setSizeError(false);
  };

  return (
    <Container className="product-detail-card">
      <Row>
        <Col sm={6}>
          <img src={product.image} className="w-100" alt={product.name} />
        </Col>
        <Col className="product-info-area" sm={6}>
          <div className="product-info">{product.name}</div>
          <div className="product-info">€ {product.price}</div>
          <div className="product-info">{product.description}</div>

          <Dropdown className="drop-down size-drop-down" title={size} align="start" onSelect={(eventKey) => selectSize(eventKey)}>
            <Dropdown.Toggle className="size-drop-down" variant={sizeError ? 'outline-danger' : 'outline-dark'} id="dropdown-basic" align="start">
              {size === '' ? 'Select size' : size.toUpperCase()}
            </Dropdown.Toggle>

            <Dropdown.Menu className="size-drop-down">
              {availableSize.map((size) => {
                return (
                  <Dropdown.Item eventKey={size.toUpperCase()} disabled={product.stock[size.toUpperCase()] === 0}>
                    {size.toUpperCase()}
                  </Dropdown.Item>
                );
              })}
            </Dropdown.Menu>
          </Dropdown>
          <div className="warning-message">{sizeError && 'Please select size'}</div>
          <Button variant="dark" className="add-button" onClick={addItemToCart}>
            Add
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetail;
