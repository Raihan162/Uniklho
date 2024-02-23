import PropTypes from 'prop-types';
import classNames from 'classnames';

import classes from './style.module.scss';
import { PulseLoader } from 'react-spinners';

const Loader = ({ isLoading }) => (
  <div
    data-testid="Loading"
    className={classNames({
      [classes.loaderComponent]: true,
      [classes.showLoader]: isLoading || false,
    })}
  >
    <PulseLoader color="#36d7b7" size={30} />
  </div>
);

Loader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};
export default Loader;
