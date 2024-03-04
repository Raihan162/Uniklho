import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import CardCart from './components';
import { createStructuredSelector } from 'reselect';
import { selectCart } from './selector';
import { connect, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { deleteCart, getDataCart, updateQtyCart } from './action';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { BsCartX } from "react-icons/bs";

import classes from './style.module.scss';
import { Toaster } from 'react-hot-toast';

const Cart = ({ cart }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleDelete = (id) => {
        dispatch(deleteCart(id, () => {
            dispatch(getDataCart())
        }))
    };

    const handleToCheckout = () => {
        navigate('/checkout');
    };

    const updateQTY = (event, product_id) => {
        dispatch(updateQtyCart({ qty:event.target.value, product_id}, () => {
            dispatch(getDataCart())
        }));
    }

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
                {
                    cart?.length !== 0 ?
                        <div className={classes.contentCart}>
                            <div className={classes.listCart}>
                                {
                                    cart?.map((value, index) => {
                                        return (
                                            <CardCart key={index} data={value} func={() => handleDelete(value?.id)} updateFunc={(e) => updateQTY(e, value?.product?.id)} />
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
                                <Button onClick={handleToCheckout} variant='contained'>
                                    <FormattedMessage id='continue_to_checkout' />
                                </Button>
                            </div>
                        </div>
                        :
                        <div className={classes.emptyCart}>
                            <BsCartX fontSize={96}/>
                            <h2>
                                <FormattedMessage id="empty_cart" />
                            </h2>
                        </div>
                }
            </div>
            <Toaster />
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