class Elements {
    constructor() {
        this.searchInput = document.getElementById('searchInput'); 
        this.searchButton = document.getElementById('searchButton');
        this.resultsDiv = document.getElementById('results');
    }
}

class Events {
    constructor(elements) {
        this.elements = elements;
        this.bindEvents();
    }

    bindEvents() {
        //click on search button 
        this.elements.searchButton.addEventListener('click', () => {
            this.handleSearch();
        });

        // Enter event 
        this.elements.searchInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                this.handleSearch();
            }
        });
    }

    handleSearch() {
        const searchTerm = this.elements.searchInput.value.trim();
        if (searchTerm === '') {
            console.log("Please enter something to search.");
            return;
        }

        const apiUrl = `/search?search_query=${encodeURIComponent(searchTerm)}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                // clear old image 
                this.elements.resultsDiv.innerHTML = '';

                // add new image 
                data.forEach(imageUrl => {
                    const img = document.createElement('img');
                    img.src = imageUrl;
                    img.alt = 'Search result';
                    img.loading = 'lazy'; // load ảnh khi scroll tới
                    this.elements.resultsDiv.appendChild(img);
                });
            })
            .catch(error => {
                console.error('Error fetching search results:', error);
            });
    }
}

// Initialize
const elements = new Elements();
const events = new Events(elements);