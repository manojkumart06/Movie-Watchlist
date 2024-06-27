import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { updateMovieData } from "../redux/actions/fetchAction";
import { MdEditNote } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const EditMovieModal = ({ movie }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({ ...movie });
  const dispatch = useDispatch();
  const nav = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    const formattedValue =
      name === "releaseYear" || name === "rating" ? Number(value) : value;
    setFormData((prev) => ({ ...prev, [name]: formattedValue }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = "Title is required";
    if (!formData.description)
      newErrors.description = "Description is required";
    if (!formData.imageUrl) newErrors.imageUrl = "Image URL is required";
    if (!formData.genre) newErrors.genre = "Genre is required";
    if (
      !formData.releaseYear ||
      formData.releaseYear.toString().length !== 4 ||
      isNaN(formData.releaseYear)
    ) {
      newErrors.releaseYear = "Release Year must be a 4-digit number";
    }
    if (
      !formData.rating ||
      formData.rating < 1 ||
      formData.rating > 5 ||
      isNaN(formData.rating)
    ) {
      newErrors.rating = "Rating must be a number between 1 and 5";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      dispatch(updateMovieData(movie._id, formData)).then(()=>{
        onClose();
        window.location.reload();
      });
    }
  };

  const handleCancel = () => {
    setFormData({ ...movie });
    setErrors({});
    onClose();
  };

  return (
    <>
      <Button
        onClick={onOpen}
        bg={"#7F00FF"}
        color={"white"}
        p={4}
        _hover={{ bg: "#5D3FD3", color: "white" }}
      >
        <span>
          <MdEditNote />
        </span>{" "}
        Edit
      </Button>

      <Modal isOpen={isOpen} onClose={handleCancel} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Movie Details</ModalHeader>
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
                _focus={{ borderColor: "#FF6347" }}
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
                _focus={{ borderColor: "#FF6347" }}
              />
              {errors.description && (
                <Text color="red.500">{errors.description}</Text>
              )}
            </FormControl>

            <FormControl mb={4} isInvalid={errors.releaseYear}>
              <FormLabel>Release Year</FormLabel>
              <Input
                name="releaseYear"
                type="number"
                value={formData.releaseYear || ""}
                onChange={handleChange}
                placeholder="Enter release year"
                borderColor="gray.400"
                _hover={{ borderColor: "gray.500" }}
                _focus={{ borderColor: "#FF6347" }}
              />
              {errors.releaseYear && (
                <Text color="red.500">{errors.releaseYear}</Text>
              )}
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
                _focus={{ borderColor: "#FF6347" }}
              />
              {errors.genre && <Text color="red.500">{errors.genre}</Text>}
            </FormControl>

            <FormControl mb={4} isInvalid={errors.imageUrl}>
              <FormLabel>Image URL</FormLabel>
              <Input
                name="imageUrl"
                value={formData.imageUrl || ""}
                isDisabled
                placeholder="Enter image URL"
                borderColor="gray.400"
                _hover={{ borderColor: "gray.500" }}
                _focus={{ borderColor: "#FF6347" }}
              />
              {errors.imageUrl && <Text color="red.500">{errors.imageUrl}</Text>}
            </FormControl>

            <FormControl mb={4} isInvalid={errors.rating}>
              <FormLabel>Rating</FormLabel>
              <Input
                name="rating"
                type="number"
                value={formData.rating || ""}
                onChange={handleChange}
                placeholder="Enter rating (1-5)"
                borderColor="gray.400"
                _hover={{ borderColor: "gray.500" }}
                _focus={{ borderColor: "#FF6347" }}
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
                _focus={{ borderColor: "#FF6347" }}
              />
              {errors.reviews && <Text color="red.500">{errors.reviews}</Text>}
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

export default EditMovieModal;
