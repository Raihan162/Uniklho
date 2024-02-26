import { Button, Divider } from '@mui/material';
import defaultImage from '../../../assets/image.png';

import classes from './style.module.scss';
import { useNavigate } from 'react-router-dom';
import { setCart } from '@pages/ProductDetail/action';
import { useDispatch } from 'react-redux';
import { getDataCart } from '@pages/Cart/action';

const Card = ({ data, func }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleToDetail = (id) => {
        navigate(`/product/detail/${id}`);
    };

    const addToCart = () => {
        dispatch(setCart({ qty: 1, product_id: data?.id }, () => {
            dispatch(getDataCart())
        }));
        // console.log({ qty, product_id: detail?.id })
    };

    return (
        <div className={classes.card}>
            <img src={data?.image_url ? data?.image_url : defaultImage} alt="Image" className={classes.imgProduct} />
            <div className={classes.description}>
                <h4>
                    {data?.name}
                </h4>
                <p>
                    Rp {data?.price.toLocaleString()}
                </p>
            </div>
            {/* <Divider /> */}
            <div className={classes.buttonContainer}>
                <Button onClick={() => handleToDetail(data?.id)}>
                    Detail
                </Button>
                <Button onClick={addToCart} variant='contained'>
                    Add to Cart
                </Button>
            </div>
        </div >
    )
}

export default Card