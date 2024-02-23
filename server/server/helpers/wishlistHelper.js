
const addToWishlist = () => {
    try {

    } catch (error) {
        console.log([fileName, 'Add to Wishlist Product Helpers', 'ERROR'], { info: `${error}` });
        return Promise.reject(GeneralHelper.errorResponse(error));
    }
};

const deleteFromWishlist = async () => {
    try {

    } catch (error) {
        console.log([fileName, 'Delete Product From Wishlist Helpers', 'ERROR'], { info: `${error}` });
        return Promise.reject(GeneralHelper.errorResponse(error));
    }
};