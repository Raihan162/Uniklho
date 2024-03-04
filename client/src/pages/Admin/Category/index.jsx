import { FormattedMessage } from 'react-intl';
import { Button, Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@mui/material';
import { MdOutlineEdit, MdDeleteOutline } from "react-icons/md";
import { connect, useDispatch } from 'react-redux';

import { useEffect, useState } from 'react';
import { getCategory } from './action';
import PropTypes from 'prop-types';

import classes from './style.module.scss';
import { createStructuredSelector } from 'reselect';
import { selectCategory } from './selector';
import Modal from './components/Modal';
import { selectToken } from '@containers/Client/selectors';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

const Category = ({ product, category, token }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const decodeToken = jwtDecode(token);

    const handleModal = () => {
        setOpen(!open)
    }

    const handleDeleteProduct = (id) => {
        // dispatch(deleteProduct(id, () => {
        //     dispatch(getProduct())
        // }))
    }

    useEffect(() => {
        dispatch(getCategory());
        if (decodeToken?.role !== 'Admin') {
            navigate('/')
        }
    }, []);

    return (
        <div className={classes.container}>
            <h2>
                <FormattedMessage id='category' />
            </h2>

            <div className={classes.containerInputAdd}>
                {/* <TextField className={classes.input} label={<FormattedMessage id='search_product' />} variant="outlined" /> */}
                <Button onClick={handleModal} variant='contained'>
                    <FormattedMessage id='add_category' />
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
                            <FormattedMessage id='name' />
                        </TableCell>
                        <TableCell width={200}>
                            <FormattedMessage id='action' />
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        category ?
                            category?.map((value, index) => {
                                return (
                                    <TableRow key={index}>
                                        <TableCell>
                                            {index + 1}
                                        </TableCell>
                                        <TableCell>
                                            {value?.name}
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

Category.propTypes = {
    category: PropTypes.array,
    token: PropTypes.object
};

const mapStateToProps = createStructuredSelector({
    category: selectCategory,
    token: selectToken,
})

export default connect(mapStateToProps)(Category);