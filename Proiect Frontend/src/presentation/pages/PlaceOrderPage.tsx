import { WebsiteLayout } from "presentation/layouts/WebsiteLayout";
import { Fragment, memo } from "react";
import { Box } from "@mui/material";
import { Seo } from "@presentation/components/ui/Seo";
import { PlaceOrderForm } from "@presentation/components/forms/Order/PlaceOrderForm";

export const PlaceOrderPage = memo(() => {
    
    return <Fragment>
        <Seo title="PeNoptiera | Register" />
        <WebsiteLayout>
            <Box sx={{ padding: "0px 50px 0px 50px", justifyItems: "center" }}>
                <PlaceOrderForm />
            </Box>
        </WebsiteLayout>
    </Fragment>
});
