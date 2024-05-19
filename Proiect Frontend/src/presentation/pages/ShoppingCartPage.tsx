import { WebsiteLayout } from "presentation/layouts/WebsiteLayout";
import { Fragment, memo } from "react";
import { Box } from "@mui/system";
import { Seo } from "@presentation/components/ui/Seo";
import { ContentCard } from "@presentation/components/ui/ContentCard";
import { ShoppingCartTable } from "@presentation/components/ui/Tables/ShoppingCartTable";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { AppRoute } from "routes";
import { useIntl } from "react-intl";

export const ShoppingCartPage = memo(() => {
  const { formatMessage } = useIntl();

  return <Fragment>
    <Seo title="PeNoptiera | Products" />
    <WebsiteLayout>
      <Box sx={{ padding: "0px 50px 00px 50px", justifyItems: "center" }}>
        <ContentCard>
            <ShoppingCartTable/>
            <Button  variant="contained">  {/* If the user is not logged in show a button that redirects to the login page. */}
                <Link style={{ color: 'white' }} to={AppRoute.PlaceOrder}>
                    {formatMessage({ id: "labels.placeOrder" })}
                </Link>
            </Button>
        </ContentCard>
      </Box>
    </WebsiteLayout>
  </Fragment>
});
