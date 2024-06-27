import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMoviesData } from '../redux/actions/fetchAction';
import { Box, Button, Grid, Heading } from "@chakra-ui/react";
import MovieCard from "../Components/MovieCard";
import { Vortex } from 'react-loader-spinner';
import { BiArrowBack } from 'react-icons/bi';

const WatchedMovies = () => {
  const { status, error, movies } = useSelector((store) => store.movies);
  const dispatch = useDispatch();
  const nav = useNavigate();

  const [watched, setWatched] = useState([]);

  useEffect(() => {
    dispatch(getMoviesData()).then(() => {
      setWatched(movies.filter((e) => e.watchStatus === true));
    });
  }, [dispatch, movies]);

  return (
    <Box p={4}>
      <Heading mt={2} color={'#FF6347'}>Watched History</Heading>
      <Box display={'flex'} justifyContent={'flex-start'} alignItems={'flex-start'} mt={4}>
        <Button 
          leftIcon={<BiArrowBack />}  
          bg={"#1E90FF"} 
          color={"white"} 
          p={4} 
          _hover={{ bg: "#4682B4" }} 
          onClick={() => nav('/')}
        >
          Back
        </Button>
      </Box>
      <Box mt={4}>
        {watched.length > 0 ? (
          <Box w={"90%"} margin={"auto"} mt={"1rem"}>
            <Grid templateColumns="repeat(3, minmax(300px, 1fr))" gap={6}>
              {watched.map((movie) => (
                <MovieCard key={movie._id} movie={movie} watched={true} />
              ))}
            </Grid>
          </Box>
        ) : (
          <Box display={'flex'} justifyContent={'center'} alignItems={'center'} w={'100%'} m={'auto'} h={'100vh'}>
            <Vortex
              visible={true}
              height="80"
              width="80"
              ariaLabel="vortex-loading"
              wrapperStyle={{}}
              wrapperClass="vortex-wrapper"
              colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default WatchedMovies;
