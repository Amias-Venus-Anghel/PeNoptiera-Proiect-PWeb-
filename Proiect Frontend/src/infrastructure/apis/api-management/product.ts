import { useAppSelector } from "@application/store";
import { ApiProductGetPageGetRequest, ProductAddDTO, ProductUpdateDTO, ProductApi} from "../client";
import { getAuthenticationConfiguration } from "@infrastructure/utils/userUtils";

/**
 * Use constants to identify mutations and queries.
 */
const getProductsQueryKey = "getProductssQuery";
const getProductQueryKey = "getProductQuery";
const addProductMutationKey = "addProductMutation";
const updateProductMutationKey = "updateProductMutation";
const deleteProductMutationKey = "deleteProductMutation";
const getProductsOfUserQueryKey = "getProductsOfUserQueryKey";

/**
 * Returns the an object with the callbacks that can be used for the React Query API, in this case to manage the user API.
 */
export const useProductApi = () => {
    const { token } = useAppSelector(x => x.profileReducer); // You can use the data form the Redux storage. 
    const config = getAuthenticationConfiguration(token); // Use the token to configure the authentication header.

    const getProducts = (page: ApiProductGetPageGetRequest) => new ProductApi(config).apiProductGetPageGet(page); // Use the generated client code and adapt it.
    const getProductsOfUser = (page: ApiProductGetPageGetRequest, userId: string) => {
        // Combine page parameters and userId into one request object
        const requestParams = { ...page, userId };
        return new ProductApi(config).apiProductGetProductsOfUserGet(requestParams);
    };
    const getProduct = (id: string) => new ProductApi(config).apiProductGetByIdIdGet({ id });
    const addProduct = (product: ProductAddDTO) => new ProductApi(config).apiProductAddPost({ productAddDTO: product });
    const updateProduct = (product: ProductUpdateDTO) => new ProductApi(config).apiProductUpdatePut({productUpdateDTO: product});
    const deleteProduct = (id: string) => new ProductApi(config).apiProductDeleteIdDelete({ id });
    
    return {
        getProducts: { // Return the query object.
            key: getProductsQueryKey, // Add the key to identify the query.
            query: getProducts // Add the query callback.
        },
        getProductsOfUser: { // Return the query object.
            key: getProductsOfUserQueryKey, // Add the key to identify the query.
            query: getProductsOfUser // Add the query callback.
        },
        getProduct: {
            key: getProductQueryKey,
            query: getProduct
        },
        addProduct: { // Return the mutation object.
            key: addProductMutationKey, // Add the key to identify the mutation.
            mutation: addProduct // Add the mutation callback.
        },
        updateProduct: {
            key: updateProductMutationKey,
            mutation: updateProduct
        },
        deleteProduct: {
            key: deleteProductMutationKey,
            mutation: deleteProduct
        }
    }
}