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

/**
 * @typedef {Object} AlbumData
 * @property {string} name
 * @property {string} id
 * @property {Object} streaming
 * @property {string} video
 * @property {boolean} video.exists
 * @property {string} video.link
 * @property {string} publishDate
 * @property {number} songCount
 * @property {string} length
 * @property {number} instrumental
 * @property {string[]} songs
 */

async function insertData() {
    const albumData = await getAlbumData(album);

    await insertNameAndPicture();

    // Streaming section
    await insertStreamingLinks();
    if (albumData.video !== "") {
        insertVideoThumbnail();
    }
    document.getElementById("streamingSection").classList.remove("albumPageContentHidden");

    // General information
    insertGeneralInformation();

    // Songs
    insertSongList();

    // Show footer
    document.getElementById("footer").style.display = "block";



    // Functions
    async function insertNameAndPicture() {
        document.title = albumData.name + " | Rummelbude";
        document.getElementById("name").innerHTML = ` > ${albumData.name}`;
        await adjustMenuPosition();
        document.getElementById("albumCover").src = `../../images/albums/${albumData.id}.jpg`;
        document.getElementById("albumCover").classList.remove("albumPageContentHidden");
        document.getElementById("biggerAlbumHint").classList.remove("albumPageContentHidden");
    }
    async function insertStreamingLinks() {
        document.getElementById("streamingHeader").innerHTML = albumData.name + " streamen";
        const streamingLogos = await getAvailableStreamingLogos();

        if (Object.keys(albumData.streaming).length === 0) {
            const infoMessage = document.createElement("p");
            infoMessage.innerHTML = `${albumData.name} ist nicht mehr oder noch nicht zum Streamen verfügbar.`;
            infoMessage.id = "streamingInfoMessage";
            infoMessage.classList.add("textBottom");
            document.getElementById('streamingContainer').appendChild(infoMessage);
        } else {
            Object.entries(albumData.streaming).forEach(([platform, url]) => {
                const button = document.createElement('button');

                if (streamingLogos[platform]) {
                    const logo = document.createElement('img');
                    logo.src = "../../images/links/" + streamingLogos[platform];
                    logo.classList.add("streamingButtonWithLogo");
                    button.style.fontSize = "smaller";

                    button.appendChild(logo);
                }

                const buttonText = document.createElement('span');
                buttonText.innerText = platform;
                button.appendChild(buttonText);

                const a = document.createElement('a');
                a.href = url.toString();
                a.target = "_blank";
                a.appendChild(button);

                document.getElementById('streamingContainer').appendChild(a);
            });
        }
    }
    function insertVideoThumbnail() {
        const videoThumbnailContainer = document.getElementById("videoThumbnailContainer");
        const videoThumbnail = document.createElement("img");
        videoThumbnail.src = "../../images/albums/video-thumbnails/" + albumData.id + "_videoThumbnail.jpg";
        videoThumbnail.id = "videoThumbnail";
        videoThumbnail.alt = "Video Thumbnail";
        videoThumbnail.onclick = function () {
            window.location.href = albumData.video;
        };

        videoThumbnailContainer.appendChild(videoThumbnail);

        document.getElementById("videoHeader").style.display = "block";
        videoThumbnailContainer.style.display = "block";
    }
    function insertGeneralInformation() {
        document.getElementById("publishDate").innerHTML = albumData.publishDate;
        document.getElementById("songCount").innerHTML = albumData.songCount;
        document.getElementById("length").innerHTML = albumData.length;
        document.getElementById("instrumental").innerHTML = albumData.instrumental + " von " + albumData.songCount;
        document.getElementById("generalInfos").classList.remove("albumPageContentHidden");
    }
    function insertSongList() {
        const tableBody = document.querySelector('#songTable tbody');
        albumData.songs.forEach((song, index) => {
            const row = document.createElement('tr');

            const numberCell = document.createElement('td');
            numberCell.className = "numberCell";
            numberCell.textContent = (index + 1).toString();

            const nameCell = document.createElement('td');
            nameCell.className = "nameCell";
            nameCell.textContent = song;

            row.appendChild(numberCell);
            row.appendChild(nameCell);

            tableBody.appendChild(row);
        });
        document.getElementById("songs").classList.remove("albumPageContentHidden");
    }
}

function getQueryString() {
    return(new URLSearchParams(window.location.search));
}

async function getAvailableStreamingLogos() {
    const response = await fetch('../../resources/albums/streamingLogos.json');
    return await response.json();
}

document.addEventListener("DOMContentLoaded", function() {
    const checkElementsAndContinue = setInterval(async () => {
        const albumCover = document.getElementById("albumCover");
        const biggerAlbumHint = document.getElementById("biggerAlbumHint");
        const streamingSection = document.getElementById("streamingSection");
        const generalInfos = document.getElementById("generalInfos");
        const songs = document.getElementById("songs");
        const footer = document.getElementById("footer");

        if (albumCover && biggerAlbumHint && streamingSection && generalInfos && songs && footer) {
            clearInterval(checkElementsAndContinue);
            await insertData();
        }
    }, 100);
});