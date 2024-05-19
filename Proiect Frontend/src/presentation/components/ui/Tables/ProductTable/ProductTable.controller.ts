import { useTableController } from "../Table.controller";
import { useProductApi } from "@infrastructure/apis/api-management";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { usePaginationController } from "../Pagination.controller";
import { useShoppingCartApi } from "@infrastructure/apis/api-management/shoppingCart";
import { toast } from "react-toastify";
import { useIntl } from "react-intl";

/**
 * This is controller hook manages the table state including the pagination and data retrieval from the backend.
 */
export const useProductTableController = () => {
    const { getProducts: { key: queryKey, query } } = useProductApi(); // Use the API hook.
    const queryClient = useQueryClient(); // Get the query client.
    const { page, pageSize, setPagination } = usePaginationController(); // Get the pagination state.
    const [search, setSearchQuery] = useState(''); // Add state for the search query.

    const { formatMessage } = useIntl();
    
    const { addProduct: {mutation: addProduct, key: addProductKey} } = useShoppingCartApi();
    const { mutateAsync: addMutation, status } = useMutation({
        mutationKey: [addProductKey],
        mutationFn: addProduct
    }); 

    const { data, isError, isLoading } = useQuery({
        queryKey: [queryKey, page, pageSize, search],
        queryFn: () => query({search, page, pageSize})
    }); // Retrieve the table page from the backend via the query hook.

    const addToCart = useCallback((productId: string) => // Create a submit callback to send the form data to the backend.
        addProduct(productId).then(() => {
            toast(formatMessage({ id:  "notifications.errors.addedToCartSuccess"}));
    }), [addProduct, queryClient, queryKey]);
    
    const tryReload = useCallback(
        () => queryClient.invalidateQueries({ queryKey: [queryKey] }),
        [queryClient, queryKey]); // Create a callback to try reloading the data for the table via query invalidation.

    const tableController = useTableController(setPagination, data?.response?.pageSize); // Adapt the pagination for the table.

    return { // Return the controller state and actions.
        ...tableController,
        tryReload,
        pagedData: data?.response,
        isError,
        isLoading,
        search, // Include search query in the return value.
        setSearchQuery, // Include setSearchQuery function to allow updating the search query.
        addToCart
    };
}