const accessKey = "wHM4xBfFPTS21X2nHWANsRmaYmC4cy8YIRRD78wTQ4Y";

const form = document.querySelector("form");
const SearchInput = document.getElementById("Search-Input");
const imageContainer = document.querySelector(".image-container");
const showmore = document.getElementById("Show-More");

let InputData = "";
let page = 1;

async function SearchImages() {
try{
    InputData = SearchInput.value;
    const Url = `https://api.unsplash.com/search/photos?page=${page}&query=${InputData}&client_id=${accessKey}`;

    const response = await fetch(Url);
    const data = await response.json();

    const results = data.results;

    if (page === 1) {
        imageContainer.textContent = "";

    }

    results.map((result) => {

        const ImageWrapper = document.createElement("div");
        ImageWrapper.classList.add("SearchResult");
        const image = document.createElement("img");
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imagelink = document.createElement("a");
        imagelink.href = result.links.html;
        imagelink.target = "_blank";
        imagelink.textContent = result.alt_description;

        ImageWrapper.appendChild(image);
        ImageWrapper.appendChild(imagelink);
        imageContainer.appendChild(ImageWrapper);

    })

        page++;

        if (page > 1) {
            showmore.style.display = "block";
        }
}
    catch(error){
        console.error(error);
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
   page = 1;
   SearchImages();

})

showmore.addEventListener('click', () => {
   
   SearchImages();
})

