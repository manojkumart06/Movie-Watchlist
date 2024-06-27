import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import MovieDetails from './pages/MovieDetails'
import WatchedMovies from './pages/WatchedMovies'

const AllRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="/:id" element={<MovieDetails/>} />
        <Route path="/watched" element={<WatchedMovies/>} />

    </Routes>
  )
}

export default AllRoutes;