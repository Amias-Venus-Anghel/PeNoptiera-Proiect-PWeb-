import { WebsiteLayout } from "presentation/layouts/WebsiteLayout";
import { Fragment, memo } from "react";
import { Box } from "@mui/system";
import { Seo } from "@presentation/components/ui/Seo";
import { ContentCard } from "@presentation/components/ui/ContentCard";
import { ProducerControllTable } from "@presentation/components/ui/Tables/ProducerControllTable";

export const ProducerPage = memo(() => {
  return <Fragment>
    <Seo title="PeNoptiera | Products" />
    <WebsiteLayout>
      <Box sx={{ padding: "0px 50px 00px 50px", justifyItems: "center" }}>
        <ContentCard>
          <ProducerControllTable />
        </ContentCard>
      </Box>
    </WebsiteLayout>
  </Fragment>
});
