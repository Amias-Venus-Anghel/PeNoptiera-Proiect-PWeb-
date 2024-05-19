import {
    Button,
    Grid,
    Stack,
} from "@mui/material";
import { useIntl } from "react-intl";

export const ConfirmDelForm = (props: { onSubmit?: () => void }) => {
    const { formatMessage } = useIntl();
    
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent the default form submission behavior
        if (props.onSubmit) {
            props.onSubmit(); // Call the onSubmit callback if provided
        }
    };

    return <form onSubmit={handleSubmit}> {/* Wrap your form into a form tag and use the handle submit callback to validate the form and call the data submission. */}
        <Stack spacing={4} style={{ width: "100%" }}>
            <div>
                <Grid container item direction="row" xs={15} className="padding-top-sm">
                    <Grid container item direction="column" xs={1} md={1}></Grid>
                        <Button type="submit" variant="contained"> {formatMessage({ id: "globals.confirm" })} </Button>
                </Grid>
            </div>
        </Stack>
    </form>
};