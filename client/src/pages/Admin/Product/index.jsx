import { FormattedMessage } from 'react-intl';
import { Button, Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@mui/material';
import { MdOutlineEdit, MdDeleteOutline } from "react-icons/md";
import { connect, useDispatch } from 'react-redux';

import { useEffect, useState } from 'react';
import { getCategory, getProduct } from './action';
import PropTypes from 'prop-types';

import classes from './style.module.scss';
import { createStructuredSelector } from 'reselect';
import { selectCategory, selectProduct } from './selector';
import Modal from './components/Modal';

const Product = ({ product, category }) => {

    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);

    const handleModal = () => {
        setOpen(!open)
    }

    useEffect(() => {
        dispatch(getProduct());
        dispatch(getCategory());
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
                <Modal handleModal={handleModal} open={open} category={category} />
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
                        <TableCell width={100}>
                            <FormattedMessage id='product_price' />
                        </TableCell>
                        <TableCell width={150}>
                            <FormattedMessage id='product_category' />
                        </TableCell>
                        <TableCell width={100}>
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
                                            {value?.price}
                                        </TableCell>
                                        <TableCell>
                                            {value?.category?.name}
                                        </TableCell>
                                        <TableCell className={classes.action}>
                                            <button className={classes.buttonEdit}>
                                                <MdOutlineEdit />
                                            </button>
                                            <button className={classes.buttonDel}>
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
        </div>
    )
}

Product.propTypes = {
    product: PropTypes.array,
    category: PropTypes.array
};

const mapStateToProps = createStructuredSelector({
    product: selectProduct,
    category: selectCategory
})

export default connect(mapStateToProps)(Product);