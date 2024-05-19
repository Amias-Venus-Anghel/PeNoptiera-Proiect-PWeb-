import { useIntl } from "react-intl";
import { isUndefined } from "lodash";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import { DataLoadingContainer } from "../../LoadingDisplay";
import { useFbFormTableController } from "./FbFormTable.controller";
import { FormDTO} from "@infrastructure/apis/client";
import { useAppSelector } from "@application/store";
import { ConfirmDelDialog } from "../../Dialogs/ConfirmDelDialog";

/**
 * This hook returns a header for the table with translated columns.
 */
const useHeader = (): { key: keyof FormDTO, name: string }[] => {
    const { formatMessage } = useIntl();

    return [
        { key: "user", name: formatMessage({ id: "globals.email" }) },
        { key: "subject", name: formatMessage({ id: "globals.subject" }) },
        { key: "body", name: formatMessage({ id: "globals.message" }) },
        { key: "rating", name: formatMessage({ id: "globals.rating"})}
    ]
};

/**
 * The values in the table are organized as rows so this function takes the entries and creates the row values ordering them according to the order map.
 */
const getRowValues = (entries: FormDTO[] | null | undefined, orderMap: { [key: string]: number }) =>
    entries?.map(
        entry => {
            return {
                entry: entry,
                data: Object.entries(entry)
                .filter(([e]) => !isUndefined(orderMap[e]))
                .sort(([a], [b]) => orderMap[a] - orderMap[b])
                .map(([key, value]) => {
                    if (key === 'user' && value && typeof value === 'object' && 'email' in value) {
                        return { key, value: value.email };
                    }
                    return { key, value } })
            }
        });

/**
 * Creates the user table.
 */
export const FbFormTable = () => {
    const { userId: ownUserId } = useAppSelector(x => x.profileReducer);
    const { formatMessage } = useIntl();
    const header = useHeader();
    const orderMap = header.reduce((acc, e, i) => { return { ...acc, [e.key]: i } }, {}) as { [key: string]: number }; // Get the header column order.
    const { handleChangePage, handleChangePageSize, pagedData, isError, isLoading, tryReload, labelDisplay, remove } = useFbFormTableController(); // Use the controller hook.
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
                        <TableCell>{formatMessage({ id: "labels.actions" })}</TableCell> {/* Add additional header columns if needed. */}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        rowValues?.map(({ data, entry }, rowIndex) => <TableRow key={`row_${rowIndex + 1}`}>
                            {data.map((keyValue, index) => <TableCell key={`cell_${rowIndex + 1}_${index + 1}`}>{keyValue.value}</TableCell>)} {/* Add the row values. */}
                            <TableCell> {/* Add other cells like action buttons. */}
                                {entry.id !== ownUserId && <ConfirmDelDialog onConfirm={() => remove(entry.id || '')} />}
                            </TableCell>
                        </TableRow>)
                    }
                </TableBody>
            </Table>
        </TableContainer>
    </DataLoadingContainer >
}