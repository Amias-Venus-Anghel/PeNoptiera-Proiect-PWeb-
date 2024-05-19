import { WebsiteLayout } from "presentation/layouts/WebsiteLayout";
import { Fragment, memo } from "react";
import { Box } from "@mui/system";
import { Seo } from "@presentation/components/ui/Seo";
import { ContentCard } from "@presentation/components/ui/ContentCard";
import { FbFormTable } from "@presentation/components/ui/Tables/FbFormTable";

export const FeedBackPage = memo(() => {
  return <Fragment>
    <Seo title="PeNoptiera | Feedback" />
    <WebsiteLayout>
      <Box sx={{ padding: "0px 50px 00px 50px", justifyItems: "center" }}>
        <ContentCard>
          <FbFormTable />
        </ContentCard>
      </Box>
    </WebsiteLayout>
  </Fragment>
});
