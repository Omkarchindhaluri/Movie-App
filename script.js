
var inputElement = document.getElementById("movie-name")
var searchButton = document.getElementById("search-btn")
var moviesWrapper = document.getElementById("movies-wrapper")
var resultDiv = document.getElementById("result-div")
var loaderDiv = document.getElementById("loader")

searchButton.onclick = function(){
    if(inputElement.value !== ""){

    resultDiv.innerHTML = "";
    
     moviesWrapper.innerHTML = "";

    loaderDiv.innerText = "Loading..."

    var http = new XMLHttpRequest()

    http.onreadystatechange = function(){
        

        if(this.readyState == 4){

            loaderDiv.innerText = "";

            inputElement.value = "";

            var result = JSON.parse(this.responseText)

            if( result.Response == "True"){
                var movies = result.Search
                resultDiv.innerText = "Total Results :" + movies.length;
                for(var i = 0; i < movies.length; i++){
                    //poster, title, release year, type
                    var movieCard = document.createElement("div")
                    movieCard.className = "movie-card"
                    var movieImage = document.createElement("img")
                    movieImage.src = movies[i].Poster
                    movieImage.className = "movie-image"
                    var movieTitle = document.createElement("h3")
                    movieTitle.innerText ="Title: "+ movies[i].Title;
                    var type = document.createElement("p")
                    type.innerText ="Type: " +movies[i].Type;
                    var releaseYear = document.createElement("p")
                    releaseYear.innerText ="Year: "+ movies[i].Year

                    movieCard.append(movieImage, movieTitle, type, releaseYear)

                    moviesWrapper.appendChild(movieCard)
                }
            }else{
                resultDiv.innerHTML = `404 Movie Not Found!`
                console.log("Movie is not found")
            }

            
        }
    }

    http.open("GET" , "https://www.omdbapi.com/?apikey=c951ff1&s=" + inputElement.value , true);

    http.send()
}else{
    alert("Type Something!")
}
}







