import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMoviesData } from "../redux/actions/fetchAction";
import { Box, Button, Grid, Heading, Text } from "@chakra-ui/react";
import MovieCard from "../Components/MovieCard";
import { FaHistory } from "react-icons/fa";
import { Vortex } from "react-loader-spinner";
import AddMovieModal from "../Components/AddMovieModal";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { status, error, movies } = useSelector((store) => store.movies);
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [deletionCount, setDeletionCount] = useState(0);

  useEffect(() => {
    dispatch(getMoviesData());
  }, [dispatch, deletionCount]);

  const handleMovieUpdate = () => {
    setDeletionCount((prev) => prev + 1);
  };

  const watchedMovies = () => {
    nav("/watched");
  };

  return (
    <Box>
      <Heading mt={4} mb={6} color={"#2C5282"} textAlign={"center"}>
        MOVIES LIST
      </Heading>

      <Box>
        {status === "success" ? (
          <Box w={"90%"} margin={"auto"} mt={"1rem"}>
            <Box
              w={"95%"}
              margin={"auto"}
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"flex-end"}
              mb={4}
            >
              <AddMovieModal onAdd={handleMovieUpdate} />
              <Box m={2} p={2} textAlign={"right"} onClick={watchedMovies}>
                <Button
                  bg={"#F83B72"}
                  color={"white"}
                  p={4}
                  _hover={{ bg: "#A20F49", color: "white" }}
                >
                  Watched Movies
                  <Text as="span" fontSize={"1.2rem"} ml={2}>
                    <FaHistory />
                  </Text>
                </Button>
              </Box>
            </Box>
            <Grid templateColumns="repeat(3, minmax(300px, 1fr))" gap={6}>
              {Array.isArray(movies) &&
                movies.map((movie) => (
                  <MovieCard
                    key={movie._id}
                    movie={movie}
                    onDelete={handleMovieUpdate}
                  />
                ))}
            </Grid>
          </Box>
        ) : (
          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            w={"100%"}
            m={"auto"}
            h={"100vh"}
          >
            <Vortex
              visible={true}
              height="80"
              width="80"
              ariaLabel="vortex-loading"
              wrapperStyle={{}}
              wrapperClass="vortex-wrapper"
              colors={["#2C5282", "#2B6CB0", "#68D391", "#F6E05E", "#FC8181"]}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Home;
