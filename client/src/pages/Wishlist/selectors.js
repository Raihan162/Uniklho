import { createSelector } from "reselect";
import { initialState } from "./reducer"

const wishlistState = (state) => state.wishlist || initialState;

export const selectWishlist = createSelector(wishlistState, (state) => state.wishlist);

export const selectWishlistByProduct = createSelector(wishlistState, (state) => state.wishlistByProduct)