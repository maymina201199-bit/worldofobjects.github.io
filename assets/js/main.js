// Store all loaded catalogue data globally
let allData = [];

// Load the JSON file from the assets/data folder
fetch('assets/data/catalogmina_new.json')
    .then(response => {

        console.log('JSON response:', response);

        if (!response.ok) {
            throw new Error('JSON file could not be loaded');
        }

        return response.json();
    })
    .then(data => {

        console.log('Loaded JSON data:', data);

        allData = data;

        // Render catalogue cards in random order
        renderKatalog(shuffleArray(allData));
    })
    .catch(error => {

        console.error('Error loading JSON:', error);

        const katalog = document.getElementById('katalog');

        if (katalog) {
            katalog.innerHTML = '<div class="loading">Error loading data</div>';
        }
    });


// Render catalogue items into the HTML page
function renderKatalog(items) {

    const katalog = document.getElementById('katalog');

    console.log('Catalogue container:', katalog);

    if (!katalog) {
        console.error('Element with id="katalog" was not found');
        return;
    }

    if (!Array.isArray(items)) {
        console.error('Expected an array, but got:', items);
        katalog.innerHTML = '<div class="loading">Invalid data format</div>';
        return;
    }

    console.log('Number of catalogue items:', items.length);

    let html = '';

    for (let i = 0; i < items.length; i++) {

        const item = items[i];

        console.log('Rendering item:', i, item);

        const imagePath = item['@image'] || '';
        const fileName = item['File name'] || '';
        const details = item.details || item.Details || '';

        html += `
            <div class="card">

                <div class="card-image">
                    <img 
                        src="${imagePath}" 
                        alt="${fileName}"
                        onerror="this.closest('.card').remove();"
                    >
                </div>

                <div class="card-content">

                    <div class="card-details">
                        ${details}
                    </div>

                </div>

            </div>
        `;
    }

    console.log('Generated HTML:', html);

    katalog.innerHTML = html;
}


// Randomize catalogue order
function shuffleArray(array) {
    const shuffled = [...array];

    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        const temp = shuffled[i];
        shuffled[i] = shuffled[j];
        shuffled[j] = temp;
    }

    return shuffled;
}