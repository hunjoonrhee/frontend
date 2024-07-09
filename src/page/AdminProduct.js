import React, { useEffect, useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import SearchBox from '../component/SearchBox';
import { useDispatch, useSelector } from 'react-redux';
import { productActions } from '../action/productAction';
import NewItemDialog from '../component/NewItemDialog';
import ReactPaginate from 'react-paginate';
import { useSearchParams, useNavigate } from 'react-router-dom';
import ProductTable from '../component/ProductTable';
// eslint-disable-next-line import/no-extraneous-dependencies
import { IconContext } from 'react-icons';
// eslint-disable-next-line import/no-extraneous-dependencies
import { AiFillLeftCircle, AiFillRightCircle } from 'react-icons/ai';

const AdminProduct = () => {
  const navigate = useNavigate();
  const { products, totalPageNum, pageSize } = useSelector((state) => state.product);
  const [query] = useSearchParams();
  const dispatch = useDispatch();
  const [showDialog, setShowDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [searchQuery, setSearchQuery] = useState({
    page: query.get('page') || 1,
    name: query.get('name') || '',
  });

  const [mode, setMode] = useState('new');
  const tableHeader = ['#', 'Sku', 'Name', 'Price', 'Stock', 'Image', 'Status', ''];

  useEffect(() => {
    dispatch(productActions.getProductList({ ...searchQuery }));
  }, [query]);

  useEffect(() => {
    if (!searchQuery.name) {
      delete searchQuery.name;
    }
    const params = new URLSearchParams(searchQuery);
    const query = params.toString();
    navigate('?' + query);
  }, [searchQuery]);

  const deleteItem = (sku) => {
    dispatch(productActions.deleteProduct(sku));
  };

  const openEditForm = (product) => {
    setMode('edit');
    setShowDialog(true);
    setSelectedProduct(product);
  };

  const handleClickNewItem = () => {
    setMode('new');
    // 다이얼로그 열어주기
    setShowDialog(true);
  };

  const handlePageClick = ({ selected }) => {
    //  쿼리에 페이지값 바꿔주기
    setSearchQuery({ ...searchQuery, page: selected + 1 });
  };

  return (
    <div className="locate-center">
      <Container>
        <div className="mt-2">
          <SearchBox searchQuery={searchQuery} setSearchQuery={setSearchQuery} placeholder="Search with product name" field="name" />
        </div>
        <Button className="mt-2 mb-2" onClick={handleClickNewItem}>
          Add New Item +
        </Button>

        <ProductTable header={tableHeader} data={products} deleteItem={deleteItem} openEditForm={openEditForm} />
        <ReactPaginate
          nextLabel={
            <IconContext.Provider value={{ color: '#B8C1CC', size: '36px' }}>
              <AiFillRightCircle />
            </IconContext.Provider>
          }
          onPageChange={handlePageClick}
          pageRangeDisplayed={pageSize}
          pageCount={totalPageNum}
          previousLabel={
            <IconContext.Provider value={{ color: '#B8C1CC', size: '36px' }}>
              <AiFillLeftCircle />
            </IconContext.Provider>
          }
          renderOnZeroPageCount={null}
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          className="display-center list-style-none"
        />
      </Container>

      <NewItemDialog mode={mode} showDialog={showDialog} setShowDialog={setShowDialog} selectedProduct={selectedProduct} searchQuery={searchQuery} />
    </div>
  );
};

export default AdminProduct;
