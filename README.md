# Movie Finder

A responsive movie search application built with HTML, CSS, Vanilla JavaScript and the OMDb API.

## Overview

Movie Finder is a frontend project where users can search for movies, browse popular movies on the home page and open a modal with movie details.

I created this project to practice:

* Working with APIs
* Async JavaScript
* State management
* Loading and error handling
* Render flow
* Responsive design
* Frontend architecture
* Separating logic into API, state, render and event layers

---

## Features

* Search movies using the OMDb API
* Home page with popular movies
* Responsive movie cards
* Movie details modal
* Loading states
* Error handling
* Empty input validation
* Event delegation
* Data transformation before rendering
* State-based rendering
* Responsive layout for mobile, tablet and desktop
* Home view and search view

---

## Tech Stack

* HTML5
* CSS3
* Vanilla JavaScript (ES6+)
* OMDb API

---

## State Structure

The application uses one main state object.

Current state:

* movies
* homeMovies
* selectedMovie
* searchQuery
* loadingMovies
* loadingHome
* loadingDetails
* errorMovies
* errorHome
* errorDetails

---

## Application Flow

User Action
↓
Validation
↓
API Request
↓
State Update
↓
Render
↓
UI

---

## Data Flow

API Response
↓
Data Transformation
↓
State
↓
Render
↓
UI

---

## Architecture Decisions

* API logic is separated from event logic.
* Render logic is separated from API logic.
* The UI updates after state changes.
* Search, Home and Details use separate loading and error states.
* `state.movies` is the source of truth for search results.
* `state.homeMovies` is the source of truth for the home page.
* `state.selectedMovie` is the source of truth for the movie modal.
* API data is transformed before it is saved in the state.
* Home and Search views use derived UI state.

---

## Current Status

* Responsive layout completed
* Home section completed
* Search endpoint completed
* Movie details completed
* Modal completed
* Movie Finder v1.0 completed

---

## Planned Improvements

* Watchlist feature
* Local Storage support
* Movie filtering
* Movie sorting
* Placeholder images for missing posters
* Genre badges
* More UI improvements and animations

---

## Learning Goals

This project was created to move from smaller CRUD applications to larger frontend projects that use:

* Async/API flow
* Larger UI composition
* Multiple views
* State consistency
* Render pipelines
* Architecture thinking
* Responsive design
