import React from "react";
import { Box, CircularProgress, Container } from "@material-ui/core";
export default function Spinner() {
  return (
    <Container>
      <Box my={10} display="flex" justifyContent="center" alignItems="center">
        <CircularProgress color="secondary" />
      </Box>
    </Container>
  );
}
