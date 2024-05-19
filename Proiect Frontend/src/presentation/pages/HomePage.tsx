import { WebsiteLayout } from "presentation/layouts/WebsiteLayout";
import { Button, Grid, Typography } from "@mui/material";
import { Fragment, memo } from "react";
import { useIntl } from "react-intl";
import { Box } from "@mui/system";
import { Seo } from "@presentation/components/ui/Seo";
import { ContentCard } from "@presentation/components/ui/ContentCard";
import { Link } from "react-router-dom";
import { AppRoute } from "routes";

export const HomePage = memo(() => {
  const { formatMessage } = useIntl();

  return <Fragment>
      <Seo title="PeNoptiera | Home" />
      <WebsiteLayout>
        <Box sx={{ padding: "0px 50px 00px 50px", justifyItems: "center" }}>
          <ContentCard title={formatMessage({ id: "globals.welcome" })}>
              <Typography>
                
              </Typography>
          </ContentCard>
        </Box>
      </WebsiteLayout>
    </Fragment>
});




