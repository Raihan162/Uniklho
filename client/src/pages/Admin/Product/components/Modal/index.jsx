import Modal from '@mui/material/Modal';
import { Box, Button, Divider, Input, InputAdornment, MenuItem, OutlinedInput, Select, Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { useState } from 'react';

import defaultImage from '../../../../../../assets/image.png';

import classes from './style.module.scss';
import { useDispatch } from 'react-redux';
import { addProductAction, getProduct } from '../../action';
import encryptPayload from '@utils/encryption';

const ModalProduct = ({ open, handleModal, category }) => {

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    const dispatch = useDispatch();
    const [product, setProduct] = useState({
        name: '',
        description: '',
        stock: '',
        price: '',
        category: '-',
        image: null
    });

    const handleNameChange = (event) => {
        setProduct({ ...product, name: event.target.value })
    };

    const handleDescriptionChange = (event) => {
        setProduct({ ...product, description: event.target.value })
    }

    const handlePcsChange = (event) => {
        const numericValue = event.target.value.replace(/[^0-9]/g, '');
        const parsedValue = parseFloat(numericValue);

        if (!isNaN(parsedValue)) {
            setProduct({
                ...product, stock: parsedValue
            });
        } else {
            setProduct({ ...product, stock: '' });
        }
    }

    const handleAmountChange = (event) => {
        const numericValue = event.target.value.replace(/[^0-9]/g, '');

        const parsedValue = parseFloat(numericValue);

        if (!isNaN(parsedValue)) {
            setProduct({
                ...product, price: parsedValue
            });
        } else {
            setProduct({ ...product, price: '' });
        }
    };

    const handleCategoryChange = (event) => {
        setProduct({ ...product, category: event.target.value })
    };

    let onImageValidation = (e) => {
        setProduct({ ...product, image: e.target.files[0] });
    };

    const addProduct = () => {
        const dataObj = {
            name: product.name,
            description: product.description,
            stock: JSON.parse(product.stock),
            price: product.price,
            category_id: JSON.parse(product.category)
        };

        const formData = new FormData();
        formData.append("image_url", product.image);
        formData.append("data", encryptPayload(JSON.stringify(dataObj)));

        dispatch(addProductAction(formData, () => {
            handleModal
            dispatch(getProduct())
        }))
    }

    return (
        <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box className={classes.bgModal}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    <FormattedMessage id="add_product" />
                </Typography>
                <hr />
                <div className={classes.imageContainer}>
                    <img className={classes.imageProduct} src={defaultImage} alt="Image" />
                    <input
                        onChange={onImageValidation}
                        type='file' accept="image/*" />
                    {/* <Button className={classes.buttonAddImage}>
                        <FormattedMessage id="add_image" />
                    </Button> */}
                </div>
                <table className={classes.containerInput}>
                    <tr>
                        <th>
                            <FormattedMessage id='product_name' />
                        </th>
                        <th>:</th>
                        <td>
                            <OutlinedInput
                                onChange={handleNameChange}
                                className={classes.inputName}
                                placeholder='ex: T-Shirt ABC'
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>
                            <FormattedMessage id='product_description' />
                        </th>
                        <th>:</th>
                        <td>
                            <OutlinedInput
                                onChange={handleDescriptionChange}
                                className={classes.inputName}
                                placeholder='ex: This product made by cotton.'
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>
                            <FormattedMessage id='product_stock' />
                        </th>
                        <th>:</th>
                        <td>
                            <OutlinedInput
                                type='text'
                                value={product.stock}
                                onChange={handlePcsChange}
                                endAdornment={<InputAdornment position="end">pcs</InputAdornment>}
                                className={classes.inputPcs}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>
                            <FormattedMessage id='product_price' />
                        </th>
                        <th>:</th>
                        <td>
                            <OutlinedInput
                                type='text'
                                value={product.price.toLocaleString()}
                                onChange={handleAmountChange}
                                startAdornment={<InputAdornment position="start">Rp</InputAdornment>}
                                className={classes.inputName}
                            />
                            {/* <input className={classes.inputName} type="text" name='product_price' placeholder='ex: 300000' /> */}
                        </td>
                    </tr>
                    <tr>
                        <th>
                            <FormattedMessage id='product_category' />
                        </th>
                        <th>:</th>
                        <td>
                            <Select
                                value={product.category}
                                onChange={handleCategoryChange}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                                name="product_category"
                                id="product_category"
                                className={classes.inputName}
                                MenuProps={MenuProps}
                            >
                                <MenuItem disabled value="">
                                    <em>
                                        <FormattedMessage id='select_category' />
                                    </em>
                                </MenuItem>
                                {
                                    category?.map((value, index) => {
                                        return (
                                            <MenuItem value={value?.id} key={index}>
                                                {value?.name}
                                            </MenuItem>
                                        )
                                    })
                                }
                            </Select>
                        </td>
                    </tr>
                </table>
                <div className={classes.containerButton}>
                    <Button onClick={handleModal} color='error' variant='outlined'>
                        <FormattedMessage id="cancel" />
                    </Button>
                    <Button onClick={addProduct} color='success' variant='contained'>
                        <FormattedMessage id="add" />
                    </Button>
                </div>
            </Box>
        </Modal>
    )
}

export default ModalProduct