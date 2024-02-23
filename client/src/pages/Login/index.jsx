import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import encryptPayload from '@utils/encryption';
import { connect, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { setLogin } from '@containers/Client/actions';
import PropTypes from 'prop-types';

import classes from './style.module.scss';
import { Toaster } from 'react-hot-toast';
import { doLogin } from './action';
import { useNavigate } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { selectLogin } from '@containers/Client/selectors';

const Login = ({ login }) => {

    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {
        handleSubmit,
        register,
        formState: { errors }
    } = useForm();

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleToRegister = () => {
        navigate('/register');
    };

    const onSubmit = (data) => {
        const encryptData = {
            email: encryptPayload(data.email),
            password: encryptPayload(data.password)
        }
        dispatch(doLogin(encryptData, () => {
            navigate('/');
        }))
    };

    useEffect(() => {
        if (login) {
            navigate('/')
        }
    }, [])

    return (
        <div className={classes.container}>
            <div className={classes.card}>
                <div className={classes.login}>
                    <span>Masuk</span>
                    <div className={classes.inputContainer}>
                        <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
                            <div className={classes.emailPass}>
                                <div>
                                    <TextField
                                        {...register('email', { required: true })}
                                        aria-invalid={errors.email ? "true" : "false"}
                                        id='email'
                                        label={<FormattedMessage id="email" />}
                                        variant="outlined"
                                        sx={{ width: '100%' }}
                                    />
                                    {errors.email?.type === "required" && (
                                        <p role="alert" className={classes.errorMess}>
                                            <FormattedMessage id='err_email_required' />
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <FormControl variant="outlined"
                                        sx={{ width: '100%' }}>
                                        <InputLabel htmlFor="outlined-adornment-password">
                                            <FormattedMessage id="password" />
                                        </InputLabel>
                                        <OutlinedInput
                                            {...register("password", { required: true })}
                                            aria-invalid={errors.password ? "true" : "false"}
                                            id="outlined-adornment-password"
                                            type={showPassword ? 'text' : 'password'}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        edge="end"
                                                    >
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            label={<FormattedMessage id="password" />}
                                        />
                                    </FormControl>
                                    {errors.password?.type === "required" && (
                                        <p role="alert" className={classes.errorMess}>
                                            <FormattedMessage id='err_pass_required' />
                                        </p>
                                    )}
                                </div>
                            </div>

                            <Button type='submit' variant='contained'>
                                <FormattedMessage id="login" />
                            </Button>
                        </form>
                        <Button onClick={handleToRegister}>
                            <FormattedMessage id="dont_have_an_account" />
                        </Button>
                    </div>
                </div>
                <div className={classes.bg}>
                </div>
            </div>
            <Toaster />
        </div>
    )
}

Login.propTypes = {
    login: PropTypes.bool
};

const mapStateToProps = createStructuredSelector({
    login: selectLogin
})

export default connect(mapStateToProps)(Login);