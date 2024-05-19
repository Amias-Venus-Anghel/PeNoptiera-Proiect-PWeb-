import { useAppSelector } from "@application/store";
import { ApiOrderGetPageGetRequest, OrderAddDTO, OrderUpdateDTO, OrderApi} from "../client";
import { getAuthenticationConfiguration } from "@infrastructure/utils/userUtils";

/**
 * Use constants to identify mutations and queries.
 */
const getOrdersQueryKey = "getOrdersQuery";
const getOrderQueryKey = "getOrderQuery";
const placeOrderMutationKey = "addOrderMutation";
const updateOrderMutationKey = "updateOrderMutation";
const deleteOrderMutationKey = "deleteOrderMutation";

/**
 * Returns the an object with the callbacks that can be used for the React Query API, in this case to manage the user API.
 */
export const useOrderApi = () => {
    const { token } = useAppSelector(x => x.profileReducer); // You can use the data form the Redux storage. 
    const config = getAuthenticationConfiguration(token); // Use the token to configure the authentication header.

    const getOrders = (page: ApiOrderGetPageGetRequest) => new OrderApi(config).apiOrderGetPageGet(page); // Use the generated client code and adapt it.
    const getOrder = (id: string) => new OrderApi(config).apiOrderGetByIdIdGet({ id });
    const placeOrder = (order: OrderAddDTO) => new OrderApi(config).apiOrderPlaceOrderPost({ orderAddDTO: order });
    const updateOrder = (order: OrderUpdateDTO) => new OrderApi(config).apiOrderUpdateOrderPut({orderUpdateDTO: order});
    const deleteOrder = (id: string) => new OrderApi(config).apiOrderDeleteIdDelete({ id });
    
    return {
        getOrders: { // Return the query object.
            key: getOrdersQueryKey, // Add the key to identify the query.
            query: getOrders // Add the query callback.
        },
        getOrder: {
            key: getOrderQueryKey,
            query: getOrder
        },
        placeOrder: { // Return the mutation object.
            key: placeOrderMutationKey, // Add the key to identify the mutation.
            mutation: placeOrder // Add the mutation callback.
        },
        updateOrder: {
            key: updateOrderMutationKey,
            mutation: updateOrder
        },
        deleteOrder: {
            key: deleteOrderMutationKey,
            mutation: deleteOrder
        }
    }
}