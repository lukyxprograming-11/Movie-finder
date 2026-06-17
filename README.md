# Movie Finder

A movie search application built with HTML, CSS, vanilla JavaScript and the OMDb API.

## Overview

Movie Finder is a frontend project where users can search for movies and open a modal with movie details.

I built this project to practice:

* Working with APIs
* Async JavaScript
* State management
* Loading and error handling
* Render flow
* Frontend architecture
* Separating logic into API, state, render and event layers

---

## Features

* Search movies using the OMDb API
* Display movie cards in a CSS Grid layout
* Open movie details in a modal window
* Loading states
* Error handling
* Empty input validation
* Event delegation
* Data transformation before rendering
* State-driven rendering

---

## Tech Stack

* HTML5
* CSS3
* Vanilla JavaScript (ES6+)
* OMDb API

---

## State Structure

The application uses a simple state object.

Current state:

* movies
* selectedMovie
* searchQuery
* loadingMovies
* loadingDetails
* errorMovies
* errorDetails

---

## Application Flow

User Action
↓
Validation
↓
Async Request
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
* The UI is rendered again after the state changes.
* Search requests and detail requests have separate loading and error states.
* `state.movies` is the source of truth for movie cards.
* `state.selectedMovie` is the source of truth for the movie modal.
* API data is transformed before it is saved in the state.

---

## Current Status

* Desktop version completed
* Search endpoint completed
* Detail endpoint completed
* Basic UI and CSS completed

---

## Planned Improvements

* Tablet layout
* Mobile layout
* Genre filtering
* Movie sorting
* Placeholder images for missing posters
* Genre badges
* More UI improvements and animations

---

## Learning Goals

This project was created to move from smaller CRUD applications to more realistic frontend applications that use:

* Async/API flow
* Larger UI composition
* Multiple views
* State consistency
* Render pipelines
* Architecture-focused problem solving
