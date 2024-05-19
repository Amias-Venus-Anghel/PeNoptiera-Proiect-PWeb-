import {
    Button,
    CircularProgress,
    FormControl,
    FormHelperText,
    FormLabel,
    Grid,
    Stack,
    OutlinedInput,
    Select,
    MenuItem,
    RadioGroup,
    FormControlLabel,
    Radio,
    ToggleButton,
    Checkbox
} from "@mui/material";
import { FormattedMessage, useIntl } from "react-intl";
import { isEmpty, isUndefined } from "lodash";
import { useFeedbackAddFormController } from "./FeedbackAddForm.controller";
import { FormSubjectEnum } from "@infrastructure/apis/client";
import { useState } from "react";

/**
 * Here we declare the user add form component.
 * This form may be used in modals so the onSubmit callback could close the modal on completion.
 */
export const FeedbackAddForm = (props: { onSubmit?: () => void }) => {
    const { formatMessage } = useIntl();
    const { state, actions, computed } = useFeedbackAddFormController(props.onSubmit); // Use the controller.

    const [isChecked, setIsChecked] = useState(false);
    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsChecked(event.target.checked);
    };

    return <form onSubmit={actions.handleSubmit(actions.submit)}> {/* Wrap your form into a form tag and use the handle submit callback to validate the form and call the data submission. */}
        <Stack spacing={4} style={{ width: "100%" }}>
            <div>
                <Grid container item direction="column" xs={12} columnSpacing={4}>
                    <Grid container item direction="column" xs={6} md={6}>
                        <FormControl
                            fullWidth
                            error={!isUndefined(state.errors.subject)}
                        > {/* Wrap the input into a form control and use the errors to show the input invalid if needed. */}
                            <FormLabel required>
                                <FormattedMessage id="globals.subject" />
                            </FormLabel> {/* Add a form label to indicate what the input means. */}
                            <Select
                                {...actions.register("subject")}
                                value={actions.watch("subject")}
                                onChange={actions.selectSubject} // Selects may need a listener to for the variable change.
                                displayEmpty
                            >
                                <MenuItem value="" disabled> {/* Add the select options, the first here is used as a placeholder. */}
                                    <span className="text-gray">
                                        {formatMessage({ id: "globals.placeholders.selectInput" }, {
                                            fieldName: formatMessage({
                                                id: "globals.subject",
                                            }),
                                        })}
                                    </span>
                                </MenuItem>
                                <MenuItem value={FormSubjectEnum.Account}>
                                    {formatMessage({ id: "labels.account" })}
                                </MenuItem>
                                <MenuItem value={FormSubjectEnum.Delivery}>
                                    {formatMessage({ id: "labels.delivery" })}
                                </MenuItem>
                                <MenuItem value={FormSubjectEnum.Payment}>
                                    {formatMessage({ id: "labels.payment" })}
                                </MenuItem>
                                <MenuItem value={FormSubjectEnum.Products}>
                                    {formatMessage({ id: "labels.products" })}
                                </MenuItem>
                                <MenuItem value={FormSubjectEnum.Other}>
                                    {formatMessage({ id: "labels.other" })}
                                </MenuItem>
                            </Select>
                            <FormHelperText
                                hidden={isUndefined(state.errors.subject)}
                            >
                                {state.errors.subject?.message}
                            </FormHelperText> {/* Add a helper text that is shown then the input has a invalid value. */}
                        </FormControl>
                    </Grid>
                    <Grid container item direction="column" xs={6} md={6}>
                        <FormControl
                            fullWidth
                            error={!isUndefined(state.errors.body)}
                        >
                            <FormLabel >
                                <FormattedMessage id="globals.message" />
                            </FormLabel>
                            <OutlinedInput
                                {...actions.register("body")}
                                placeholder={formatMessage(
                                    { id: "globals.placeholders.textInput" },
                                    {
                                        fieldName: formatMessage({
                                            id: "globals.message",
                                        }),
                                    })}
                                autoComplete="none"
                            />
                            <FormHelperText
                                hidden={isUndefined(state.errors.body)}
                            >
                                {state.errors.body?.message}
                            </FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid container item direction="column" xs={6} md={6}>
                        <FormControl
                            fullWidth
                            error={!isUndefined(state.errors.rating)}
                        >
                            <FormLabel id="demo-radio-buttons-group-label"> {formatMessage({ id: "globals.rating" })} </FormLabel>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                name="radio-buttons-group"
                                value={actions.watch("rating")}
                                onChange={(e) => actions.setRating(parseInt(e.target.value))}
                            >
                                <FormControlLabel value={1} control={<Radio />} label={formatMessage({ id: "labels.awfulexp" })}  />
                                <FormControlLabel value={2} control={<Radio />} label={formatMessage({ id: "labels.badexp" })}  />
                                <FormControlLabel value={4} control={<Radio />} label={formatMessage({ id: "labels.decentexp" })}  />
                                <FormControlLabel value={3} control={<Radio />} label={formatMessage({ id: "labels.alrightexp" })}  />
                                <FormControlLabel value={5} control={<Radio />} label={formatMessage({ id: "labels.greatexp" })}  />
                            </RadioGroup>
                            <FormHelperText
                                hidden={isUndefined(state.errors.rating)}
                            >
                                {state.errors.rating?.message}
                            </FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid container item direction="row" xs={12} md={12}>
                            <FormControl>
                                <FormControlLabel
                                    control={
                                        <Checkbox checked={isChecked} onChange={handleCheckboxChange} />
                                    }
                                    label={formatMessage({ id: "labels.agreeTerms" })}
                                />
                            </FormControl>
                        </Grid>
                </Grid>
                <Grid container item direction="row" xs={12} className="padding-top-sm">
                    <Grid container item direction="column" xs={12} md={7}></Grid>
                    <Grid container item direction="column" xs={5}>
                        <Button type="submit" disabled={!isChecked || !isEmpty(state.errors) || computed.isSubmitting}> {/* Add a button with type submit to call the submission callback if the button is a descended of the form element. */}
                            {!computed.isSubmitting && <FormattedMessage id="globals.submit" />}
                            {computed.isSubmitting && <CircularProgress />}
                        </Button>
                    </Grid>
                </Grid>
            </div>
        </Stack>
    </form>
};