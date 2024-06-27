import React from "react";
import {
  Box,
  Heading,
  Text,
  Button,
  useDisclosure,
  Image,
  Flex,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { BiTrash, BiStar } from "react-icons/bi";
import { VscFeedback } from "react-icons/vsc";
import { MdEditNote } from "react-icons/md";
import { TbEyeglass, TbEyeglassOff } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import StarRatings from "./StarRatings";
import EditMovieModal from "./EditMovieModal";
import { deleteMovie, toggleWatchStatus } from "../redux/actions/fetchAction";

const MovieCard = ({ movie, onDelete, watched }) => {
  const { title, description, imageUrl, releaseYear, genre, watchStatus, rating, reviews, _id } = movie;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDelete = () => {
    dispatch(deleteMovie(_id)).then(() => {
      onDelete(); // Re-fetch the movies data
    });
  };

  const handleToggleWatchStatus = () => {
    dispatch(toggleWatchStatus(_id, !watchStatus)).then(() => {
      onDelete(); // Re-fetch the movies data
    });
  };

  const handleCardClick = () => {
    navigate(`/${_id}`);
  };

  return (
    <Box
      w={"100%"}
      maxW="sm"
      bg="white"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="lg"
      transition="all 0.3s"
      _hover={{ transform: "scale(1.05)", boxShadow: "xl" }}
    >
      <Box
        w={"100%"}
        position="relative"
        pb="96.25%"
        cursor="pointer"
        onClick={handleCardClick}
      >
        <Image
          src={imageUrl}
          alt={title}
          objectFit=""
          w="100%"
          h="100%"
          position="absolute"
          top={0}
          left={0}
        />
      </Box>

      <Box p={4}>
        <Flex justify="space-between" align="center" mb={2}>
          <Heading fontSize="xl" noOfLines={1}>
            {title}
          </Heading>
          <IconButton
            icon={watchStatus ? <TbEyeglass /> : <TbEyeglassOff />}
            colorScheme={watchStatus ? "blue" : "gray"}
            onClick={handleToggleWatchStatus}
            variant="outline"
            aria-label="Toggle Watch Status"
          />
        </Flex>
        <Text fontSize="sm" color="gray.500" mb={2}>
          {releaseYear} | {genre}
        </Text>
        <Flex align="center" mb={2}>
          <Text fontSize="sm" mr={2}>
            Ratings:
          </Text>
          <StarRatings value={rating} />
        </Flex>
        {!watched && (
          <Flex justify="space-around" mt={4}>
            <Button
              leftIcon={<VscFeedback   />}
              colorScheme="teal"
              variant="solid"
              _hover={{ bg: "teal.600", color: "white" }}
              onClick={onOpen}
            >
              Review
            </Button>
            <EditMovieModal movie={movie} />
            <Button
              leftIcon={<BiTrash />}
              colorScheme="red"
              variant="solid"
              _hover={{ bg: "red.600", color: "white" }}
              onClick={handleDelete}
            >
              Delete
            </Button>
          </Flex>
        )}
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Reviews</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {reviews ? (
              <Box mb={2}>
                <Text>{reviews}</Text>
              </Box>
            ) : (
              <Text>No Reviews</Text>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default MovieCard;
