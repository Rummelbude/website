async function loadAlbums() {
    const response = await fetch('resources/albums/albumData.json');
    const albumData = await response.json();

    const albumsArray = Object.values(albumData);

    albumsArray.sort((a, b) => {
        const dateA = new Date(a.publishDate.split('.').reverse().join('-')); // "dd.mm.yyyy" to "yyyy-mm-dd"
        const dateB = new Date(b.publishDate.split('.').reverse().join('-'));
        return dateB - dateA; // Sort by the newest date
    });

    const newestAlbums = albumsArray.slice(0, 2);

    const albumLinks = [
        document.getElementById('albumLink1'),
        document.getElementById('albumLink2')
    ];
    const albumCovers = [
        document.getElementById('albumCover1'),
        document.getElementById('albumCover2')
    ];

    newestAlbums.forEach((album, i) => {
        albumLinks[i].href = `musik/album/?album=${album.name.toLowerCase().replace(/ /g, "-")}`;
        albumCovers[i].src = `images/albums/200x200/${album.id}_200x200.jpg`;
    });
}

document.addEventListener("DOMContentLoaded", function() {
    loadAlbums();
});