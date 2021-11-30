import React, { useEffect, useState } from "react";
import Header from "../../common/header/Header";
import "./Home.css";
import { createStyles, makeStyles, withStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import FormControl from "@material-ui/core/FormControl";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const styles = (theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 240,
    maxWidth: 240,
  },
  title: {
    color: theme.palette.primary.light,
  },
});

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
  const [movieName, setMovieName] = useState("");
  const [genresFilter, setGenresFilter] = useState([]);
  const [artistsFilter, setArtistsFilter] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedArtists, setSelectedArtists] = useState([]);
  const [startReleasedDate, setStartReleasedDate] = useState("");
  const [endReleasedDate, setEndReleasedDate] = useState("");
  const { classes } = props;

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

  function applyFilterHandler() {
    let initialQueryString = "?status=RELEASED";

    if (movieName !== "") initialQueryString += "&title=" + movieName;
    if (selectedGenres.length > 0)
      initialQueryString += "&genre=" + selectedGenres.toString();
    if (selectedArtists.length > 0)
      initialQueryString += "&artists=" + selectedArtists.toString();
    if (startReleasedDate !== "")
      initialQueryString += "&start_date=" + startReleasedDate;
    if (endReleasedDate !== "")
      initialQueryString += "&end_date=" + endReleasedDate;

    fetch(props.baseUrl + "movies" + encodeURI(initialQueryString), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        setReleasedMovies(response.movies);
      });
  }

  return (
    <div className="flex-container">
      <div className="released-movies">
        <GridList cellHeight={350} cols={4} spacing={20}>
          {releasedMovies.map((movie) => (
            <GridListTile
              key={"movie_" + movie.id}
              style={{ height: "350px", width: "300px", cursor: "pointer" }}
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
      <div className="movie-filters">
        <Card>
          <CardContent>
            <FormControl className={classes.formControl}>
              <Typography className={classes.title} color="textSecondary">
                FIND MOVIES BY:
              </Typography>
            </FormControl>

            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="movieName">Movie Name</InputLabel>
              <Input
                id="movieName"
                onChange={(e) => setMovieName(e.target.value)}
              />
            </FormControl>

            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="select-multiple-checkbox">Genres</InputLabel>
              <Select
                multiple
                input={<Input id="select-multiple-checkbox-genre" />}
                renderValue={(selected) => selected.join(",")}
                value={selectedGenres}
                onChange={(e) => setSelectedGenres(e.target.value)}
              >
                {genresFilter.map((genre) => (
                  <MenuItem key={genre.id} value={genre.genre}>
                    <Checkbox
                      checked={selectedGenres.indexOf(genre.genre) > -1}
                    />
                    <ListItemText primary={genre.genre} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="select-multiple-checkbox">
                Artists
              </InputLabel>
              <Select
                multiple
                input={<Input id="select-multiple-checkbox" />}
                renderValue={(selected) => selected.join(",")}
                value={selectedArtists}
                onChange={(e) => setSelectedArtists(e.target.value)}
              >
                {artistsFilter.map((artist) => (
                  <MenuItem
                    key={artist.id}
                    value={artist.first_name + " " + artist.last_name}
                  >
                    <Checkbox
                      checked={
                        selectedArtists.indexOf(
                          artist.first_name + " " + artist.last_name
                        ) > -1
                      }
                    />
                    <ListItemText
                      primary={artist.first_name + " " + artist.last_name}
                    />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl className={classes.formControl}>
              <TextField
                id="releaseDateStart"
                label="Release Date Start"
                type="date"
                defaultValue=""
                InputLabelProps={{ shrink: true }}
                onChange={(e) => setStartReleasedDate(e.target.value)}
              />
            </FormControl>

            <FormControl className={classes.formControl}>
              <TextField
                id="releaseDateEnd"
                label="Release Date End"
                type="date"
                defaultValue=""
                InputLabelProps={{ shrink: true }}
                onChange={(e) => setEndReleasedDate(e.target.value)}
              />
            </FormControl>
            <br />
            <br />
            <FormControl className={classes.formControl}>
              <Button
                onClick={() => applyFilterHandler()}
                variant="contained"
                color="primary"
              >
                APPLY
              </Button>
            </FormControl>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default withStyles(styles)(Home);
