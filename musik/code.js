async function loadAlbums() {
    try {
        const response = await fetch('../resources/albums/albumData.json');
        const albums = await response.json();

        const container = document.getElementById('albumsContainer');

        const albumsByYear = {};

        for (let albumName in albums) {
            const album = albums[albumName];
            const publishDate = album.publishDate;
            const year = publishDate.split('.')[2];

            if (!albumsByYear[year]) {
                albumsByYear[year] = [];
            }
            albumsByYear[year].push({ albumName, ...album });
        }

        const sortedYears = Object.keys(albumsByYear).sort((a, b) => b - a);

        for (let year of sortedYears) {
            const yearDiv = document.createElement('div');
            yearDiv.className = 'contentDiv';

            const yearHeader = document.createElement('h2');
            yearHeader.textContent = year;
            yearHeader.className = 'textTop';
            yearDiv.appendChild(yearHeader);

            for (let album of albumsByYear[year]) {
                const albumLink = document.createElement('a');
                albumLink.className = 'albumLink';
                albumLink.href = `album/?album=${album.albumName.toLowerCase()}`;

                const albumImage = document.createElement('img');
                albumImage.classList.add('albums');
                albumImage.id = album.name;
                albumImage.src = `../images/albums/200x200/${album.id}_200x200.jpg`;
                albumImage.alt = album.name;

                const albumDate = document.createElement('p');
                albumDate.classList.add('albumDate');
                albumDate.id = album.name + 'date';
                const dateParts = album.publishDate.split('.');
                albumDate.textContent = `${dateParts[0]}.${dateParts[1]}.`;

                albumLink.appendChild(albumImage);
                albumLink.appendChild(albumDate);
                yearDiv.appendChild(albumLink);
            }

            container.appendChild(yearDiv);
        }
    } catch (error) {
        console.error("Error loading albums:", error);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    loadAlbums();
});