import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectLogin, selectToken } from '@containers/Client/selectors';
import { jwtDecode } from 'jwt-decode';

const Client = ({ login, children, token }) => {
  const navigate = useNavigate();
  const decodeToken = jwtDecode(token)
  console.log(decodeToken)
  useEffect(() => {
    if (!login) {
      navigate('/login');
    }
  }, [login, navigate]);

  return children;
};

Client.propTypes = {
  login: PropTypes.bool,
  children: PropTypes.element,
  token: PropTypes.object
};

const mapStateToProps = createStructuredSelector({
  login: selectLogin,
  token: selectToken
});

export default connect(mapStateToProps)(Client);
