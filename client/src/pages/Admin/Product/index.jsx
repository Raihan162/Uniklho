import { FormattedMessage } from 'react-intl';
import { Button, Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@mui/material';
import { MdOutlineEdit, MdDeleteOutline } from "react-icons/md";
import { connect, useDispatch } from 'react-redux';

import { useEffect, useState } from 'react';
import { deleteProduct, getCategory, getProduct } from './action';
import PropTypes from 'prop-types';

import classes from './style.module.scss';
import { createStructuredSelector } from 'reselect';
import { selectCategory, selectProduct } from './selector';
import Modal from './components/Modal';
import { selectToken } from '@containers/Client/selectors';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

const Product = ({ product, category, token }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const decodeToken = jwtDecode(token);

    const handleModal = () => {
        setOpen(!open)
    }

    const handleDeleteProduct = (id) => {
        dispatch(deleteProduct(id, () => {
            dispatch(getProduct())
        }))
    }

    useEffect(() => {
        dispatch(getProduct());
        dispatch(getCategory());
        if (decodeToken?.role !== 'Admin') {
            navigate('/')
        }
    }, []);

    return (
        <div className={classes.container}>
            <h2>
                <FormattedMessage id='product' />
            </h2>

            <div className={classes.containerInputAdd}>
                <TextField className={classes.input} label={<FormattedMessage id='search_product' />} variant="outlined" />
                <Button onClick={handleModal} variant='contained'>
                    <FormattedMessage id='add_product' />
                </Button>
            </div>
            {open ?
                <Modal handleModal={handleModal} open={open} setOpen={setOpen} category={category} />
                :
                null}

            <Table className={classes.tableProduct}>
                <TableHead>
                    <TableRow>
                        <TableCell width={50}>
                            No
                        </TableCell>
                        <TableCell width={180}>
                            <FormattedMessage id='product_image' />
                        </TableCell>
                        <TableCell width={200}>
                            <FormattedMessage id='product_name' />
                        </TableCell>
                        <TableCell width={500}>
                            <FormattedMessage id='product_description' />
                        </TableCell>
                        <TableCell width={50}>
                            <FormattedMessage id='product_stock' />
                        </TableCell>
                        <TableCell width={150}>
                            <FormattedMessage id='product_price' />
                        </TableCell>
                        <TableCell width={150}>
                            <FormattedMessage id='product_category' />
                        </TableCell>
                        <TableCell width={150}>
                            <FormattedMessage id='action' />
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        product ?
                            product?.map((value, index) => {
                                return (
                                    <TableRow key={index}>
                                        <TableCell>
                                            {index + 1}
                                        </TableCell>
                                        <TableCell>
                                            <img className={classes.imageProduct} src={value?.image_url} alt={`${value?.name} Image`} />
                                        </TableCell>
                                        <TableCell>
                                            {value?.name}
                                        </TableCell>
                                        <TableCell>
                                            {value?.description}
                                        </TableCell>
                                        <TableCell>
                                            {value?.stock}
                                        </TableCell>
                                        <TableCell>
                                            Rp {value?.price?.toLocaleString()}
                                        </TableCell>
                                        <TableCell>
                                            {value?.category?.name}
                                        </TableCell>
                                        <TableCell className={classes.action}>
                                            <button className={classes.buttonEdit}>
                                                <MdOutlineEdit />
                                            </button>
                                            <button onClick={() => handleDeleteProduct(value?.id)} className={classes.buttonDel}>
                                                <MdDeleteOutline />
                                            </button>
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                            :
                            <TableRow>
                                <TableCell>
                                    Data Tidak Ada.
                                </TableCell>
                            </TableRow>
                    }
                </TableBody>
            </Table>
            <Toaster />
        </div>
    )
}

Product.propTypes = {
    product: PropTypes.array,
    category: PropTypes.array,
    token: PropTypes.object
};

const mapStateToProps = createStructuredSelector({
    product: selectProduct,
    category: selectCategory,
    token: selectToken,
})

export default connect(mapStateToProps)(Product);