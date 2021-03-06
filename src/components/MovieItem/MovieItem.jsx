import React, { useState } from "react";
import {
  Grid,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@material-ui/core";

import Modal from "react-modal";
import { makeStyles } from "@material-ui/core/styles";
import MovieInfo from "../MovieInfo/MovieInfo";

const useStyles = makeStyles({
  root: {
    //maxWidth: 360,
    marginBottom: "10px",
  },
});

const MovieItem = (props) => {
  const classes = useStyles();

  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt={props.data.Title}
            height="500"
            image={
              props.data.Poster === "N/A"
                ? "https://s3-ap-southeast-1.amazonaws.com/upcode/static/default-image.jpg"
                : props.data.Poster
            }
            title={props.data.Title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {props.data.Title}
            </Typography>
            <Typography gutterBottom variant="h5" component="h2">
              ({props.data.Year})
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            size="small"
            color="primary"
            onClick={() => setModalIsOpen(true)}
          >
            View More
          </Button>
          <Modal
            style={{
              overlay: { backgroundColor: "grey", zIndex: "2" },
              content: {},
            }}
            isOpen={modalIsOpen}
            ariaHideApp={false}
          >
            <Button onClick={() => setModalIsOpen(false)}>Go Back</Button>
            <MovieInfo imdbID={props.data.imdbID} />
          </Modal>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default MovieItem;
