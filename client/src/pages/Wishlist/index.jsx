import { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import classes from './style.module.scss';
import { createStructuredSelector } from 'reselect';
import { Toaster } from 'react-hot-toast';
import { selectWishlist } from './selectors';
import { getWishlist } from './actions';
import CardWishlist from '@components/CardWishlist';

const Wishlist = ({ wishlist }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWishlist())
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.allProduct}>
        <h2>
          <FormattedMessage id="wishlist" />
        </h2>
        <div className={classes.containerCard}>
          {
            wishlist?.map((value, index) => {
              return (
                <CardWishlist key={index} data={value} />
              )
            })
          }
        </div>
      </div>
      <Toaster />
    </div>
  );
};

Wishlist.propTypes = {
  wishlist: PropTypes.array
};

const mapStateToProps = createStructuredSelector({
  wishlist: selectWishlist
})

export default connect(mapStateToProps)(Wishlist);
