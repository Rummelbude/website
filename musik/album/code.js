const album = getQueryString().get("album");

function goToAlbumCover() {
    window.location.href = "cover/?album=" + encodeURIComponent(album);
}

async function insertData() {
    let albumData;

    // Get the album data
    await fetch('../../resources/albums/albumData.json')
        .then((response) => response.json())
        .then((json) => albumData = json);

    // Insert name and picture
    document.title = albumData[album].name + " | Rummelbude";
    document.getElementById("name").innerHTML = albumData[album].name;
    document.getElementById("albumCover").src = "../../images/albums/" + albumData[album].id + ".jpg";

    // Insert streaming links
    document.getElementById("streamingHeader").innerHTML = albumData[album].name + " streamen";
    albumData[album].streamingPlatforms.forEach((platform, index) => {
        const button = document.createElement('button');
        button.innerHTML = platform;
        button.onclick = function() {
            window.location.href = albumData[album].streamingLinks[index];
        };

        document.getElementById('streamingContainer').appendChild(button);
    });

    // Insert clickable video thumbnail if a video exists
    if (albumData[album].video.exists === true) {
        const videoThumbnailContainer = document.getElementById("videoThumbnailContainer");
        const videoThumbnail = document.createElement("img");
        videoThumbnail.src = "../../images/albums/video-thumbnails/" + albumData[album].id + "_videoThumbnail.jpg";
        videoThumbnail.id = "videoThumbnail";
        videoThumbnail.onclick = function() {
            window.location.href = albumData[album].video.link;
        };

        videoThumbnailContainer.appendChild(videoThumbnail);

        document.getElementById("videoHeader").style.display = "block";
        videoThumbnailContainer.style.display = "block";
    }

    // Insert general information
    document.getElementById("publishDate").innerHTML = albumData[album].publishDate;
    document.getElementById("songCount").innerHTML = albumData[album].songCount;
    document.getElementById("length").innerHTML = albumData[album].length;
    document.getElementById("instrumental").innerHTML = albumData[album].instrumental + " von " + albumData[album].songCount;

    // Insert song list
    const tableBody = document.querySelector('#songTable tbody');
    albumData[album].songs.forEach((song, index) => {
        const row = document.createElement('tr');

        const numberCell = document.createElement('td');
        numberCell.className = "numberCell";
        numberCell.textContent = index + 1;

        const nameCell = document.createElement('td');
        nameCell.className = "nameCell";
        nameCell.textContent = song;

        row.appendChild(numberCell);
        row.appendChild(nameCell);

        tableBody.appendChild(row);
    });
}

function getQueryString() {
    return(new URLSearchParams(window.location.search));
}

document.addEventListener("DOMContentLoaded", function() {
    insertData();
});