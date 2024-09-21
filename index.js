let searchInputEl = document.getElementById("searchInput")
let selectDisplayCountEl = document.getElementById("selectDisplayCount")
let searchResultsEl = document.getElementById("searchResults")
let textEl = document.getElementById("text")

let spinnerEl = document.getElementById("spinner");



function createAndAppend(result) {


    textEl.textContent = "Popular Books"

    let {
        title,
        imageLink,
        author
    } = result

    let itemEl = document.createElement("div")
    itemEl.classList.add("col-6")
    searchResultsEl.appendChild(itemEl)



    let imageEl = document.createElement("img")
    imageEl.src = imageLink
    imageEl.classList.add("w-100")
    itemEl.appendChild(imageEl)
    let brEl = document.createElement("br")
    itemEl.appendChild(brEl)
    let authorEl = document.createElement("p")
    authorEl.textContent = author
    authorEl.classList.add("p-3")
    itemEl.appendChild(authorEl)



}


function displayResults(search_results) {
    spinnerEl.classList.add("d-none");
    for (let result of search_results) {

        createAndAppend(result)
    }
}


function searchBooks(event) {
    let selectDisplayCount = selectDisplayCountEl.value
    let searchInput = searchInputEl.value

    spinnerEl.classList.remove("d-none");
    searchResultsEl.textContent = "";

    if (event.key === "Enter") {
        let url = "https://apis.ccbp.in/book-store?title=" + searchInput + "&maxResults=" + selectDisplayCount
        let options = {
            method: "GET"

        }
        fetch(url, options)
            .then(function(response) {
                return response.json()
            })
            .then(function(jsonData) {
                console.log(jsonData)

                let {
                    search_results
                } = jsonData
                console.log(search_results)

                if (search_results.length === 0) {
                    console.log(search_results)
                    textEl.textContent = "No Results Found"

                } else {
                    displayResults(search_results)

                }


            })
    }
}

selectDisplayCountEl.addEventListener("change", function() {
    let selectDisplayCount = selectDisplayCountEl.value
    let searchInput = searchInputEl.value

    spinnerEl.classList.remove("d-none");
    searchResultsEl.textContent = "";



    let url = "https://apis.ccbp.in/book-store?title=" + searchInput + "&maxResults=" + selectDisplayCount
    let options = {
        method: "GET"

    }
    fetch(url, options)
        .then(function(response) {
            return response.json()
        })
        .then(function(jsonData) {
            console.log(jsonData)
            let {
                search_results
            } = jsonData
            console.log(search_results)
            displayResults(search_results)
        })
})
searchInputEl.addEventListener("keydown", searchBooks)
