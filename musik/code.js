async function loadAlbums() {
    try {
        const response = await fetch('album/albumdata.json');
        const albums = await response.json();

        const container = document.getElementById('albumsContainer');

        for (let albumName in albums) {
            const album = albums[albumName];

            // Create the <a> element with the link
            const albumLink = document.createElement('a');
            albumLink.href = `album/?album=${albumName.toLowerCase()}`; // convert albumName to lowercase for URL

            // Create the <img> element
            const albumImage = document.createElement('img');
            albumImage.classList.add('albums');
            albumImage.id = album.name; // e.g., "LOST"
            albumImage.src = `../images/albums/200x200/${album.id}_200x200.jpg`; // image source
            albumImage.alt = album.name; // image alt text

            // Append the image to the link, then the link to the container
            albumLink.appendChild(albumImage);
            container.appendChild(albumLink);
        }
    } catch (error) {
        console.error("Error loading albums:", error);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    loadAlbums();
});