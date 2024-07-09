import React, { useEffect } from 'react';
import ProductCard from '../component/ProductCard';
import { Row, Col, Container } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { productActions } from '../action/productAction';
import { commonUiActions } from '../action/commonUiAction';
import ToastMessage from '../component/ToastMessage';

const ProductAll = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);
  // 처음 로딩하면 상품리스트 불러오기

  useEffect(() => {
    dispatch(productActions.getProductList());
  }, []);

  return (
    <Container>
      <Row>
        {products.map((p) => {
          return (
            <Col sm={12} md={3}>
              <ProductCard product={p} key={p._id} />
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default ProductAll;
