import { useIntl } from "react-intl";
import { isUndefined } from "lodash";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import { DataLoadingContainer } from "../../LoadingDisplay";
import { useOrderTableController } from "./OrderTable.controller";
import { OrderDTO, UserRoleEnum } from "@infrastructure/apis/client";
import { useOwnUserHasRole } from "@infrastructure/hooks/useOwnUser";
import { OrderUpdateDialog } from "../../Dialogs/OrderUpdateDialog";
import { ConfirmDelDialog } from "../../Dialogs/ConfirmDelDialog";

/**
 * This hook returns a header for the table with translated columns.
 */
const useHeader = (): { key: keyof OrderDTO, name: string }[] => {
    const { formatMessage } = useIntl();

    return [
        { key: "client", name: formatMessage({ id: "globals.name" }) },
        { key: "totalCost", name: formatMessage({ id: "globals.price" }) },
        { key: "deliveryAddress", name: formatMessage({ id: "globals.address" }) },
        { key: "deliveryMethod", name: formatMessage({id: "globals.deliverymethod"})},
        { key: "status", name: formatMessage({id: "globals.status"})}

    ]
};

/**
 * The values in the table are organized as rows so this function takes the entries and creates the row values ordering them according to the order map.
 */
const getRowValues = (entries: OrderDTO[] | null | undefined, orderMap: { [key: string]: number }) =>
    entries?.map(
        entry => {
            return {
                entry: entry,
                data: Object.entries(entry)
                .filter(([e]) => !isUndefined(orderMap[e]))
                .sort(([a], [b]) => orderMap[a] - orderMap[b])
                .map(([key, value]) => { 
                    if (key === 'client' && value && typeof value === 'object' && 'name' in value) {
                        return { key, value: value.name };
                    }
                    return { key, value } })
            }
        });

/**
 * Creates the user table.
 */
export const OrderTable = () => {
    const isAdmin = useOwnUserHasRole(UserRoleEnum.Admin);

    const { formatMessage } = useIntl();
    const header = useHeader();
    const orderMap = header.reduce((acc, e, i) => { return { ...acc, [e.key]: i } }, {}) as { [key: string]: number }; // Get the header column order.
    const { handleChangePage, handleChangePageSize, pagedData, isError, isLoading, tryReload, labelDisplay, remove } = useOrderTableController(); // Use the controller hook.
    const rowValues = getRowValues(pagedData?.data, orderMap); // Get the row values.

    return <DataLoadingContainer isError={isError} isLoading={isLoading} tryReload={tryReload}> {/* Wrap the table into the loading container because data will be fetched from the backend and is not immediately available.*/}
        
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
                        <TableCell/>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        rowValues?.map(({ data, entry }, rowIndex) => <TableRow key={`row_${rowIndex + 1}`}>
                            {data.map((keyValue, index) => <TableCell key={`cell_${rowIndex + 1}_${index + 1}`}>{keyValue.value}</TableCell>)} {/* Add the row values. */}
                        <TableCell>
                            {isAdmin &&  <OrderUpdateDialog orderId={entry.id || ''} /> }
                        </TableCell>
                        <TableCell> {/* Add other cells like action buttons. */}
                            {isAdmin && <ConfirmDelDialog onConfirm={() => remove(entry.id || '')} />}
                        </TableCell>
                        </TableRow>)
                    }
                </TableBody>
            </Table>
        </TableContainer>
    </DataLoadingContainer >
}