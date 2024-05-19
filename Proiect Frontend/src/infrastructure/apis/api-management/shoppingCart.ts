import { useAppSelector } from "@application/store";
import { ApiProductGetPageGetRequest, ProductAddDTO, ProductUpdateDTO, ProductApi, ShoppingCartApi} from "../client";
import { getAuthenticationConfiguration } from "@infrastructure/utils/userUtils";

/**
 * Use constants to identify mutations and queries.
 */

const getShoppingCartQueryKey = "getShoppingCartQuery";
const getProductsQueryKey = "getProductCartQuery";
const addProductMutationKey = "addProductShoppingCartMutation";
const deleteProductMutationKey = "deleteProductShoppingCartMutation";

/**
 * Returns the an object with the callbacks that can be used for the React Query API, in this case to manage the user API.
 */
export const useShoppingCartApi = () => {
    const { token } = useAppSelector(x => x.profileReducer); // You can use the data form the Redux storage. 
    const config = getAuthenticationConfiguration(token); // Use the token to configure the authentication header.

    const getShoppingCartOfUser = () => new ShoppingCartApi(config).apiShoppingCartGetCartOfCurrentUserGet();
    const getProducts = (page: ApiProductGetPageGetRequest) => new ShoppingCartApi(config).apiShoppingCartGetProductsInCartOfUserGet(page);
    const addProduct = (productId: string) => new ShoppingCartApi(config).apiShoppingCartAddProductToCartProductIdPost({ productId });
    const deleteProduct = (productId: string) => new ShoppingCartApi(config).apiShoppingCartRemoveProductFromCartProductIdDelete({ productId });
    
    return {
        getShoppingCartOfUser: { // Return the query object.
            key: getShoppingCartQueryKey, // Add the key to identify the query.
            query: getShoppingCartOfUser // Add the query callback.
        },
        getProducts: { // Return the query object.
            key: getProductsQueryKey, // Add the key to identify the query.
            query: getProducts // Add the query callback.
        },
        addProduct: { // Return the mutation object.
            key: addProductMutationKey, // Add the key to identify the mutation.
            mutation: addProduct // Add the mutation callback.
        },
        deleteProduct: {
            key: deleteProductMutationKey,
            mutation: deleteProduct
        }
    }
}