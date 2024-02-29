import { connect, useDispatch, useSelector } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Box, Button, Divider, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
// import MyInfo from "./components/MyInfo";
import { getDataCity, getDataProvince, getDataService, setDataInformation, setPayment, setTransaction } from "./action";
import { selectCity, selectProvince, selectService } from "./selector";
import PropTypes from 'prop-types'

import classes from './style.module.scss';
import { selectCart } from "@pages/Cart/selector";
import encryptPayload from "@utils/encryption";
import { getDataCart } from "@pages/Cart/action";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Checkout = ({ province, city, serviceCourier, cart }) => {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [service, setService] = useState({
        city_id:'',
        courier: '',
        cost: []
    });
    const [information, setInformation] = useState({
        name: '',
        contact: '',
        address: '',
        province: '',
        city: '',
        courier: '',
        service: '',
        cost: 0,
        cart: JSON.stringify(cart)
    });

    const getSubTotalCart = () => {
        let totPrice = 0
        cart?.forEach((value) => {
            totPrice += value?.qty * value?.product?.price
        })
        return totPrice;
    };

    const priceAll = () => {
        let price = 0
        price += getSubTotalCart();
        price += parseInt(information?.cost);
        return price
    };

    const handleGetCity = (event) => {
        const id = event.target.value?.split(',')[0];
        const name = event.target.value?.split(',')[1];
        setInformation((information) => ({...information, province: name}))
        dispatch(getDataCity(id));
    };

    const handleGetService = (event) => {
        const valueService = event.target.value;
        setService((service) => ({
            ...service,
            cost: serviceCourier? serviceCourier : []
        }));
        setInformation((information) => ({
            ...information,
            courier: valueService
        }));
        dispatch(getDataService(service.city_id, valueService));
    }

    const onSubmit = () => {
        const name = encryptPayload(information?.name);
        const contact = encryptPayload(information?.contact);
        const address = encryptPayload(information?.address);
        const province = encryptPayload(information?.province);
        const city = encryptPayload(information?.city);
        const courier = encryptPayload(information?.courier);
        const service = encryptPayload(information?.service);
        const cost = encryptPayload(information?.cost);
        const cart = encryptPayload(information?.cart);
        dispatch(setTransaction({ name, contact, address, province,  city, courier, service, cost, cart}, ({token,transID}) => {
            window.snap.pay(token, {
                onSuccess: function(result){
                    toast.success('Transaction success')
                  dispatch(setPayment({gross_amount: result?.gross_amount, payment_type: result?.payment_type, transaction_status: result?.transaction_status, transaction_id: transID}, () => {
                    setInformation({
                        name: '',
                        contact: '',
                        address: '',
                        province: '',
                        city: '',
                        courier: '',
                        service: '',
                        cost: 0,
                        cart: []
                    })
                    dispatch(getDataCart())
                    navigate('/')
                  }))
                },
                onPending: function(result){
                    toast("Waiting for payment", {
                        icon: "⏱"
                    })
                  dispatch(setPayment({gross_amount: result?.gross_amount, payment_type: result?.payment_type, transaction_status: result?.transaction_status, transaction_id: transID}, () => {
                    setInformation({
                        name: '',
                        contact: '',
                        address: '',
                        province: '',
                        city: '',
                        courier: '',
                        service: '',
                        cost: 0,
                        cart: []
                    })
                    dispatch(getDataCart())
                    navigate('/')
                  }))
                },
                onError: function(result){
                },
                onClose: function(){
                    toast.error('Transaction failed')
                }
            });
        }));
    }

    useEffect(()=>{
        dispatch(getDataProvince());
    },[])

    return(
        <div className={classes.container}>
            <h3>
                <FormattedMessage id="checkout"/>
            </h3>
            <div className={classes.contentContainer}>
                <Box sx={{width:'70%'}}>
                    <TextField defaultValue={information?.name} onChange={(e)=>setInformation((information) => ({...information, name: e.target.value}))} required sx={{ width:'44%', m: 1 }} label={<FormattedMessage id="name"/>} variant="outlined" />
                    <TextField defaultValue={information?.contact} onChange={(e)=>setInformation((information) => ({...information, contact: e.target.value}))} required sx={{ width:'44%', m: 1 }} label={<FormattedMessage id="contact"/>} variant="outlined" />
                    <TextField defaultValue={information?.address} onChange={(e)=>setInformation((information) => ({...information, address: e.target.value}))} required sx={{ width:'90%', m: 1 }} label={<FormattedMessage id="address"/>} variant="outlined" />
                    <FormControl sx={{ minWidth: '90%', m: 1 }}>
                        <InputLabel id="province"><FormattedMessage id="province"/></InputLabel>
                            <Select
                                required 
                                labelId="province"
                                label="province"
                                defaultValue={""}
                                onChange={(e) => {handleGetCity(e)}}
                            >
                                <MenuItem value="" disabled>
                                    <em><FormattedMessage id="province"/></em>
                                </MenuItem>
                                {
                                    province?.map((value, index) => {
                                        return (
                                            <MenuItem key={index} value={`${value?.province_id},${value?.province}`}>{value?.province}</MenuItem>
                                        )
                                    })
                                }
                            </Select>
                    </FormControl>
                    <FormControl sx={{ minWidth: '90%', m: 1 }}>
                        <InputLabel id="city"><FormattedMessage id="city"/></InputLabel>
                            <Select
                                required
                                labelId="city"
                                label="city"
                                defaultValue={""}
                                onChange={(e)=>{setService((service) => ({...service, city_id: e.target.value?.split(',')[0]})); setInformation((information) => ({...information, city: e.target.value?.split(',')[1]}))}}
                            >
                                <MenuItem value="" disabled>
                                    <em><FormattedMessage id="city"/></em>
                                </MenuItem>
                                {
                                    city?.map((value, index) => {
                                        return (
                                            <MenuItem key={index} value={`${value?.city_id},${value?.city_name}`}>{value?.city_name}</MenuItem>
                                        )
                                    })
                                }
                            </Select>
                    </FormControl>
                    <FormControl sx={{ minWidth: '90%', m: 1 }}>
                        <InputLabel id="courier"><FormattedMessage id="courier"/></InputLabel>
                            <Select
                                required
                                labelId="courier"
                                label="courier"
                                defaultValue={""}
                                onChange={handleGetService}
                            >
                                <MenuItem value="" disabled>
                                    <em><FormattedMessage id="choose_courier"/></em>
                                </MenuItem>
                                <MenuItem value={'jne'}>JNE</MenuItem>
                                <MenuItem value={'tiki'}>TIKI</MenuItem>
                                <MenuItem value={'pos'}>POS</MenuItem>
                            </Select>
                    </FormControl>
                    {
                        service?.cost?.length === 0 ?
                        null
                        :
                        <FormControl sx={{ minWidth: '90%', m: 1 }}>
                            <InputLabel id="service"><FormattedMessage id="service"/></InputLabel>
                                <Select
                                    required
                                    labelId="service"
                                    label="service"
                                    defaultValue={""}
                                    onChange={(e) => {setInformation((information) => ({...information, service: e.target.value?.split(',')[0], cost: e.target.value?.split(',')[1]}))}}
                                >
                                    <MenuItem value="" disabled>
                                        <em><FormattedMessage id="service"/></em>
                                    </MenuItem>
                                    {
                                        service?.cost?.map((value,index) => {
                                            return (
                                                <MenuItem key={index} value={`${value?.service},${value?.cost[0]?.value}`}>{value?.service} ({value?.cost[0]?.etd} Day)</MenuItem>
                                            )
                                        })
                                    }
                                </Select>
                        </FormControl>
                    }
                </Box> 
                <div className={classes.boxRight}>
                    <Box sx={{border:'1px solid black', padding:'10px', height:'min-content'}}>
                        <div className={classes.subtotal}>
                            <p className={classes.label}>Subtotal</p>
                            <p>Rp {getSubTotalCart().toLocaleString()}</p>
                        </div>
                        <div className={classes.ongkir}>
                            <p className={classes.label}>Ongkir</p>
                            <p>Rp {information?.cost?.toLocaleString()}</p>
                        </div>
                        <div className={classes.total}> 
                            <p className={classes.label}>Total</p>
                            <p>Rp {priceAll().toLocaleString()}</p>
                        </div>
                    </Box> 
                    <Button variant="contained"  onClick={onSubmit} sx={{width:'100%', marginTop:'30px'}}>
                        SUBMIT
                    </Button>
                </div>  
            </div>
            <Toaster />
        </div>
    )
}

Checkout.proptypes={
    province: PropTypes.array,
    city: PropTypes.array,
    serviceCourier: PropTypes.array,
    cart: PropTypes.array
};

const mapStateToProps = createStructuredSelector({
    province: selectProvince,
    city: selectCity,
    serviceCourier: selectService,
    cart: selectCart
});

export default connect(mapStateToProps)(Checkout);