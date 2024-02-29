import { combineReducers } from 'redux';

import appReducer, { storedKey as storedAppState } from '@containers/App/reducer';
import clientReducer, { storedKey as storedClientState } from '@containers/Client/reducer';
import productReducer, { storedKey as storedProductState } from '@pages/Admin/Product/reducer';
import registerReducer, { storedKey as storedRegisterState } from '@pages/Register/reducer';
import productDetailReducer, { storedKey as storedProductDetailState } from '@pages/ProductDetail/reducer';
import cartReducer, { storedKey as storedCartState } from '@pages/Cart/reducer';
import checkoutReducer, { storedKey as storedCheckoutState } from '@pages/Checkout/reducer';
import myorderReducer, {storedKey as storedMyOrderState } from '@pages/MyOrder/reducer';
import wishlistReducer, { storedKey as storedWishlistState} from '@pages/Wishlist/reducer';

import languageReducer from '@containers/Language/reducer';

import { mapWithPersistor } from './persistence';

const storedReducers = {
  app: { reducer: appReducer, whitelist: storedAppState },
  client: { reducer: clientReducer, whitelist: storedClientState },
  product: { reducer: productReducer, whitelist: storedProductState },
  register: { reducer: registerReducer, whitelist: storedRegisterState },
  productDetail: { reducer: productDetailReducer, whitelist: storedProductDetailState },
  cart: { reducer: cartReducer, whitelist: storedCartState },
  checkout: { reducer: checkoutReducer, whitelist: storedCheckoutState },
  myOrder: { reducer: myorderReducer, whitelist: storedMyOrderState },
  wishlist: { reducer: wishlistReducer, whitelist: storedWishlistState }
};

const temporaryReducers = {
  language: languageReducer,
};

const createReducer = () => {
  const coreReducer = combineReducers({
    ...mapWithPersistor(storedReducers),
    ...temporaryReducers,
  });
  const rootReducer = (state, action) => coreReducer(state, action);
  return rootReducer;
};

export default createReducer;
