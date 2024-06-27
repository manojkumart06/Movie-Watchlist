import React, { useEffect, useState } from 'react';
import { Box, Button, Heading, Text, Image, IconButton, Modal, ModalOverlay, ModalContent, ModalBody, Textarea, ModalFooter, ModalHeader } from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteMovie, getMoviesData, reviewUpdate, toggleWatchStatus } from '../redux/actions/fetchAction';
import { BiArrowBack, BiTrash } from 'react-icons/bi';
import { TbEyeUp, TbEyeX } from 'react-icons/tb';
import { LuFileEdit } from "react-icons/lu";
import StarRatings from '../Components/StarRatings';
import EditMovieModal from '../Components/EditMovieModal';
import { Vortex } from 'react-loader-spinner';

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { status, error, movies } = useSelector((store) => store.movies);

  const [isOpen, setIsOpen] = useState(false);
  const [reviewText, setReviewText] = useState('');

  const movie = movies.find((e) => e._id === id);

  useEffect(() => {
    dispatch(getMoviesData());
  }, [dispatch]);

  const handleDelete = () => {
    dispatch(deleteMovie(id)).then(() => {
      navigate('/');
    });
  };

  const handleToggleWatchStatus = () => {
    dispatch(toggleWatchStatus(id, !movie.watchStatus));
  };

  const handleReview = () => {
    setIsOpen(true);
    setReviewText(movie.reviews || '');
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleSubmitReview = () => {
    dispatch(reviewUpdate(id, { "reviews": reviewText })).then(() => {
      setIsOpen(false);
      window.location.reload(); 
    });
  };

  return (
    <Box p={4}>
      {movie ? (
        <>
          <Heading color={'#FF6347'}>{movie.title}</Heading>
          <Box display={'flex'} justifyContent={'flex-start'} alignItems={'flex-start'}>
            <Button leftIcon={<BiArrowBack />} bg={"#1E90FF"} color={"white"} p={4} _hover={{ bg: "#4682B4" }} onClick={() => navigate('/')}>
              Back
            </Button>
          </Box>
          <Box display="flex" flexDirection={{ base: 'column', md: 'row' }} mt={4} gap={6}>
            <Box flex={1}>
              <Image width={'100%'} height={'400px'} objectFit={'fill'} src={movie.imageUrl} alt={movie.title} borderRadius="md" />
            </Box>
            <Box display={'flex'} flex={2} flexDirection={'column'} gap={5}>
              <Box display={'flex'} justifyContent={'flex-start'} alignItems={'center'} gap={8}>
                <Text fontSize={'1rem'} color={'#32CD32'} fontWeight={'bold'}>Release Year:</Text>
                <Text fontSize={'1rem'} color={'#228B22'} fontWeight={'bold'}>{movie.releaseYear}</Text>
              </Box>
              <Box display={'flex'} justifyContent={'flex-start'} alignItems={'center'} gap={7}>
                <Text fontSize={'1rem'} color={'#32CD32'} fontWeight={'bold'}>Movie Genre:</Text>
                <Text fontSize={'1rem'} color={'#228B22'} fontWeight={'bold'}>{movie.genre}</Text>
              </Box>
              <Box display={'flex'} justifyContent={'flex-start'} gap={10}>
                <Text fontSize={'1rem'} color={'#32CD32'} fontWeight={'bold'}>Description:</Text>
                <Text fontSize={'1rem'} textAlign={'justify'} color={'#228B22'} fontWeight={'bold'}>{movie.description}</Text>
              </Box>
              <Box display={'flex'} justifyContent={'flex-start'} alignItems={'center'} gap={7}>
                <Text fontSize={'1rem'} color={'#32CD32'} fontWeight={'bold'}>Watch Status:</Text>
                <IconButton
                  icon={movie.watchStatus ? <TbEyeUp /> : <TbEyeX />}
                  bg={movie.watchStatus ? '#32CD32' : '#FF6347'}
                  color={'white'}
                  _hover={{ bg: movie.watchStatus ? '#228B22' : '#FF4500' }}
                  onClick={handleToggleWatchStatus}
                />
              </Box>
              <Box display={'flex'} justifyContent={'flex-start'} alignItems={'center'} gap={20}>
                <Text fontSize={'1rem'} color={'#32CD32'} fontWeight={'bold'}>Rating:</Text>
                <StarRatings value={movie.rating} />
              </Box>
              <Box display={'flex'} justifyContent={'flex-start'} alignItems={'center'} gap={20}>
                <Text fontSize={'1rem'} color={'#32CD32'} fontWeight={'bold'}>Reviews:</Text>
                <Text fontSize={'1rem'} textAlign={'justify'} color={'#228B22'} fontWeight={'bold'}>
                  {movie.reviews || "No reviews available."}
                  <IconButton
                    icon={<LuFileEdit />}
                    ml={5}
                    bg={'#32CD32'}
                    color={'white'}
                    _hover={{ bg: '#228B22' }}
                    onClick={handleReview}
                  />
                </Text>
              </Box>
              <Box mt={4} display="flex" gap={6}>
                <EditMovieModal movie={movie} />
                <Button leftIcon={<BiTrash />} bg={"#FF6347"} color={"white"} _hover={{ bg: "#FF4500" }} onClick={handleDelete}>
                  Delete
                </Button>
              </Box>
            </Box>
          </Box>
        </>
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

      {/* Review Modal */}
      <Modal isOpen={isOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Review</ModalHeader>
          <ModalBody>
            <Textarea value={reviewText} onChange={(e) => setReviewText(e.target.value)} placeholder="Enter your review here..." />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmitReview}>
              Save
            </Button>
            <Button onClick={handleCloseModal}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default MovieDetails;
