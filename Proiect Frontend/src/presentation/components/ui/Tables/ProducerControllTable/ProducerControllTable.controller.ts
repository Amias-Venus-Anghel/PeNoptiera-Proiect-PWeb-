import { useTableController } from "../Table.controller";
import { useProductApi } from "@infrastructure/apis/api-management";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { usePaginationController } from "../Pagination.controller";

/**
 * This is controller hook manages the table state including the pagination and data retrieval from the backend.
 */
export const useProducerControllTableController = () => {
    const { getProductsOfUser: { key: queryKey, query}, deleteProduct: { key: deleteProductKey, mutation: deleteProduct } } = useProductApi(); // Use the API hook.
    const queryClient = useQueryClient(); // Get the query client.
    const { page, pageSize, setPagination } = usePaginationController(); // Get the pagination state.
    const [search, setSearchQuery] = useState(''); // Add state for the search query.

    const [userId, setUserId] = useState('');
    
    const { data, isError, isLoading } = useQuery({
        queryKey: [queryKey, page, pageSize, search],
        queryFn: () => query({search, page, pageSize}, userId)
    }); // Retrieve the table page from the backend via the query hook.
    
    const { mutateAsync: deleteMutation } = useMutation({
        mutationKey: [deleteProductKey],
        mutationFn: deleteProduct
    }); 

    const remove = useCallback(
        (id: string) => deleteMutation(id).then(() => queryClient.invalidateQueries({ queryKey: [queryKey] })),
        [queryClient, deleteMutation, queryKey]); // Create the callback to remove an entry.

    const tryReload = useCallback(
        () => {
            queryClient.invalidateQueries({ queryKey: [queryKey] });
            console.log("Reloading table data...");
        },
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
        setUserId,
        remove
    };
}