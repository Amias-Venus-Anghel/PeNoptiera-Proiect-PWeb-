import { useIntl } from "react-intl";
import { isUndefined } from "lodash";
import { Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField } from "@mui/material";
import { DataLoadingContainer } from "../../LoadingDisplay";
import { useProductTableController } from "./ProductTable.controller";
import { ProductDTO, UserRoleEnum } from "@infrastructure/apis/client";
import { useAppSelector } from "@application/store";
import { useOwnUserHasRole } from "@infrastructure/hooks/useOwnUser";
import { ConfirmDelDialog } from "../../Dialogs/ConfirmDelDialog";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useOrderApi } from "@infrastructure/apis/api-management";
import { useShoppingCartApi } from "@infrastructure/apis/api-management/shoppingCart";
import { toast } from "react-toastify";

/**
 * This hook returns a header for the table with translated columns.
 */
const useHeader = (): { key: keyof ProductDTO, name: string }[] => {
    const { formatMessage } = useIntl();

    return [
        { key: "name", name: formatMessage({ id: "globals.name" }) },
        { key: "productType", name: formatMessage({ id: "globals.type" }) },
        { key: "price", name: formatMessage({ id: "globals.price" }) },
        { key: "description", name: formatMessage({id: "globals.description"})},
        { key: "producer", name: formatMessage({id: "globals.producer"})}
    ]
};

/**
 * The values in the table are organized as rows so this function takes the entries and creates the row values ordering them according to the order map.
 */
const getRowValues = (entries: ProductDTO[] | null | undefined, orderMap: { [key: string]: number }) =>
    entries?.map(
        entry => {
            return {
                entry: entry,
                data: Object.entries(entry)
                .filter(([e]) => !isUndefined(orderMap[e]))
                .sort(([a], [b]) => orderMap[a] - orderMap[b])
                .map(([key, value]) => { 
                    if (key === 'producer' && value && typeof value === 'object' && 'name' in value) {
                        return { key, value: value.name };
                    }
                    return { key, value } })
            }
        });

/**
 * Creates the user table.
 */
export const ProductTable = () => {
    const { userId: ownUserId } = useAppSelector(x => x.profileReducer);
    const isAdmin = useOwnUserHasRole(UserRoleEnum.Admin);
    
    const { formatMessage } = useIntl();
    const header = useHeader();
    const orderMap = header.reduce((acc, e, i) => { return { ...acc, [e.key]: i } }, {}) as { [key: string]: number }; // Get the header column order.
    const { handleChangePage, handleChangePageSize, pagedData, isError, isLoading, tryReload, labelDisplay, search, setSearchQuery, addToCart} = useProductTableController(); // Use the controller hook.
    const rowValues = getRowValues(pagedData?.data, orderMap); // Get the row values.
    
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value); // Update search query state when the input value changes.
    };

    return <DataLoadingContainer isError={isError} isLoading={isLoading} tryReload={tryReload}> {/* Wrap the table into the loading container because data will be fetched from the backend and is not immediately available.*/}
        <TextField 
            label={formatMessage({ id: "labels.search" })} 
            value={search}
            onChange={handleSearchChange}
            variant="outlined"
            fullWidth
            margin="normal"
        />
            
        {!isUndefined(pagedData) && !isUndefined(pagedData?.totalCount) && !isUndefined(pagedData?.page) && !isUndefined(pagedData?.pageSize) &&
            <TablePagination // Use the table pagination to add the navigation between the table pages.
                component="div"
                count={pagedData.totalCount} // Set the entry count returned from the backend.
                page={pagedData.totalCount !== 0 ? pagedData.page - 1 : 0} // Set the current page you are on.
                onPageChange={handleChangePage} // Set the callback to change the current page.
                rowsPerPage={pagedData.pageSize} // Set the current page size.
                onRowsPerPageChange={handleChangePageSize} // Set the callback to change the current page size. 
                labelRowsPerPage={formatMessage({ id: "labels.itemsPerPage" })}
                labelDisplayedRows={labelDisplay}
                showFirstButton
                showLastButton
            />}

        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        {
                            header.map(e => <TableCell key={`header_${String(e.key)}`}>{e.name}</TableCell>) // Add the table header.
                        }
                        <TableCell>{formatMessage({ id: "labels.details" })}</TableCell> {/* Add additional header columns if needed. */}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        rowValues?.map(({ data, entry }, rowIndex) => <TableRow key={`row_${rowIndex + 1}`}>
                            {data.map((keyValue, index) => <TableCell key={`cell_${rowIndex + 1}_${index + 1}`}>{keyValue.value}</TableCell>)} {/* Add the row values. */}
                        <TableCell> {/* Add other cells like action buttons. */}
                            <IconButton onClick={() => addToCart(entry.id || '') } >
                                <ShoppingCartIcon style={{ color: 'green' }} fontSize='small' />
                            </IconButton>
                        </TableCell>
        
                        </TableRow>)
                    }
                </TableBody>
            </Table>
        </TableContainer>
    </DataLoadingContainer >
}