import React, { useEffect, useState } from "react";
import Header from "../../common/header/Header";
import "./Home.css";
import { createStyles, makeStyles } from '@mui/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

const Home = (props) => {
  return (
    <React.Fragment>
      <Header />
      <HomeBanner />
      <UpcomingMovies baseUrl={props.baseUrl}/>
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

    const useStyles = makeStyles(theme =>
        createStyles({
          root: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            overflow: 'hidden',
            backgroundColor: 'white',
          },
          gridList: {
            flexWrap: 'nowrap',
            transform: 'translateZ(0)',
            width: '100%'
          },
          title: {
            color: '#fff'
          },
          titleBar: {
            background: 'rgba(0, 0, 0, 0.5)'
          },
        }),
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
      .then(response => response.json())
      .then(response => setUpcomingMovies(response.movies));

    }, []);

    return(
      <div className={classes.root}>
      <GridList cellheight={250} cols={6} className={classes.gridList}>
        {upcomingMovies.map(movie => (
          <GridListTile key={"movie_"+movie.id}>
            <img src={movie.poster_url} alt={movie.title} className="movie-image"/>
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

export default Home;