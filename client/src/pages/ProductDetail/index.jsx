import { FaRegHeart, FaHeart } from "react-icons/fa";
import { FormattedMessage } from 'react-intl';
import { Button } from '@mui/material';
import PropTypes from 'prop-types';
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";

import img from '../../../assets/image.png';

import classes from './style.module.scss';
import { connect, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getData, setCart } from "./action";
import { useParams } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { selectDetail } from "./selector";
import toast, { Toaster } from "react-hot-toast";
import { getDataCart } from "@pages/Cart/action";

const ProductDetail = ({ detail }) => {

    const dispatch = useDispatch();
    const { id } = useParams();
    const [qty, setQty] = useState(1)

    useEffect(() => {
        dispatch(getData(id))
    }, []);

    const handleQty = (icon) => {
        if (icon === '-') {
            if (qty === 1) {
                toast.error('Minimum order 1 pcs')
            } else if (qty > 1) {
                setQty(qty - 1)
            }
        } else if (icon === '+') {
            if (qty >= detail?.stock) {
                toast.error('Limited stock');
            } else if (qty < detail?.stock) {
                setQty(qty + 1)
            }
        }
    }

    const addToCart = () => {
        dispatch(setCart({ qty, product_id: detail?.id }, () => {
            dispatch(getDataCart())
        }));
        // console.log({ qty, product_id: detail?.id })
    };

    const addToWishlist = () => {
        console.log('INI IWSHLIST')
    }

    return (
        <div className={classes.container}>
            <div className={classes.containerContent}>
                <img src={detail?.image_url ? detail?.image_url : img} alt="Image" className={classes.image} />
                <div className={classes.detailProduct}>
                    <div className={classes.headerDescription}>
                        <div className={classes.titlePrice}>
                            <h3 className={classes.title}>
                                {detail?.name}
                            </h3>
                            <p className={classes.price}>
                                Rp {detail?.price.toLocaleString()}
                            </p>
                        </div>
                        <FaRegHeart onClick={addToWishlist} className={classes.buttonIcon} />
                        {/* <FaHeart fontSize={28} className={classes.buttonIcon}/> */}
                    </div>
                    <p className={classes.description}>
                        {detail?.description}
                    </p>
                    <div className={classes.qtyContainer}>
                        <CiCircleMinus onClick={() => handleQty('-')} className={classes.buttonIcon} />
                        <p>
                            {qty}
                        </p>
                        <CiCirclePlus onClick={() => handleQty('+')} className={classes.buttonIcon} />
                    </div>
                    <Button onClick={addToCart} variant="contained" sx={{ width: '100%', marginTop: '20px' }}>
                        <FormattedMessage id='add_to_cart' />
                    </Button>
                </div>
            </div>
            <Toaster />
        </div>
    )
}

ProductDetail.propTypes = {
    detail: PropTypes.object
};

const mapStateToProps = createStructuredSelector({
    detail: selectDetail,
})

export default connect(mapStateToProps)(ProductDetail);