import PropTypes from 'prop-types';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LightModeIcon from '@mui/icons-material/LightMode';
import NightsStayIcon from '@mui/icons-material/NightsStay';

import { setLoading, setLocale, setTheme } from '@containers/App/actions';

import Logo from '../../../assets/cart.png'

import classes from './style.module.scss';
import { Button } from '@mui/material';
import { jwtDecode } from 'jwt-decode';
import { setLogin, setToken } from '@containers/Client/actions';

const Navbar = ({ title, locale, theme, login, token }) => {
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

  const goToLogin = () => {
    navigate('/login');
  };

  const goToRegister = () => {
    navigate('/register');
  };

  const handleToLogout = () => {
    dispatch(setLoading(true));
    setTimeout(() => {
      dispatch(setLoading(false))
      dispatch(setLogin(false));
      dispatch(setToken(null));
      navigate('/login');
    }, 500);
  };

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
          <div className={classes.toggle} onClick={handleClick}>
            <Avatar className={classes.avatar} src={locale === 'id' ? '/id.png' : '/en.png'} />
            <div className={classes.lang}>{locale}</div>
            <ExpandMoreIcon />
          </div>
          {
            location.pathname === '/login' || location?.pathname === '/register' ?
              null
              :
              login ?
                <button onClick={handleToLogout} className={classes.buttonAvatar}>
                  <Avatar alt={decodeToken?.name} src={`${decodeToken?.photo_profile ? decodeToken?.photo_profile : "/static/images/avatar/1.jpg"}`} />
                </button>
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
