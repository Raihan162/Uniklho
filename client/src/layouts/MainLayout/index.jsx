import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectLocale, selectTheme } from '@containers/App/selectors';

import Navbar from '@components/Navbar';
import { selectLogin, selectToken } from '@containers/Client/selectors';

const MainLayout = ({ children, locale, theme, intl: { formatMessage }, login, token }) => (
  <div>
    <Navbar title={"UrbanCrazeStyle"} locale={locale} theme={theme} login={login} token={token} />
    {children}
  </div>
);

const mapStateToProps = createStructuredSelector({
  locale: selectLocale,
  theme: selectTheme,
  login: selectLogin,
  token: selectToken
});

MainLayout.propTypes = {
  children: PropTypes.element.isRequired,
  locale: PropTypes.string,
  theme: PropTypes.string,
  intl: PropTypes.object,
  login: PropTypes.bool,
  token: PropTypes.object
};

export default injectIntl(connect(mapStateToProps)(MainLayout));
