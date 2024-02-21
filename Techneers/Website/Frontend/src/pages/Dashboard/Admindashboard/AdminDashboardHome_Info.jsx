import React from "react";
import { Box, Grid, GridItem } from "@chakra-ui/react";
import DifferentLSPChart from "../../Chart/DifferentLSPChart";
import LegalServiceProvidersChart from "../../Chart/LegalServiceProvidersChart";
import Revenue from "../../Chart/Revenue";
import UsersChart from "../../Chart/UsersChart";

const AdminDashboardHome_Info = () => {
  return (
    <Grid templateColumns={"repeat(2,1fr)"} gap={4}>
      <GridItem>
        <LegalServiceProvidersChart />
      </GridItem>
      <GridItem>
        <UsersChart />
      </GridItem>
      <GridItem>
        <Revenue />
      </GridItem>
      <GridItem>
        <DifferentLSPChart />
      </GridItem>
    </Grid>
  );
};

export default AdminDashboardHome_Info;
