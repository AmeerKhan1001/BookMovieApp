import React, { useState, useEffect } from "react";
import Header from "../../common/header/Header";
import "./Details.css";
import Typography from "@material-ui/core/Typography";
import YouTube from "react-youtube";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import { Link } from "react-router-dom";

const Details = (props) => {
  return (
    <React.Fragment>
      <Header {...props} isDetailsPage={true} />
      <MovieDetailsSection {...props} />
    </React.Fragment>
  );
};

function MovieDetailsSection(props) {
  const [movie, setMovie] = useState({});
  const [ratingIcons, setratingIcons] = useState([
    {
      pos: 1,
      color: "black",
    },
    {
      pos: 2,
      color: "black",
    },
    {
      pos: 3,
      color: "black",
    },
    {
      pos: 4,
      color: "black",
    },
    {
      pos: 5,
      color: "black",
    },
  ]);

  const ytPlayerOptions = {
    height: "300",
    width: "700",
    playerVars: {
      autoplay: 1,
    },
  };

  const starClickHandler = (starId) => {
    let stars = [];
    for (let i of ratingIcons) {
      let temp = i;
      if (i.pos <= starId) {
        temp.color = "yellow";
      } else {
        temp.color = "black";
      }
      stars.push(temp);
    }

    setratingIcons(stars);
  };

  useEffect(() => {
    /* Fetch single movie */

    fetch(props.baseUrl + "movies/" + props.match.params.id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
    })
      .then((response) => response.json())
      .then((response) => setMovie(response));
  }, []);

  return (
    <React.Fragment>
      <div className="back-to-home">
        <Typography>
          <Link style={{ textDecoration: "none" }} to="/">
            &#60; Back to Home
          </Link>
        </Typography>
      </div>
      {movie !== {} && (
        <div className="flex-container">
          <div className="flex-container-left">
            <img src={movie.poster_url} alt={movie.title} />
          </div>
          <div className="flex-container-middle">
            <div>
              <Typography variant="h2">{movie.title}</Typography>
            </div>
            <br />
            <div>
              <Typography>
                <span className="bold-text">Genres: </span>
                {movie.genres && movie.genres.join(", ")}
              </Typography>
            </div>
            <div>
              <Typography>
                <span className="bold-text">Duration:</span> {movie.duration}
              </Typography>
            </div>
            <div>
              <Typography>
                <span className="bold-text">Release Date:</span>{" "}
                {new Date(movie.release_date).toDateString()}
              </Typography>
            </div>
            <div>
              <Typography>
                <span className="bold-text"> Rating:</span>
                {movie.critics_rating}
              </Typography>
            </div>
            <div className="margin-top-details">
              <Typography>
                <span className="bold-text">Plot:</span>{" "}
                <a href={movie.wiki_url}>Wiki Link</a> {movie.storyline}
              </Typography>
            </div>
            <div className="margin-top-details">
              <Typography>
                <span className="bold-text">Trailer:</span>
              </Typography>
              <YouTube
                videoId={movie.trailer_url && movie.trailer_url.split("?v=")[1]}
                opts={ytPlayerOptions}
              />
            </div>
          </div>
          <div className="flex-container-right">
            <Typography>
              <span className="bold">Rate this movie: </span>
            </Typography>
            {ratingIcons.map((star) => (
              <StarBorderIcon
                style={{ color: star.color }}
                key={"star" + star.pos}
                onClick={() => starClickHandler(star.pos)}
              />
            ))}

            <div className="bold margin-bottom-details margin-top-details">
              <Typography>
                <span className="bold">Artists:</span>
              </Typography>
            </div>
            <div>
                <GridList>
                {movie.artists &&
                  movie.artists.map((artist) => (
                    <GridListTile key={artist.id}>
                      <img
                        src={artist.profile_url}
                        alt={artist.first_name + " " + artist.last_name}
                      />
                      <GridListTileBar
                        title={artist.first_name + " " + artist.last_name}
                      />
                    </GridListTile>
                  ))}
                </GridList>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

export default Details;
