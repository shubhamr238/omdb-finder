import React from "react";
import { Box, Container } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";

const Paginate = (props) => {
  return (
    <Container>
      <Box my={10} display="flex" justifyContent="center" alignItems="center">
        <Pagination
          count={props.count}
          onChange={props.onChange}
          size="small"
        />
      </Box>
    </Container>
  );
};

export default Paginate;
