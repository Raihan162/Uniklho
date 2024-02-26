import { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import classes from './style.module.scss';
import Card from '@components/Card';
import { createStructuredSelector } from 'reselect';
import { selectProduct } from '@pages/Admin/Product/selector';
import { getProduct } from '@pages/Admin/Product/action';
import { setCart } from '@pages/ProductDetail/action';
import { Toaster } from 'react-hot-toast';

const Home = ({ product }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProduct())
  }, []);



  return (
    <div className={classes.container}>
      <div className={classes.allProduct}>
        <h2>
          All Product
        </h2>
        <div className={classes.containerCard}>
          {
            product?.map((value, index) => {
              return (
                <Card key={index} data={value} />
              )
            })
          }
        </div>
      </div>
      <Toaster />
    </div>
  );
};

Home.propTypes = {
  product: PropTypes.array
};

const mapStateToProps = createStructuredSelector({
  product: selectProduct
})

export default connect(mapStateToProps)(Home);
