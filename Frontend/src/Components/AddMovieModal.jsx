import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useDisclosure,
  Box,
  Text,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { addMovie } from "../redux/actions/fetchAction";
import { MdAdd } from "react-icons/md";

const AddMovieModal = ({ onAdd }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const formattedValue = name === "releaseYear" || name === "rating" ? Number(value) : value;
    setFormData((prev) => ({ ...prev, [name]: formattedValue }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = "Title is required";
    if (!formData.description) newErrors.description = "Description is required";
    if (!formData.imageUrl) newErrors.imageUrl = "Image URL is required";
    if (!formData.genre) newErrors.genre = "Genre is required";
    if (!formData.releaseYear || formData.releaseYear.toString().length !== 4 || isNaN(formData.releaseYear)) {
      newErrors.releaseYear = "Release Year must be a 4-digit number";
    }
    if (isNaN(formData.rating) || formData.rating < 1 || formData.rating > 5) {
      newErrors.rating = "Rating must be a number between 1 and 5";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      dispatch(addMovie(formData)).then(() => {
        setFormData({});
        setErrors({});
        onAdd();
        onClose();
      });
    }
  };

  const handleCancel = () => {
    setFormData({});
    setErrors({});
    onClose();
  };

  useEffect(() => {
    setFormData({});
  }, []);

  return (
    <>
      <Box m={2} p={2} textAlign={"right"}>
        <Button
          onClick={onOpen}
          bg={"#4CBB17"}
          color={"white"}
          p={4}
          _hover={{ bg: "#008000", color: "white" }}
          leftIcon={<MdAdd />}
        >
          Add Movie
        </Button>
      </Box>

      <Modal isOpen={isOpen} onClose={handleCancel} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Movie</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={4} isInvalid={errors.title}>
              <FormLabel>Title</FormLabel>
              <Input
                name="title"
                value={formData.title || ""}
                onChange={handleChange}
                placeholder="Enter movie title"
                borderColor="gray.400"
                _hover={{ borderColor: "gray.500" }}
                _focus={{ borderColor: "#4A90E2" }}
              />
              {errors.title && <Text color="red.500">{errors.title}</Text>}
            </FormControl>

            <FormControl mb={4} isInvalid={errors.description}>
              <FormLabel>Description</FormLabel>
              <Textarea
                name="description"
                value={formData.description || ""}
                onChange={handleChange}
                placeholder="Enter movie description"
                borderColor="gray.400"
                _hover={{ borderColor: "gray.500" }}
                _focus={{ borderColor: "#4A90E2" }}
              />
              {errors.description && <Text color="red.500">{errors.description}</Text>}
            </FormControl>

            <FormControl mb={4} isInvalid={errors.releaseYear}>
              <FormLabel>Release Year</FormLabel>
              <Input
                name="releaseYear"
                value={formData.releaseYear || ""}
                onChange={handleChange}
                placeholder="Enter release year"
                borderColor="gray.400"
                _hover={{ borderColor: "gray.500" }}
                _focus={{ borderColor: "#4A90E2" }}
              />
              {errors.releaseYear && <Text color="red.500">{errors.releaseYear}</Text>}
            </FormControl>

            <FormControl mb={4} isInvalid={errors.genre}>
              <FormLabel>Genre</FormLabel>
              <Input
                name="genre"
                value={formData.genre || ""}
                onChange={handleChange}
                placeholder="Enter movie genre"
                borderColor="gray.400"
                _hover={{ borderColor: "gray.500" }}
                _focus={{ borderColor: "#4A90E2" }}
              />
              {errors.genre && <Text color="red.500">{errors.genre}</Text>}
            </FormControl>

            <FormControl mb={4} isInvalid={errors.imageUrl}>
              <FormLabel>Image URL</FormLabel>
              <Input
                name="imageUrl"
                value={formData.imageUrl || ""}
                onChange={handleChange}
                placeholder="Enter image URL"
                borderColor="gray.400"
                _hover={{ borderColor: "gray.500" }}
                _focus={{ borderColor: "#4A90E2" }}
              />
              {errors.imageUrl && <Text color="red.500">{errors.imageUrl}</Text>}
            </FormControl>

            <FormControl mb={4} isInvalid={errors.rating}>
              <FormLabel>Rating</FormLabel>
              <Input
                name="rating"
                value={formData.rating || ""}
                onChange={handleChange}
                placeholder="Enter rating (1-5)"
                borderColor="gray.400"
                _hover={{ borderColor: "gray.500" }}
                _focus={{ borderColor: "#4A90E2" }}
              />
              {errors.rating && <Text color="red.500">{errors.rating}</Text>}
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>Review</FormLabel>
              <Textarea
                name="reviews"
                value={formData.reviews || ""}
                onChange={handleChange}
                placeholder="Enter your review"
                borderColor="gray.400"
                _hover={{ borderColor: "gray.500" }}
                _focus={{ borderColor: "#4A90E2" }}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Save
            </Button>
            <Button variant="ghost" onClick={handleCancel}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddMovieModal;
