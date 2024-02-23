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
    console.log(currentStep)

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const onSubmit = (data) => {
        const encryptData = {
            email: encryptPayload(data.email),
            password: encryptPayload(data.password)
        }
        console.log(data)
    };

    const renderedComponent = () => {
        switch (key) {
            case value:

                break;

            default:
                break;
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
                <div className={classes.login}>
                    <span>
                        <FormattedMessage id='register' />
                    </span>
                    <div className={classes.inputContainer}>
                        <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
                            <div className={classes.emailPass}>

                            </div>

                            <Button type='submit' variant='contained'>
                                <FormattedMessage id="register" />
                            </Button>
                        </form>
                        <Button>
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