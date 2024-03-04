import { MenuItem, Select, TextField } from '@mui/material';
import { RiDeleteBinLine } from "react-icons/ri";

import img from '../../../../assets/image.png'

import classes from './style.module.scss';
import { useDispatch } from 'react-redux';
import { deleteCart, getDataCart } from '../action';

const CardCart = ({ data, func, updateFunc }) => {

    return (
        <div className={classes.card}>
            <div className={classes.contentCard}>
                <img className={classes.image} src={data?.product?.image_url ? data?.product?.image_url : img} alt="Image" />
                <div className={classes.description}>
                    <h4>
                        {data?.product?.name}
                    </h4>
                    <p>Rp {data?.product?.price.toLocaleString()}</p>
                    <p>Total : Rp {(data?.product?.price * data?.qty).toLocaleString()}</p>
                    <Select value={data?.qty} onChange={updateFunc}>
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                        <MenuItem value={4}>4</MenuItem>
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={6}>6</MenuItem>
                        <MenuItem value={7}>7</MenuItem>
                        <MenuItem value={8}>8</MenuItem>
                        <MenuItem value={9}>9</MenuItem>
                        <MenuItem value={10}>10</MenuItem>
                    </Select>
                </div>
            </div>
            <RiDeleteBinLine onClick={func} className={classes.buttonIcon} />
        </div>
    )
}

export default CardCart