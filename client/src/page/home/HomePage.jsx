import React, { useContext } from "react";

import Container from "@material-ui/core/Container";
import { Grid, Box } from "@material-ui/core";
import OutlinedCard from "../../components/outlinedCard/OutlinedCard";
import Table from "../../components/table/Table";

import { UserContext } from "../../providers/user/UserProvider";
import { TableContext } from "../../providers/data/DataProvider";

import "./homePage.scss";

const HomePage = () => {
  
  const { user } = useContext(UserContext);
  const { data } = useContext(TableContext);

  return (
    <React.Fragment>
      {user ? (
        <div className="promo_wrapper_table">
          <Box mt={4}>
            <Container maxWidth="lg">
              <Table data={data} />
            </Container>
          </Box>
        </div>
      ) : (
        <div className="promo_wrapper_main">
          <Container maxWidth="lg">
            <Grid container>
              <Grid item xs={12} sm={6}></Grid>
              <Grid item xs={12} sm={6}>
                <OutlinedCard />
              </Grid>
            </Grid>
          </Container>
        </div>
      )}
    </React.Fragment>
  );
};

export default HomePage;
