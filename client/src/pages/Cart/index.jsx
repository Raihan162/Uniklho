import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import CardCart from './components';

import classes from './style.module.scss';
import { createStructuredSelector } from 'reselect';
import { selectCart } from './selector';
import { connect, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { deleteCart, getDataCart } from './action';
import { Button } from '@mui/material';

const Cart = ({ cart }) => {

    const dispatch = useDispatch();

    const handleDelete = (id) => {
        dispatch(deleteCart(id, () => {
            dispatch(getDataCart())
        }))
    };

    const getSubtotal = () => {
        let subtotal = 0
        cart?.forEach((data, idx) => {
            subtotal += (data?.qty * data?.product?.price)
        })
        return subtotal.toLocaleString();
    }

    useEffect(() => {
        dispatch(getDataCart())
    }, [])

    return (
        <div className={classes.container}>
            <div className={classes.contentContainer}>
                <h2 className={classes.title}>
                    <FormattedMessage id='cart' />
                </h2>
                <div className={classes.contentCart}>
                    <div className={classes.listCart}>
                        {
                            cart?.map((value, index) => {
                                return (
                                    <CardCart key={index} data={value} func={() => handleDelete(value?.id)} />
                                )
                            })
                        }
                    </div>
                    <div className={classes.subTotContainer}>
                        <h3>
                            Subtotal
                        </h3>
                        <div className={classes.subTot}>
                            <p>
                                Total
                            </p>
                            <p>
                                Rp {getSubtotal()}
                            </p>
                        </div>
                        <Button variant='contained'>
                            <FormattedMessage id='continue_to_checkout' />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
};

Cart.proptypes = {
    cart: PropTypes.array
}

const mapStateToProps = createStructuredSelector({
    cart: selectCart
})

export default connect(mapStateToProps)(Cart);