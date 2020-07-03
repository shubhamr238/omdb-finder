import React from "react";
import { Box, Container, Typography } from "@material-ui/core";

export default function DispOut(props) {
  return (
    <Container>
      <Box my={4} display="flex" justifyContent="center" alignItems="center">
        <Typography>{props.content}</Typography>
      </Box>
    </Container>
  );
}
