async function loadAlbums() {
    try {
        const response = await fetch('../resources/albums/albumdata.json');
        const albums = await response.json();

        const container = document.getElementById('albumsContainer');

        const albumsByYear = {};

        for (let albumName in albums) {
            const album = albums[albumName];
            const publishdate = album.publishdate;
            const year = publishdate.split('.')[2];

            if (!albumsByYear[year]) {
                albumsByYear[year] = [];
            }
            albumsByYear[year].push({ albumName, ...album });
        }

        const sortedYears = Object.keys(albumsByYear).sort((a, b) => b - a);

        for (let year of sortedYears) {
            const yearDiv = document.createElement('div');
            yearDiv.className = 'contentdiv';

            const yearHeader = document.createElement('h2');
            yearHeader.textContent = year;
            yearHeader.className = 'texttop';
            yearDiv.appendChild(yearHeader);

            for (let album of albumsByYear[year]) {
                const albumLink = document.createElement('a');
                albumLink.href = `album/?album=${album.albumName.toLowerCase()}`;

                const albumImage = document.createElement('img');
                albumImage.classList.add('albums');
                albumImage.id = album.name;
                albumImage.src = `../images/albums/200x200/${album.id}_200x200.jpg`;
                albumImage.alt = album.name;

                albumLink.appendChild(albumImage);
                yearDiv.appendChild(albumLink);
            }

            container.appendChild(yearDiv);
        }
    } catch (error) {
        console.error("Error loading albums:", error);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    loadAlbums();
});