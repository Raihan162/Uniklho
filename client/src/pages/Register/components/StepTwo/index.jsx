

const StepTwo = () => {
    return (
        <div>
            <div>
                <TextField
                    {...register('address', { required: true })}
                    aria-invalid={errors.address ? "true" : "false"}
                    id='address'
                    label={<FormattedMessage id="address" />}
                    variant="outlined"
                    sx={{ width: '100%' }}
                />
                {errors.address?.type === "required" && (
                    <p role="alert" className={classes.errorMess}>
                        <FormattedMessage id='err_address_required' />
                    </p>
                )}
            </div>
            <div>
                <TextField
                    {...register('subdistrict', { required: true })}
                    aria-invalid={errors.subdistrict ? "true" : "false"}
                    id='subdistrict'
                    label={<FormattedMessage id="subdistrict" />}
                    variant="outlined"
                    sx={{ width: '100%' }}
                />
                {errors.subdistrict?.type === "required" && (
                    <p role="alert" className={classes.errorMess}>
                        <FormattedMessage id='err_subdistrict_required' />
                    </p>
                )}
            </div>
            <div>
                <TextField
                    {...register('city', { required: true })}
                    aria-invalid={errors.city ? "true" : "false"}
                    id='city'
                    label={<FormattedMessage id="city" />}
                    variant="outlined"
                    sx={{ width: '100%' }}
                />
                {errors.city?.type === "required" && (
                    <p role="alert" className={classes.errorMess}>
                        <FormattedMessage id='err_city_required' />
                    </p>
                )}
            </div>
            <div>
                <TextField
                    {...register('province', { required: true })}
                    aria-invalid={errors.province ? "true" : "false"}
                    id='province'
                    label={<FormattedMessage id="province" />}
                    variant="outlined"
                    sx={{ width: '100%' }}
                />
                {errors.province?.type === "required" && (
                    <p role="alert" className={classes.errorMess}>
                        <FormattedMessage id='err_province_required' />
                    </p>
                )}
            </div>
        </div>
    )
}

export default StepTwo