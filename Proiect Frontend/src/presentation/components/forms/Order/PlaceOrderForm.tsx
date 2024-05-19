import {
    Button,
    CircularProgress,
    FormControl,
    FormHelperText,
    FormLabel,
    Grid,
    Stack,
    Select,
    MenuItem,
    OutlinedInput
} from "@mui/material";
import { FormattedMessage, useIntl } from "react-intl";
import { isEmpty, isUndefined } from "lodash";
import { OrderDeliveryEnum, OrderStatusEnum } from "@infrastructure/apis/client";
import { usePlaceOrderFormController } from "./PlaceOrderForm.controller";

/**
 * Here we declare the user add form component.
 * This form may be used in modals so the onSubmit callback could close the modal on completion.
 */
export const PlaceOrderForm = (props:  { onSubmit?: () => void }) => {
    const { formatMessage } = useIntl();
    const { state, actions, computed } = usePlaceOrderFormController(props.onSubmit); // Use the controller.

    return <form onSubmit={actions.handleSubmit(actions.submit)}> {/* Wrap your form into a form tag and use the handle submit callback to validate the form and call the data submission. */}
        <Stack spacing={10} style={{ width: "100%" }}>
            <div>
                <Grid container item direction="column" xs={12} columnSpacing={10}>
                    <Grid container item direction="column" xs={6} md={6}>
                        <FormControl
                            fullWidth
                            error={!isUndefined(state.errors.deliveryAddress)}
                        > {/* Wrap the input into a form control and use the errors to show the input invalid if needed. */}
                            <FormLabel required>
                                <FormattedMessage id="globals.name" />
                            </FormLabel> {/* Add a form label to indicate what the input means. */}
                            <OutlinedInput
                                {...actions.register("deliveryAddress")} // Bind the form variable to the UI input.
                                placeholder={formatMessage(
                                    { id: "globals.placeholders.textInput" },
                                    {
                                        fieldName: formatMessage({
                                            id: "globals.address",
                                        }),
                                    })}
                                autoComplete="none"
                            /> {/* Add a input like a textbox shown here. */}
                            <FormHelperText
                                hidden={isUndefined(state.errors.deliveryAddress)}
                            >
                                {state.errors.deliveryAddress?.message}
                            </FormHelperText> {/* Add a helper text that is shown then the input has a invalid value. */}
                        </FormControl>
                    </Grid>
                    <Grid container item direction="column" xs={6} md={6}>
                        <FormControl
                            fullWidth
                            error={!isUndefined(state.errors.deliveryMethod)}
                        > {/* Wrap the input into a form control and use the errors to show the input invalid if needed. */}
                            <FormLabel required>
                                <FormattedMessage id="globals.deliverymethod" />
                            </FormLabel> {/* Add a form label to indicate what the input means. */}
                            <Select style={{ minWidth: '300px' }}
                                {...actions.register("deliveryMethod")}
                                value={actions.watch("deliveryMethod")}
                                onChange={actions.selectDelivery} // Selects may need a listener to for the variable change.
                                displayEmpty
                            >
                                <MenuItem value="" disabled> {/* Add the select options, the first here is used as a placeholder. */}
                                    <span className="text-gray">
                                        {formatMessage({ id: "globals.placeholders.selectInput" }, {
                                            fieldName: formatMessage({
                                                id: "globals.deliverymethod",
                                            }),
                                        })}
                                    </span>
                                </MenuItem>
                                <MenuItem value={OrderDeliveryEnum.Courier}>
                                    <FormattedMessage id="global.courier" />
                                </MenuItem>
                                <MenuItem value={OrderDeliveryEnum.Post}>
                                    <FormattedMessage id="global.post" />
                                </MenuItem>
                            </Select>

                            <FormHelperText
                                hidden={isUndefined(state.errors.deliveryMethod)}
                            >
                                {state.errors.deliveryMethod?.message}
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