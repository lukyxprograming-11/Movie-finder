//STATE

const state = {
    movies: [], 
    searchQuery:"", 
    selectedMovie: null,
    homeMovies: [],

    loadingMovies: false,
    loadingDetails: false,
    loadingHome: false,

    errorMovies: null,
    errorDetails: null,
    errorHome:null,  
    
};

//DOM 
const resultcontent = document.getElementById("result-content")
const resultSection = document.getElementById("result-section")

const searchinput = document.getElementById("search-input")
const searchbutton = document.getElementById("search-button")

const overlay = document.getElementById("overlay")
const modal = document.getElementById("modal")

const homeContent = document.getElementById("home-content")
const homeSection = document.getElementById("home-section")



//API CONFIG

const BASE_URL = "https://www.omdbapi.com/";
const API_KEY = "d111d6a4"

async function fetchMovies(query){

        state.loadingMovies = true,
        state.errorMovies = null

    const requestUrl =  `${BASE_URL}?apikey=${API_KEY}&s=${query} `
    const response =  await fetch(requestUrl)
    const movieData = await response.json()


        if(movieData.Response === "False"){

            state.movies = []
            state.errorMovies = "Movie not found"
            state.loadingMovies = false
            renderResults()
            return
        }

        const validMovies = movieData.Search.filter(movie => {
            
            return movie.Poster !== "N/A" 
            
        
        } )



    const transformedMovies= validMovies.map(movie => { 
        return{

        id: movie.imdbID, 
        title: movie.Title,
        year: movie.Year, 
        poster: movie.Poster,
        type: movie.Type 
        }
         

    } )

    state.movies = transformedMovies
    state.loadingMovies = false
    renderResults()
    
}

async function fetchHomeMovies() {

    state.loadingHome = true
    state.errorHome = null

    const query = "Avengers"; 
    
    const requestUrl =  `${BASE_URL}?apikey=${API_KEY}&s=${query}`
    const response =  await fetch(requestUrl)
    const movieData = await response.json()

    if(movieData.Response === "False"){

            state.homeMovies = []
            state.errorHome = "Movie not found"
            state.loadingHome = false
            renderHomeMovies()
            return
        }
    

    const validMovies = movieData.Search.filter(movie => {
            
            return movie.Poster !== "N/A" 
            
        
        } )

        const transformedHomeMovies= validMovies.map(movie => { 
        return{

        id: movie.imdbID, 
        title: movie.Title,
        year: movie.Year, 
        poster: movie.Poster,
        type: movie.Type 
        }
         

    } )


    state.homeMovies = transformedHomeMovies 
    state.loadingHome = false
    renderHomeMovies()


}

async function fetchMovieDetails(imdbID){

        state.loadingDetails = true,
        state.errorDetails = null

        const requestUrl = `${BASE_URL}?apikey=${API_KEY}&i=${imdbID}`
        const response = await fetch(requestUrl)
        const movieDetails = await response.json()

        if(movieDetails.Response === "False"){
            state.selectedMovie = null 
            state.errorDetails = "Movie information not found"
            state.loadingDetails = false
            return
        }

        const transformedMoviesDetails = {
                    
            id: movieDetails.imdbID,
            title: movieDetails.Title,
            year: movieDetails.Year,
            poster: movieDetails.Poster,
            genre: movieDetails.Genre,
            runtime: movieDetails.Runtime,
            plot: movieDetails.Plot
}

        state.selectedMovie = transformedMoviesDetails
        state.loadingDetails = false
        

}

//RENDER

function renderMovies(){

 const filteredMovies = state.movies.filter(movie => movie.title.toLowerCase().includes(state.searchQuery.toLowerCase()))

   resultcontent.innerHTML =  filteredMovies.map((movie)=> {


        
            return `<div class="movie-card" > <h3 class="title">${movie.title}</h3> <img class="movie-poster" src="${movie.poster}"> <p class="year">${movie.year}</p> <button class="detail" data-id="${movie.id}">detail</button></div>`})
                   .join("")

                  

    
}

function renderOverlay(){

    if(state.selectedMovie === null){
        overlay.style.display= "none"
        return
    }else{
        overlay.style.display= "flex"
    }
    modal.innerHTML= ` <header class="modal-header">  <h2 class="selected-title">${state.selectedMovie.title}</h2> <button class="close">zavřít</button> </header> 
                       
                       <div class="modal-main"> <img class="modal-poster" src="${state.selectedMovie.poster}"> 
                       
                       <div class="movie-meta"> 
                       
                       <div class="meta-group"> <span class="meta-label">YEAR</span> <p>${state.selectedMovie.year}</p> </div> 

                       <div class="meta-group"> <span class="meta-label">GENRE</span> <div class="genre-list">${state.selectedMovie.genre}</div> </div>

                       <div class="meta-group"> <span class="meta-label">RUNTIME</span> <p>${state.selectedMovie.runtime}</p> </div> </div> </div>
                       
                       <div class="modal-description"> <h3>Plot</h3> <p>${state.selectedMovie.plot}</p> </div>`

}

function renderResults(){

    if(state.loadingMovies === true){
            resultcontent.innerHTML= "Searching movies"
            return

    }

    if(state.errorMovies !== null){
        resultcontent.innerHTML= "Movie not found"
        return
    }
    
    renderMovies()
}

function renderHomeMovies(){

    homeContent.innerHTML =  state.homeMovies.map((movie)=> {


        
            return `<div class="movie-card" > <h3 class="title">${movie.title}</h3> <img class="movie-poster" src="${movie.poster}"> <p class="year">${movie.year}</p> <button class="detail" data-id="${movie.id}">detail</button></div>`})
                   .join("")

}

function renderHomeResults(){
    if(state.loadingHome === true){
            homeContent.innerHTML= "Searching movies"
            return

    }

    if(state.errorHome !== null){
        homeContent.innerHTML= "Movie not found"
        return
    }

    renderHomeMovies()

}

async function executeSearch() {

     state.searchQuery = searchinput.value

     if(state.searchQuery === ""){ 

        homeSection.style.display = "block" 
        resultSection.style.display = "none"
        state.movies = [] 
        state.errorMovies = null 
        renderHomeResults() 
        return } 
        
    if(state.searchQuery !== ""){ 
        homeSection.style.display = "none"
        resultSection.style.display = "block"
        state.movies = [] 
        state.errorMovies = null 
    } 
    
    fetchMovies(state.searchQuery)

     

}



async function openMovieDetails(imdbID){

    state.loadingDetails = true
    state.errorDetails = null 

    await fetchMovieDetails(imdbID)

    
    
    state.loadingDetails = false

    if(state.selectedMovie !== null){
        renderOverlay()
    }

    

}

function handleMovieDetailClick(event){

    const detailButton = event.target.closest(".detail")
      if(!detailButton) return

      const movieId = detailButton.dataset.id

      openMovieDetails(movieId)


}



//EVENTS

searchbutton.addEventListener("click", function(){

     executeSearch()

            
})

searchinput.addEventListener("keydown", function(event){

    if(event.key === "Enter"){

          executeSearch()

    }


})



resultcontent.addEventListener("click", function(event){

      handleMovieDetailClick(event)

      
})

homeContent.addEventListener("click", function(event){

      handleMovieDetailClick(event)

      
})

overlay.addEventListener("click", function(event){
    const closeButton = event.target.closest(".close")
    if(!closeButton)return 

    state.selectedMovie = null;

    renderOverlay()

})



//INIT 
fetchHomeMovies()
renderResults()
renderOverlay()
