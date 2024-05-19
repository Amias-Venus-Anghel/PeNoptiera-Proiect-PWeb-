import {
    Button,
    CircularProgress,
    FormControl,
    FormHelperText,
    FormLabel,
    Grid,
    Stack,
    Select,
    MenuItem
} from "@mui/material";
import { FormattedMessage, useIntl } from "react-intl";
import { useOrderUpdateFormController } from "./OrderUpdateForm.controller";
import { isEmpty, isUndefined } from "lodash";
import { OrderStatusEnum } from "@infrastructure/apis/client";

/**
 * Here we declare the user add form component.
 * This form may be used in modals so the onSubmit callback could close the modal on completion.
 */
export const OrderUpdateForm = (props:  { onSubmit?: () => void , orderId: string}) => {
    const { formatMessage } = useIntl();
    const { state, actions, computed } = useOrderUpdateFormController(props.orderId, props.onSubmit); // Use the controller.

    return <form onSubmit={actions.handleSubmit(actions.submit)}> {/* Wrap your form into a form tag and use the handle submit callback to validate the form and call the data submission. */}
        <Stack spacing={4} style={{ width: "100%" }}>
            <div>
                <Grid container item direction="row" xs={12} columnSpacing={4}>
                    <Grid container item direction="column" xs={6} md={6}>
                        <FormControl
                            fullWidth
                            error={!isUndefined(state.errors.status)}
                        > {/* Wrap the input into a form control and use the errors to show the input invalid if needed. */}
                            <FormLabel required>
                                <FormattedMessage id="globals.status" />
                            </FormLabel> {/* Add a form label to indicate what the input means. */}
                            <Select style={{ minWidth: '300px' }}
                                {...actions.register("status")}
                                value={actions.watch("status")}
                                onChange={actions.selectStatus} // Selects may need a listener to for the variable change.
                                displayEmpty
                            >
                                <MenuItem value="" disabled> {/* Add the select options, the first here is used as a placeholder. */}
                                    <span className="text-gray">
                                        {formatMessage({ id: "globals.placeholders.selectInput" }, {
                                            fieldName: formatMessage({
                                                id: "globals.role",
                                            }),
                                        })}
                                    </span>
                                </MenuItem>
                                <MenuItem value={OrderStatusEnum.Registered}>
                                    <FormattedMessage id="globals.registered" />
                                </MenuItem>
                                <MenuItem value={OrderStatusEnum.InTranzit}>
                                    <FormattedMessage id="globals.inTranzit" />
                                </MenuItem>
                                <MenuItem value={OrderStatusEnum.Delivered}>
                                    <FormattedMessage id="globals.delivered" />
                                </MenuItem>
                            </Select>

                            <FormHelperText
                                hidden={isUndefined(state.errors.status)}
                            >
                                {state.errors.status?.message}
                            </FormHelperText> {/* Add a helper text that is shown then the input has a invalid value. */}
                        </FormControl>
                    </Grid>
                </Grid>
                   
                <Grid container item direction="row" xs={12} className="padding-top-sm">
                    <Grid container item direction="column" xs={12} md={7}></Grid>
                    <Grid container item direction="column" xs={5}>
                        <Button type="submit" disabled={!isEmpty(state.errors) || computed.isSubmitting}> {/* Add a button with type submit to call the submission callback if the button is a descended of the form element. */}
                            {!computed.isSubmitting && <FormattedMessage id="globals.submit" />}
                            {computed.isSubmitting && <CircularProgress />}
                        </Button>
                    </Grid>
                </Grid>
            </div>
        </Stack>
    </form>
};