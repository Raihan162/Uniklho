import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LightModeIcon from '@mui/icons-material/LightMode';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ReceiptIcon from '@mui/icons-material/Receipt';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { setLoading, setLocale, setTheme } from '@containers/App/actions';

import Logo from '../../../assets/cart.png'

import classes from './style.module.scss';
import { Badge, Button, Divider, IconButton, ListItemIcon } from '@mui/material';
import { jwtDecode } from 'jwt-decode';
import { setLogin, setToken } from '@containers/Client/actions';
import { getDataCart } from '@pages/Cart/action';
import { Logout, PersonAdd, Settings } from '@mui/icons-material';

const Navbar = ({ title, locale, theme, login, token, cart }) => {

  const [anchorEl, setAnchorEl] = useState(null);
  const openProfile = Boolean(anchorEl);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuPosition, setMenuPosition] = useState(null);
  const open = Boolean(menuPosition);
  let decodeToken

  if (token) {
    decodeToken = jwtDecode(token);
  };

  const handleClick = (event) => {
    setMenuPosition(event.currentTarget);
  };

  const handleClose = () => {
    setMenuPosition(null);
  };

  const handleTheme = () => {
    dispatch(setTheme(theme === 'light' ? 'dark' : 'light'));
  };

  const onSelectLang = (lang) => {
    if (lang !== locale) {
      dispatch(setLocale(lang));
    }
    handleClose();
  };

  const goHome = () => {
    navigate('/');
  };

  const goToCart = () => {
    navigate('/cart');
  };

  const goToLogin = () => {
    navigate('/login');
  };

  const goToRegister = () => {
    navigate('/register');
  };

  const goToProfile = () => {
    navigate('/profile');
  };

  const handleClickProfile = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseProfile = () => {
    setAnchorEl(null);
  };

  const handleMyOrder = () => {
    navigate('/my-order')
  };

  const handleWishlist = () => {
    navigate('/wishlist')
  }

  const handleToLogout = () => {
    dispatch(setLoading(true));
    setTimeout(() => {
      dispatch(setLoading(false))
      dispatch(setLogin(false));
      dispatch(setToken(null));
      navigate('/login');
    }, 500);
  };

  useEffect(() => {
    if(token){
      dispatch(getDataCart())
    }
  }, [])

  return (
    <div className={classes.headerWrapper} data-testid="navbar">
      <div className={classes.contentWrapper}>
        <div className={classes.logoImage} onClick={goHome}>
          <img src={Logo} alt="logo" className={classes.logo} />
          <div className={classes.title}>{title}</div>
        </div>
        <div className={classes.toolbar}>
          {/* <div className={classes.theme} onClick={handleTheme} data-testid="toggleTheme">
            {theme === 'light' ? <NightsStayIcon /> : <LightModeIcon />}
          </div> */}
          {
            token?
              <div onClick={goToCart} className={classes.buttonIcon}>
                  <Badge badgeContent={cart?.length} color='error'>
                    <ShoppingCartIcon />
                  </Badge>
                </div>
                :
              null
          }
          <div className={classes.toggle} onClick={handleClick}>
            <Avatar className={classes.avatar} src={locale === 'id' ? '/id.png' : '/en.png'} />
            <div className={classes.lang}>{locale}</div>
            <ExpandMoreIcon />
          </div>
          {
            location?.pathname === '/login' || location?.pathname === '/register' ?
              null
              :
              login ?
                // <button onClick={handleToLogout} className={classes.buttonAvatar}>
                //   <Avatar alt={decodeToken?.name} src={`${decodeToken?.photo_profile ? decodeToken?.photo_profile : "/static/images/avatar/1.jpg"}`} />
                // </button>
                <>
                  <IconButton
                    onClick={handleClickProfile}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={openProfile ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={openProfile ? 'true' : undefined}
                  >
                    <Avatar alt={decodeToken?.name} src={`${decodeToken?.photo_profile ? decodeToken?.photo_profile : "/static/images/avatar/1.jpg"}`} />
                  </IconButton>
                    <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={openProfile}
                    onClose={handleCloseProfile}
                    onClick={handleCloseProfile}
                    PaperProps={{
                      elevation: 0,
                      sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                          width: 32,
                          height: 32,
                          ml: -0.5,
                          mr: 1,
                        },
                        '&::before': {
                          content: '""',
                          display: 'block',
                          position: 'absolute',
                          top: 0,
                          right: 20,
                          width: 10,
                          height: 10,
                          bgcolor: 'background.paper',
                          transform: 'translateY(-50%) rotate(45deg)',
                          zIndex: 0,
                        },
                      },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                  >
                    <MenuItem onClick={goToProfile}>
                      <Avatar /> Profile
                    </MenuItem>
                    <MenuItem onClick={handleMyOrder}>
                      <ReceiptIcon color='disabled' /> Transaction
                    </MenuItem>
                    <MenuItem onClick={handleWishlist}>
                      <FavoriteIcon color='disabled' /> Wishlist
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={handleToLogout}>
                      <ListItemIcon>
                        <Logout fontSize="small" />
                      </ListItemIcon>
                      Logout
                    </MenuItem>
                  </Menu>
                </>
                :
                <>
                  <Button onClick={goToLogin}>
                    <FormattedMessage id='login' />
                  </Button>
                  <Button onClick={goToRegister} variant='contained'>
                    <FormattedMessage id='register' />
                  </Button>
                </>
          }
        </div>
        <Menu open={open} anchorEl={menuPosition} onClose={handleClose}>
          <MenuItem onClick={() => onSelectLang('id')} selected={locale === 'id'}>
            <div className={classes.menu}>
              <Avatar className={classes.menuAvatar} src="/id.png" />
              <div className={classes.menuLang}>
                <FormattedMessage id="app_lang_id" />
              </div>
            </div>
          </MenuItem>
          <MenuItem onClick={() => onSelectLang('en')} selected={locale === 'en'}>
            <div className={classes.menu}>
              <Avatar className={classes.menuAvatar} src="/en.png" />
              <div className={classes.menuLang}>
                <FormattedMessage id="app_lang_en" />
              </div>
            </div>
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string,
  locale: PropTypes.string.isRequired,
  theme: PropTypes.string,
};

export default Navbar;
