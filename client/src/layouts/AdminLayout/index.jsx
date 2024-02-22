import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Button } from '@mui/material';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { RxDashboard } from "react-icons/rx";
import { BsBoxes } from "react-icons/bs";
import { BiCategory } from "react-icons/bi";
import { GrTransaction } from "react-icons/gr";
import { PiUsersThree } from "react-icons/pi";
import { TbLogout2 } from "react-icons/tb";

import { selectLocale, selectTheme } from '@containers/App/selectors';

import classes from './style.module.scss'
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const AdminLayout = ({ children, locale, theme, intl: { formatMessage } }) => {

    const navigate = useNavigate();
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    const handleToDashboard = () => {
        navigate('/admin/dashboard');
    };

    const handleToProduct = () => {
        navigate('/admin/product');
    };

    const handleToCategory = () => {
        navigate('/admin/category');
    };

    const handleToTransaction = () => {
        navigate('/admin/transaction');
    };

    const handleToUser = () => {
        navigate('/admin/user');
    };

    const handleToLogout = () => {

    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="absolute" open={open}>
                    <Toolbar
                        sx={{
                            pr: '24px', // keep right padding when drawer closed
                        }}
                    >
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{
                                marginRight: '36px',
                                ...(open && { display: 'none' }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{ flexGrow: 1 }}
                        >
                            <FormattedMessage id='dashboard' />
                        </Typography>
                        <IconButton color="inherit">
                            <Badge badgeContent={4} color="secondary">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open}>
                    <Toolbar
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            px: [1],
                        }}
                    >
                        <IconButton onClick={toggleDrawer}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </Toolbar>
                    <Divider />
                    <div className={classes.buttonContainer}>
                        <Button onClick={handleToDashboard}>
                            <RxDashboard fontSize={24} />
                            <p className={classes.navTitle}>
                                {
                                    open ?
                                        <FormattedMessage id='dashboard' />
                                        :
                                        null
                                }
                            </p>
                        </Button>
                        <Button onClick={handleToProduct}>
                            <BsBoxes fontSize={24} />
                            <p className={classes.navTitle}>
                                {
                                    open ?
                                        <FormattedMessage id='product' />
                                        :
                                        null
                                }
                            </p>
                        </Button>
                        <Button onClick={handleToCategory}>
                            <BiCategory fontSize={24} />
                            <p className={classes.navTitle}>
                                {
                                    open ?
                                        <FormattedMessage id='category' />
                                        :
                                        null
                                }
                            </p>
                        </Button>
                        <Button onClick={handleToTransaction}>
                            <GrTransaction fontSize={24} />
                            <p className={classes.navTitle}>
                                {
                                    open ?
                                        <FormattedMessage id='transaction' />
                                        :
                                        null
                                }
                            </p>
                        </Button>
                        <Button onClick={handleToUser}>
                            <PiUsersThree fontSize={24} />
                            <p className={classes.navTitle}>
                                {
                                    open ?
                                        <FormattedMessage id='user' />
                                        :
                                        null
                                }
                            </p>
                        </Button>
                        <Button onClick={handleToLogout}>
                            <TbLogout2 fontSize={24} />
                            <p className={classes.navTitle}>
                                {
                                    open ?
                                        <FormattedMessage id='logout' />
                                        :
                                        null
                                }
                            </p>
                        </Button>
                    </div>
                </Drawer>
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <Toolbar />
                    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
                        {children}
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
};

const mapStateToProps = createStructuredSelector({
    locale: selectLocale,
    theme: selectTheme,
});

AdminLayout.propTypes = {
    children: PropTypes.element.isRequired,
    locale: PropTypes.string,
    theme: PropTypes.string,
    intl: PropTypes.object,
};

export default injectIntl(connect(mapStateToProps)(AdminLayout));