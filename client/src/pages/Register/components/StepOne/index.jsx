import { Visibility, VisibilityOff } from "@mui/icons-material"
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material"
import { FormattedMessage } from "react-intl"

import classes from './style.module.scss';

const StepOne = ({ register, errors, handleClickShowPassword, showPassword }) => {
    return (
        <div className={classes.emailPass}>
            <div>
                <TextField
                    {...register('name', { required: true })}
                    aria-invalid={errors.email ? "true" : "false"}
                    id='name'
                    label={<FormattedMessage id="name" />}
                    variant="outlined"
                    sx={{ width: '100%' }}
                />
                {errors.name?.type === "required" && (
                    <p role="alert" className={classes.errorMess}>
                        <FormattedMessage id='err_name_required' />
                    </p>
                )}
            </div>
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
                <TextField
                    {...register('contact', { required: true, pattern: /[^0-9]/g, })}
                    aria-invalid={errors.email ? "true" : "false"}
                    id='contact'
                    label={<FormattedMessage id="contact" />}
                    variant="outlined"
                    sx={{ width: '100%' }}
                />
                {errors.contact?.type === "required" && (
                    <p role="alert" className={classes.errorMess}>
                        <FormattedMessage id='err_contact_required' />
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
    )
}

export default StepOne