import { Button, Divider } from '@mui/material';
import defaultImage from '../../../assets/image.png';

import classes from './style.module.scss';
import { useNavigate } from 'react-router-dom';
import { setCart } from '@pages/ProductDetail/action';
import { useDispatch } from 'react-redux';
import { getDataCart } from '@pages/Cart/action';

const CardWishlist = ({ data }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleToDetail = (id) => {
        navigate(`/product/detail/${id}`);
    };

    const addToCart = () => {
        dispatch(setCart({ qty: 1, product_id: data?.product?.id }, () => {
            dispatch(getDataCart())
        }));
        // console.log({ qty, product_id: detail?.id })
    };

    return (
        <div className={classes.card}>
            <img src={data?.product?.image_url ? data?.product?.image_url : defaultImage} alt="Image" className={classes.imgProduct} />
            <div className={classes.description}>
                <h4>
                    {data?.product?.name}
                </h4>
                <p>
                    Rp {data?.product?.price.toLocaleString()}
                </p>
            </div>
            {/* <Divider /> */}
            <div className={classes.buttonContainer}>
                <Button onClick={() => handleToDetail(data?.product?.id)}>
                    Detail
                </Button>
                <Button onClick={addToCart} variant='contained'>
                    Add to Cart
                </Button>
            </div>
        </div >
    )
}

export default CardWishlist