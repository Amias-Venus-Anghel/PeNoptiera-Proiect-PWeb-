import { WebsiteLayout } from "presentation/layouts/WebsiteLayout";
import { Fragment, memo } from "react";
import { Box } from "@mui/material";
import { Seo } from "@presentation/components/ui/Seo";
import { RegisterForm } from "@presentation/components/forms/Register/RegisterForm";
import { FeedbackAddForm } from "@presentation/components/forms/Feedback/FeedbackAddForm";
import { ContentCard } from "@presentation/components/ui/ContentCard";
import { useIntl } from "react-intl";

export const ContactPage = memo(() => {
    const { formatMessage } = useIntl();
    
    return <Fragment>
        <Seo title="PeNoptiera | Contact" />
        <WebsiteLayout>
            <Box sx={{ padding: "0px 50px 0px 50px", justifyItems: "center" }}>
                <ContentCard title={formatMessage({ id: "globals.contact" })}>
                    <FeedbackAddForm />
                </ContentCard>
            </Box>
        </WebsiteLayout>
    </Fragment>
});
