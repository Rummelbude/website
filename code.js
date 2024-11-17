// Load JSON file and populate the #albumsContainer
async function loadAlbums() {
    const response = await fetch('resources/albums/albumdata.json');
    const albumData = await response.json();

    const albumsArray = Object.values(albumData);

    albumsArray.sort((a, b) => {
        const dateA = new Date(a.publishdate.split('.').reverse().join('-')); // "dd.mm.yyyy" to "yyyy-mm-dd"
        const dateB = new Date(b.publishdate.split('.').reverse().join('-'));
        return dateB - dateA; // Sort by newest date
    });

    const newestAlbums = albumsArray.slice(0, 2);

    const albumsContainer = document.getElementById('albumsContainer');

    newestAlbums.forEach(album => {
        const albumCoverUrl = `images/albums/200x200/${album.id}_200x200.jpg`;
        const albumLink = `musik/album/?album=${album.name.toLowerCase().replace(/ /g, "-")}`;

        const linkElement = document.createElement('a');
        linkElement.href = albumLink;

        const imgElement = document.createElement('img');
        imgElement.src = albumCoverUrl;
        imgElement.classList.add('albums');

        linkElement.appendChild(imgElement);

        albumsContainer.appendChild(linkElement);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    loadAlbums();
});