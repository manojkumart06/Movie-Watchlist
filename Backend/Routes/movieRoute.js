import express from 'express';
import Movie from '../Modal/movieSchema.js';

const movieRouter = express.Router();

// Getting all the movies
movieRouter.get("/", async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Getting a movie by ID
movieRouter.get("/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: "Movie is not found" });
    }
    res.json(movie);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new movie
movieRouter.post("/", async (req, res) => {
  const movie = new Movie({
    title: req.body.title,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    releaseYear: req.body.releaseYear,
    genre: req.body.genre,
    watchStatus: req.body.watchStatus,
    rating: req.body.rating,
    reviews: req.body.reviews,
  });

  try {
    const newMovie = await movie.save();
    res.status(201).json(newMovie);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Updating a movie
movieRouter.put("/:id", async (req, res) => {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedMovie)
      return res.status(404).json({ message: "Movie is not found" });
    res.json(updatedMovie);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a movie
movieRouter.delete("/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: "Movie is not found" });
    }
    await Movie.findByIdAndDelete(req.params.id);
    res.json({ message: "Movie deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Mark as watched/unwatched
movieRouter.patch("/:id/watchStatus", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: "Movie is not found" });
    movie.watchStatus = req.body.watchStatus;
    await movie.save();
    res.json(movie);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Add/Edit rating and review
movieRouter.patch("/:id/review", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: "Movie is not found" });
    movie.reviews = req.body.reviews;
    await movie.save();
    res.json(movie);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default movieRouter;
