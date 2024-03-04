import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import encryptPayload from '@utils/encryption';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { setLogin } from '@containers/Client/actions';
import PropTypes from 'prop-types';

import classes from './style.module.scss';
import { Toaster } from 'react-hot-toast';
// import { doLogin } from './action';
import { useNavigate } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { selectLogin } from '@containers/Client/selectors';
import StepOne from './components/StepOne';
import StepTwo from './components/StepTwo';
import { setRegister, setStep } from './action';

const Register = ({ login }) => {

    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {
        handleSubmit,
        register,
        formState: { errors }
    } = useForm();
    const currentStep = useSelector((state) => state.register.step);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const onSubmit = (data) => {
        const encryptData = {
            name: encryptPayload(data?.name),
            email: encryptPayload(data?.email),
            contact: encryptPayload(data?.contact),
            password: encryptPayload(data?.password),
            address: encryptPayload(data?.address),
            subdistrict: encryptPayload(data?.subdistrict),
            city: encryptPayload(data?.city),
            province: encryptPayload(data?.province)
        }
        dispatch(setRegister(encryptData, () => {
            dispatch(setStep(1));
            navigate('/login');
        }))
    };

    const renderedComponent = () => {
        switch (currentStep) {
            case 1:
                return <StepOne register={register} errors={errors} handleClickShowPassword={handleClickShowPassword}
                    showPassword={showPassword} />
            case 2:
                return <StepTwo register={register} errors={errors} />
            default:
                break;
        }
    };

    const handleToLogin = () => {
        navigate('/login');
        dispatch(setStep(1));
    };

    const handleStep = (data) => {
        if (data === '+') {
            dispatch(setStep(currentStep + 1))
        } else if (data === '-') {
            dispatch(setStep(currentStep - 1))
        }
    }

    useEffect(() => {
        if (login) {
            navigate('/')
        }
    }, [])

    return (
        <div className={classes.container}>
            <div className={classes.card}>
                <div className={classes.bg}>
                </div>
                <div className={classes.register}>
                    <span>
                        <FormattedMessage id='register' />
                    </span>
                    <div className={classes.inputContainer}>
                        <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
                            {
                                renderedComponent()
                            }

                            {
                                currentStep === 1 ?
                                    <Button onClick={() => handleStep('+')} variant='contained'>
                                        Next
                                    </Button>
                                    :
                                    <>
                                        <Button onClick={() => handleStep('-')}>
                                            Back
                                        </Button>
                                        <Button type='submit' variant='contained'>
                                            <FormattedMessage id="register" />
                                        </Button>
                                    </>
                            }
                        </form>
                        <Button onClick={handleToLogin}>
                            <FormattedMessage id="already_have_an_account" />
                        </Button>
                    </div>
                </div>
            </div>
            <Toaster />
        </div>
    )
}

Register.propTypes = {
    login: PropTypes.bool
};

const mapStateToProps = createStructuredSelector({
    login: selectLogin
})

export default connect(mapStateToProps)(Register);