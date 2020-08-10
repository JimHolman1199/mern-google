import React from "react";
import { Container, Box } from "@material-ui/core";
import Typography from '@material-ui/core/Typography';

import './aboutPage.scss'

const AboutPage = () => (
    <div className="promo_wrapper_table_v2">
      <Box mt={4}>
        <Container maxWidth="lg">
            <Typography variant="h1" component="h2" gutterBottom>
            What is Lorem Ipsum?
            </Typography>
            <Typography variant="body1" gutterBottom>
                body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
                unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam
                dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
            </Typography>
        </Container>
      </Box>
    </div>
);

export default AboutPage;
