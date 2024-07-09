import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faBars, faBox, faSearch, faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { Link, useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../action/userAction';
import { cartActions } from '../action/cartAction';
import { productActions } from '../action/productAction';

const Navbar = ({ user }) => {
  const dispatch = useDispatch();
  const { cartItemCount } = useSelector((state) => state.cart);
  const isMobile = window.navigator.userAgent.indexOf('Mobile') !== -1;
  const [showSearchBox, setShowSearchBox] = useState(false);
  const menuList = ['여성', 'Divided', '남성', '신생아/유아', '아동', 'H&M HOME', 'Sale', '지속가능성'];
  let [width, setWidth] = useState(0);
  let navigate = useNavigate();
  const [query] = useSearchParams();
  let field = 'name';
  const [keyword, setKeyword] = useState(query.get(field) || '');
  const [searchQuery, setSearchQuery] = useState({
    name: query.get('name') || '',
  });

  const onCheckEnter = (event) => {
    if (event.key === 'Enter') {
      setSearchQuery({ ...searchQuery, [field]: event.target.value });
    }
  };

  useEffect(() => {
    if (!searchQuery.name) {
      delete searchQuery.name;
    }
    const params = new URLSearchParams(searchQuery);
    const query = params.toString();
    navigate('?' + query);
  }, [searchQuery]);

  useEffect(() => {
    dispatch(productActions.getProductList({ ...searchQuery }));
  }, [query]);

  const logout = () => {
    dispatch(userActions.logout());
    navigate('/');
  };

  useEffect(() => {
    dispatch(cartActions.getCartList());
  }, [user]);

  const onClickCart = () => {
    if (!user) {
      navigate('/login');
    } else {
      navigate('/cart');
    }
  };

  return (
    <div>
      {showSearchBox && (
        <div className="display-space-between mobile-search-box w-100">
          <div className="search display-space-between w-100">
            <div>
              <FontAwesomeIcon className="search-icon" icon={faSearch} />
              <input type="text" placeholder="제품검색" onKeyPress={onCheckEnter} onChange={(event) => setKeyword(event.target.value)} value={keyword} />
            </div>
            <button className="closebtn" onClick={() => setShowSearchBox(false)}>
              &times;
            </button>
          </div>
        </div>
      )}
      <div className="side-menu" style={{ width: width }}>
        <button className="closebtn" onClick={() => setWidth(0)}>
          &times;
        </button>

        <div className="side-menu-list" id="menu-list">
          {menuList.map((menu, index) => (
            <button key={index}>{menu}</button>
          ))}
        </div>
      </div>
      {user && user?.role === 'admin' && (
        <Link to="/admin/product?page=1" className="link-area">
          Admin page
        </Link>
      )}
      <div className="nav-header">
        <div className="burger-menu hide">
          <FontAwesomeIcon icon={faBars} onClick={() => setWidth(250)} />
        </div>

        <div>
          <div className="display-flex">
            {user ? (
              <div onClick={logout} className="nav-icon">
                <FontAwesomeIcon icon={faUser} />
                {!isMobile && <span style={{ cursor: 'pointer' }}>Sign Out</span>}
              </div>
            ) : (
              <div onClick={() => navigate('/login')} className="nav-icon">
                <FontAwesomeIcon icon={faUser} />
                {!isMobile && <span style={{ cursor: 'pointer' }}>Sign In</span>}
              </div>
            )}
            <div onClick={onClickCart} className="nav-icon">
              <FontAwesomeIcon icon={faShoppingBag} />
              {!isMobile && <span style={{ cursor: 'pointer' }}>{`Cart (${cartItemCount || 0})`}</span>}
            </div>
            <div onClick={() => navigate('/account/purchase')} className="nav-icon">
              <FontAwesomeIcon icon={faBox} />
              {!isMobile && <span style={{ cursor: 'pointer' }}>My Order</span>}
            </div>
            {isMobile && (
              <div className="nav-icon" onClick={() => setShowSearchBox(true)}>
                <FontAwesomeIcon icon={faSearch} />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="nav-logo">
        <Link to="/">
          <img width={100} src="/image/hm-logo.png" alt="hm-logo.png" />
        </Link>
      </div>
      <div className="nav-menu-area">
        <ul className="menu">
          {menuList.map((menu, index) => (
            <li key={index}>
              <a href="#">{menu}</a>
            </li>
          ))}
        </ul>
        {!isMobile && ( // admin페이지에서 같은 search-box스타일을 쓰고있음 그래서 여기서 서치박스 안보이는것 처리를 해줌
          <div className="search-box landing-search-box ">
            <FontAwesomeIcon icon={faSearch} />
            <input type="text" placeholder="제품검색" onKeyPress={onCheckEnter} onChange={(event) => setKeyword(event.target.value)} value={keyword} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
