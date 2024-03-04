import Modal from '@mui/material/Modal';
import { Box, Button, Divider, Input, InputAdornment, MenuItem, OutlinedInput, Select, Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { useState } from 'react';

// import defaultImage from '../../../../../../assets/image.png';

import classes from './style.module.scss';
import { useDispatch } from 'react-redux';
// import { addProductAction, getProduct } from '../../action';
// import encryptPayload from '@utils/encryption';
import { addCategoryAction, getCategory } from '../../action';

const ModalProduct = ({ open, handleModal, category, setOpen }) => {

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;

    const dispatch = useDispatch();
    const [name, setName] = useState('');

    const handleNameChange = (event) => {
        setName(event.target.value)
    };

    const addCategory = () => {
        dispatch(addCategoryAction(name, () => {
            setOpen(false)
            dispatch(getCategory())
        }))
    }

    return (
        <Modal
            className={classes.modal}
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box className={classes.bgModal}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    <FormattedMessage id="add_category" />
                </Typography>
                <hr />  
                <table className={classes.containerInput}>
                    <tr>
                        <th>
                            <FormattedMessage id='name' />
                        </th>
                        <th>:</th>
                        <td>
                            <OutlinedInput
                                onChange={handleNameChange}
                                className={classes.inputName}
                                placeholder='ex: T-Shirt'
                            />
                        </td>
                    </tr>
                </table>
                <div className={classes.containerButton}>
                    <Button onClick={handleModal} color='error' variant='outlined'>
                        <FormattedMessage id="cancel" />
                    </Button>
                    <Button onClick={addCategory} color='success' variant='contained'>
                        <FormattedMessage id="add" />
                    </Button>
                </div>
            </Box>
        </Modal>
    )
}

export default ModalProduct