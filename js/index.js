let movieTitleRef = document.getElementById("movie-title");
let searchBtn = document.getElementById("search-btn");
let result = document.getElementById("result");

let getMovie = () => {
    let movieTitle = movieTitleRef.value;
    let url = `https://www.omdbapi.com/?t=${movieTitle}&apikey=${key}`;

    // Si le champ input est vide
    if(movieTitle.length <= 0) {
        result.innerHTML = `<h3 class="msg">Veuillez entrer le titre du film</h3>`
    }
    else {
        fetch(url).then((response) => response.json()).then((data) => {
            // Si le film existe
            if(data.Response == "True") {
                result.innerHTML = `
                    <div class="info">
                        <div>
                            <h2>${data.Title}</h2>
                            <div class="rating">
                                <img src="assets/star-icon.svg" alt="star">
                                <h4>${data.imdbRating}</h4>
                            </div>
                            <div class="details">
                                <span>${data.Rated}</span>
                                <span>${data.Year}</span>
                                <span>${data.Runtime}</span>
                            </div>
                            <div class="genre">
                                <div>${data.Genre.split(",").join("</div><div>")}</div>
                            </div>
                            <div class="content">
                                <h3>Plot :</h3>
                                <p>${data.Plot}</p>
                                <h3>Cast :</h3>
                                <p>${data.Actors}</p>
                            </div>
                        </div>
                        <img src=${data.Poster} class="poster">
                    </div>
                `
            }
            // Si le film n'éxiste pas
            else {
                result.innerHTML = `<h3 class="msg">${data.Error}</h3>`
            }
        }).catch(() => {
            result.innerHTML = `<h3 class="msg">Il y a eu une erreur</h3>`
        })
    }
}

searchBtn.addEventListener("click", getMovie);
window.addEventListener("load", getMovie);