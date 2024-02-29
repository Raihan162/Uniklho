import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectLocale, selectTheme } from '@containers/App/selectors';

import Navbar from '@components/Navbar';
import { selectLogin, selectToken } from '@containers/Client/selectors';
import { selectCart } from '@pages/Cart/selector';

const MainLayout = ({ children, locale, theme, intl: { formatMessage }, login, token, cart }) => (
  <div>
    <Navbar title="UnikLho" locale={locale} theme={theme} login={login} token={token} cart={cart} />
    {children}
  </div>
);

const mapStateToProps = createStructuredSelector({
  locale: selectLocale,
  theme: selectTheme,
  login: selectLogin,
  token: selectToken,
  cart: selectCart
});

MainLayout.propTypes = {
  children: PropTypes.element.isRequired,
  locale: PropTypes.string,
  theme: PropTypes.string,
  intl: PropTypes.object,
  login: PropTypes.bool,
  token: PropTypes.string,
  cart: PropTypes.array
};

export default injectIntl(connect(mapStateToProps)(MainLayout));
