import React from 'react';
import { useNavigate } from 'react-router-dom';
import { currencyFormat } from '../utils/number';
import PropTypes from 'prop-types';
import NewItemDialog from './NewItemDialog';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const showProduct = (sku) => {
    // 상품 디테일 페이지로 가기
    navigate(`/product/${sku}`);
  };
  return (
    <div>
      <div className="card" onClick={() => showProduct(product.sku)}>
        <img src={product.image} alt={product.name} />
        <div>{product.name}</div>
        <div>{product.price} €</div>
      </div>
    </div>
  );
};

ProductCard.prototype = {
  product: PropTypes.object,
};

export default ProductCard;
