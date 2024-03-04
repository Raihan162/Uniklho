import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { selectProfile } from './selector';
import { connect, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getProfile, setProfile, updateImage, updateProfile } from './action';
import { Toaster } from 'react-hot-toast';
import { styled } from '@mui/material/styles';
import { CloudUpload } from '@mui/icons-material';

import defaultImg from '../../../assets/defaultImage.jpg';

import classes from './style.module.scss';

const Profile = ({ profile }) => {

    const dispatch = useDispatch();

    const [profileUser, setProfileUser] = useState(profile);


    const handleEditProfile = () => {
        dispatch(updateProfile(profileUser, () => {
            dispatch(getProfile())
        }))
    }

    useEffect(() => {
        dispatch(getProfile())
    }, []);

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
      });

      const onHandlerImage = (e) => {
        setProfileUser({...profileUser, photo_profile: e.target.files[0]});
        const formData = new FormData();
        formData.append("imageUrl", e.target.files[0])

        dispatch(updateImage(formData, () => {
            dispatch(getProfile())
        }))
    }

    return (
        <div className={classes.container}>
            <div className={classes.content}>
                <div className={classes.imageContainer}>
                    <img className={classes.profilePicture} src={profile?.photo_profile ? profile?.photo_profile : defaultImg} alt="Profile Picture" />
                    <Button onChange={onHandlerImage} className={classes.buttonUpload} component="label" startIcon={<CloudUpload />}>
                        Upload file
                        <VisuallyHiddenInput type="file" accept="image/png, image/jpeg" />
                    </Button>
                </div>
                <div className={classes.infoContainer}>
                    <TextField value={profileUser?.name} onChange={(e) => setProfileUser({...profileUser, name: e.target.value})} label={<FormattedMessage id="name"/>}/>
                    <TextField value={profileUser?.email} onChange={(e) => setProfileUser({...profileUser, email: e.target.value})} disabled label={<FormattedMessage id="email"/>}/>
                    <TextField value={profileUser?.contact} onChange={(e) => setProfileUser({...profileUser, contact: e.target.value})} label={<FormattedMessage id="contact"/>}/>
                    <TextField value={profileUser?.address} onChange={(e) => setProfileUser({...profileUser, address: e.target.value})} label={<FormattedMessage id="address"/>} multiline/>
                    <TextField  value={profileUser?.province} onChange={(e) => setProfileUser({...profileUser, province: e.target.value})} label={<FormattedMessage id="province"/>}/>
                    <TextField value={profileUser?.city} onChange={(e) => setProfileUser({...profileUser, city: e.target.value})} label={<FormattedMessage id="city"/>}/>
                    <Button onClick={handleEditProfile} variant='contained'>
                        <FormattedMessage id="submit" />
                    </Button>
                </div>
            </div>
            <Toaster />
        </div>
    )
};

Profile.proptypes = {
    profile: PropTypes.object
};

const mapStateToProps = createStructuredSelector({
    profile: selectProfile
})

export default connect(mapStateToProps)(Profile);