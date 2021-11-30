import React, { useEffect, useState } from "react";
import Header from "../../common/header/Header";
import "./Home.css";
import { createStyles, makeStyles } from "@mui/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";

const Home = (props) => {
  return (
    <React.Fragment>
      <Header />
      <HomeBanner />
      <UpcomingMovies baseUrl={props.baseUrl} />
      <ReleasedMoviesSection {...props} baseUrl={props.baseUrl} />
    </React.Fragment>
  );
};

function HomeBanner() {
  return (
    <div className="upcoming-movies-banner">
      <span className="upcoming-movies-banner-text">Upcoming Movies</span>
    </div>
  );
}

function UpcomingMovies(props) {
  const [upcomingMovies, setUpcomingMovies] = useState([]);

  const useStyles = makeStyles((theme) =>
    createStyles({
      root: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        overflow: "hidden",
        backgroundColor: "white",
      },
      gridList: {
        flexWrap: "nowrap",
        transform: "translateZ(0)",
        width: "100%",
      },
      title: {
        color: "#fff",
      },
      titleBar: {
        background: "rgba(0, 0, 0, 0.5)",
      },
    })
  );

  const classes = useStyles();

  useEffect(() => {
    /* Fetching Upcoming Movies */

    fetch(props.baseUrl + "movies?status=PUBLISHED", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
    })
      .then((response) => response.json())
      .then((response) => setUpcomingMovies(response.movies));
  }, []);

  return (
    <div className={classes.root}>
      <GridList cellheight={250} cols={6} className={classes.gridList}>
        {upcomingMovies.map((movie) => (
          <GridListTile key={"movie_" + movie.id}>
            <img
              src={movie.poster_url}
              alt={movie.title}
              className="movie-image"
            />
            <GridListTileBar
              title={movie.title}
              classes={{
                root: classes.titleBar,
                title: classes.title,
              }}
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}

function ReleasedMoviesSection(props) {
  const [releasedMovies, setReleasedMovies] = useState([]);
  const [genresFilter, setGenresFilter] = useState([]);
  const [artistsFilter, setArtistsFilter] = useState([]);

  useEffect(() => {
    /* Fetch released movies */
    fetch(props.baseUrl + "movies?status=RELEASED", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
    })
      .then((response) => response.json())
      .then((response) => setReleasedMovies(response.movies));

    /* Fetch genres */
    fetch(props.baseUrl + "genres", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
    })
      .then((response) => response.json())
      .then((response) => setGenresFilter(response.genres));

    /* Fetch artists */
    fetch(props.baseUrl + "artists", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
    })
      .then((response) => response.json())
      .then((response) => setArtistsFilter(response.artists));
  }, []);

  return (
    <div className="flex-container">
      <div className="released-movies">
        <GridList cellHeight={350} cols={4} spacing={20}>
          {releasedMovies.map((movie) => (
            <GridListTile
              key={"movie_" + movie.id}
              style={{ height: "350px", width: "300px", cursor:"pointer" }}
              onClick={() => props.history.push("/movie/" + movie.id)}
            >
              <img
                src={movie.poster_url}
                alt={movie.title}
                className="movie-image"
              />
              <GridListTileBar
                title={movie.title}
                subtitle={
                  <span>
                    Release Date: {new Date(movie.release_date).toDateString()}
                  </span>
                }
              />
            </GridListTile>
          ))}
        </GridList>
      </div>
      <div className="movie-filters"></div>
    </div>
  );
}

export default Home;
