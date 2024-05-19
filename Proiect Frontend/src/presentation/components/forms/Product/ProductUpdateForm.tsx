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
import { OrderStatusEnum, ProductDTO, ProductTypeEnum } from "@infrastructure/apis/client";
import { useProductUpdateFormController } from "./ProductUpdateForm.controller";

/**
 * Here we declare the user add form component.
 * This form may be used in modals so the onSubmit callback could close the modal on completion.
 */
export const ProductUpdateForm = (props:  { onSubmit?: () => void , product: ProductDTO}) => {
    const { formatMessage } = useIntl();
    const { state, actions, computed } = useProductUpdateFormController(props.product, props.onSubmit); // Use the controller.

    return <form onSubmit={actions.handleSubmit(actions.submit)}> {/* Wrap your form into a form tag and use the handle submit callback to validate the form and call the data submission. */}
        <Stack spacing={4} style={{ width: "100%" }}>
            <div>
                <Grid container item direction="row" xs={12} columnSpacing={4}>
                    <Grid container item direction="column" xs={6} md={6}>
                        <FormControl
                            fullWidth
                            error={!isUndefined(state.errors.name)}
                        > {/* Wrap the input into a form control and use the errors to show the input invalid if needed. */}
                            <FormLabel required>
                                <FormattedMessage id="globals.name" />
                            </FormLabel> {/* Add a form label to indicate what the input means. */}
                            <OutlinedInput
                                {...actions.register("name")} // Bind the form variable to the UI input.
                                placeholder={formatMessage(
                                    { id: "globals.placeholders.textInput" },
                                    {
                                        fieldName: formatMessage({
                                            id: "globals.name",
                                        }),
                                    })}
                                autoComplete="none"
                            /> {/* Add a input like a textbox shown here. */}
                            <FormHelperText
                                hidden={isUndefined(state.errors.name)}
                            >
                                {state.errors.name?.message}
                            </FormHelperText> {/* Add a helper text that is shown then the input has a invalid value. */}
                        </FormControl>
                    </Grid>
                    <Grid container item direction="column" xs={6} md={6}>
                        <FormControl
                            fullWidth
                            error={!isUndefined(state.errors.description)}
                        >
                            <FormLabel >
                                <FormattedMessage id="globals.description" />
                            </FormLabel>
                            <OutlinedInput
                                {...actions.register("description")}
                                placeholder={formatMessage(
                                    { id: "globals.placeholders.textInput" },
                                    {
                                        fieldName: formatMessage({
                                            id: "globals.description",
                                        }),
                                    })}
                                autoComplete="none"
                            />
                            <FormHelperText
                                hidden={isUndefined(state.errors.description)}
                            >
                                {state.errors.description?.message}
                            </FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid container item direction="column" xs={6} md={6}>
                        <FormControl
                            fullWidth
                            error={!isUndefined(state.errors.price)}
                        >
                            <FormLabel required>
                                <FormattedMessage id="globals.price" />
                            </FormLabel>
                            <OutlinedInput
                                {...actions.register("price")}
                                placeholder={formatMessage(
                                    { id: "globals.placeholders.textInput" },
                                    {
                                        fieldName: formatMessage({
                                            id: "globals.price",
                                        }),
                                    })}
                                autoComplete="none"
                            />
                            <FormHelperText
                                hidden={isUndefined(state.errors.price)}
                            >
                                {state.errors.price?.message}
                            </FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid container item direction="column" xs={6} md={6}>
                        <FormControl
                            fullWidth
                            error={!isUndefined(state.errors.productType)}
                        >
                            <FormLabel required>
                                <FormattedMessage id="globals.type" />
                            </FormLabel>
                            <Select
                                {...actions.register("productType")}
                                value={actions.watch("productType")}
                                onChange={actions.selectType} // Selects may need a listener to for the variable change.
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
                                <MenuItem value={ProductTypeEnum.Book}>
                                    <FormattedMessage id="labels.book" />
                                </MenuItem>
                                <MenuItem value={ProductTypeEnum.BoardGame}>
                                    <FormattedMessage id="labels.boardGame" />
                                </MenuItem>
                                <MenuItem value={ProductTypeEnum.Puzzle}>
                                    <FormattedMessage id="labels.puzzle" />
                                </MenuItem>
                            </Select>
                            <FormHelperText
                                hidden={isUndefined(state.errors.productType)}
                            >
                                {state.errors.productType?.message}
                            </FormHelperText>
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