import { FormattedMessage } from 'react-intl';
import { Accordion, AccordionDetails, AccordionSummary, Button, Chip, Divider, Table, TableCell, TableRow } from '@mui/material';
import { createStructuredSelector } from 'reselect';
import { selectTransaction } from './selector';
import { connect, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getTransaction } from './action';
import PropTypes from 'prop-types';
import { setPayment } from '@pages/Checkout/action';
import { getDataCart } from '@pages/Cart/action';
import { useNavigate } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { IoReceiptOutline } from "react-icons/io5";

import classes from './style.module.scss';

const MyOrder = ({transaction}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handlePayButton = (index) => {
        window.snap.pay(transaction[index]?.token_midtrans, {
            onSuccess: function(result){
              dispatch(setPayment({gross_amount: result?.gross_amount, payment_type: result?.payment_type, transaction_status: result?.transaction_status, transaction_id: transaction[index]?.id}, () => {
                dispatch(getDataCart())
                navigate('/')
              }))
            },
            onPending: function(result){
              dispatch(setPayment({gross_amount: result?.gross_amount, payment_type: result?.payment_type, transaction_status: result?.transaction_status, transaction_id: transaction[index]?.id}, () => {
                dispatch(getDataCart())
                navigate('/')
              }))
            },
            onError: function(result){
            },
            onClose: function(){
            }
        })
    }

    useEffect(()=>{
        dispatch(getTransaction())
        // console.log(transaction)
    },[]);

    return(
        <div className={classes.container}>
            <h2>
                <FormattedMessage id='my_order'/>
            </h2>
            <div className={classes.containerCard}>
                {
                    transaction?.length !== 0 ?
                        transaction?.map((value,index) => {
                            return(
                                <div key={index} className={classes.card}>
                                    <div className={classes.top}>
                                        <p>{value?.id}</p>
                                        <p><Chip label={value?.status?.name} color={value?.status_id === 1 ? "warning" : value?.status_id === 1 ? "error" : "success"} /></p>
                                    </div>
                                    <Divider />
                                    <div>
                                        <Table>
                                            <TableRow>
                                                <TableCell width={150}>
                                                    <FormattedMessage id="receiver_name" />
                                                </TableCell>
                                                <TableCell>
                                                    :
                                                </TableCell>
                                                <TableCell>
                                                    {value?.receiver_name}
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell width={150}>
                                                    <FormattedMessage id="receiver_contact" />
                                                </TableCell>
                                                <TableCell>
                                                    :
                                                </TableCell>
                                                <TableCell>
                                                    {value?.receiver_contact}
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell width={150}>
                                                    <FormattedMessage id="receiver_address" />
                                                </TableCell>
                                                <TableCell>
                                                    :
                                                </TableCell>
                                                <TableCell>
                                                    {value?.receiver_address}
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell width={150}>
                                                    <FormattedMessage id="courier" />
                                                </TableCell>
                                                <TableCell>
                                                    :
                                                </TableCell>
                                                <TableCell>
                                                    {value?.courier}
                                                </TableCell>
                                            </TableRow>
                                        </Table>
                                        {
                                            value?.status_id === 1 ?
                                                <Button onClick={()=>handlePayButton(index)} variant='contained'>
                                                    Pay
                                                </Button>
                                                :
                                                null
                                        }
                                    </div>
                                    <Accordion className={classes.accordion}>
                                        <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1-content"
                                        id="panel1-header"
                                        >
                                            More detail
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            {
                                                value?.transaction_details?.map((val,idx) => {
                                                    return(
                                                        <div className={classes.detailCard}>
                                                            <img className={classes.imageDetail} src={val?.product?.image_url} alt="Image Product" />
                                                            <p className={classes.qtyDetail}>x{val?.qty}</p>
                                                            <p className={classes.nameDetail}>{val?.product?.name}</p>
                                                            <p className={classes.priceDetail}>
                                                                Rp {val?.product?.price?.toLocaleString()}
                                                            </p>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </AccordionDetails>
                                    </Accordion>
                                </div>
                            )
                        })
                        :
                        <div className={classes.emptyTransaction}>
                            <IoReceiptOutline fontSize={96}/>
                            <h2>
                                <FormattedMessage id="empty_transaction" />
                            </h2>
                        </div>
                }
            </div>
        </div>
    )
}

MyOrder.propTypes = {
    transaction: PropTypes.array
};

const mapStateToProps = createStructuredSelector({
    transaction: selectTransaction
})

export default connect(mapStateToProps)(MyOrder);