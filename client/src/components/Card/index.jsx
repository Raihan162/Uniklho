import { Button, Divider } from '@mui/material';
import defaultImage from '../../../assets/image.png';

import classes from './style.module.scss';
import { useNavigate } from 'react-router-dom';

const Card = ({ data }) => {

    const navigate = useNavigate();

    const handleToDetail = (id) => {
        navigate(`/product/detail/${id}`);
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
                <Button variant='contained'>
                    Add to Cart
                </Button>
            </div>
        </div >
    )
}

export default Card