const album = getQueryString().get("album");

function goToAlbumCover() {
    window.location.href = "cover/?album=" + encodeURIComponent(album);
}

async function getAlbumData(album) {
    const response = await fetch('../../resources/albums/albumData.json');
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const json = await response.json();
    if (!json[album]) window.location.href = "../";

    return json[album];
}

async function insertData() {
    const albumData = await getAlbumData(album);

    // Insert name and picture
    document.title = albumData.name + " | Rummelbude";
    document.getElementById("name").innerHTML = albumData.name;
    document.getElementById("albumCover").src = "../../images/albums/" + albumData.id + ".jpg";
    document.getElementById("albumCover").classList.remove("albumPageContentHidden");
    document.getElementById("biggerAlbumHint").classList.remove("albumPageContentHidden");

    // Streaming section

    // Insert streaming links
    document.getElementById("streamingHeader").innerHTML = albumData.name + " streamen";
    albumData.streamingPlatforms.forEach((platform, index) => {
        const button = document.createElement('button');
        button.innerHTML = platform;
        button.onclick = function() {
            window.location.href = albumData.streamingLinks[index];
        };

        document.getElementById('streamingContainer').appendChild(button);
    });

    // Insert clickable video thumbnail if a video exists
    if (albumData.video.exists === true) {
        const videoThumbnailContainer = document.getElementById("videoThumbnailContainer");
        const videoThumbnail = document.createElement("img");
        videoThumbnail.src = "../../images/albums/video-thumbnails/" + albumData.id + "_videoThumbnail.jpg";
        videoThumbnail.id = "videoThumbnail";
        videoThumbnail.alt = "Video Thumbnail";
        videoThumbnail.onclick = function() {
            window.location.href = albumData.video.link;
        };

        videoThumbnailContainer.appendChild(videoThumbnail);

        document.getElementById("videoHeader").style.display = "block";
        videoThumbnailContainer.style.display = "block";
    }

    document.getElementById("streamingSection").classList.remove("albumPageContentHidden");


    // Insert general information
    document.getElementById("publishDate").innerHTML = albumData.publishDate;
    document.getElementById("songCount").innerHTML = albumData.songCount;
    document.getElementById("length").innerHTML = albumData.length;
    document.getElementById("instrumental").innerHTML = albumData.instrumental + " von " + albumData.songCount;
    document.getElementById("generalInfos").classList.remove("albumPageContentHidden");

    // Insert song list
    const tableBody = document.querySelector('#songTable tbody');
    albumData.songs.forEach((song, index) => {
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
    document.getElementById("songs").classList.remove("albumPageContentHidden");

    // Insert footer
    document.getElementById("footer").style.display = "block";
}

function getQueryString() {
    return(new URLSearchParams(window.location.search));
}

document.addEventListener("DOMContentLoaded", function() {
    const checkElementsAndContinue = setInterval(() => {
        const albumCover = document.getElementById("albumCover");
        const biggerAlbumHint = document.getElementById("biggerAlbumHint");
        const streamingSection = document.getElementById("streamingSection");
        const generalInfos = document.getElementById("generalInfos");
        const songs = document.getElementById("songs");
        const footer = document.getElementById("footer");

        if (albumCover && biggerAlbumHint && streamingSection && generalInfos && songs && footer) {
            insertData();
            clearInterval(checkElementsAndContinue);
        }
    }, 100);
});