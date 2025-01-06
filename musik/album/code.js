const album = getQueryString().get("album");

function goToAlbumcover() {
    window.location.href = "albumcover/?album=" + encodeURIComponent(album);
}

async function insertData() {
    let albumData;

    // Get the album data
    await fetch('../../resources/albums/albumdata.json')
        .then((response) => response.json())
        .then((json) => albumData = json);

    // Insert name and picture
    document.title = albumData[album].name + " | Rummelbude";
    document.getElementById("name").innerHTML = albumData[album].name;
    document.getElementById("albumcover").src = "../../images/albums/" + albumData[album].id + ".jpg";

    // Insert streaming links
    document.getElementById("streamingheader").innerHTML = albumData[album].name + " streamen";
    albumData[album].streamingplatforms.forEach((platform, index) => {
        const button = document.createElement('button');
        button.innerHTML = platform;
        button.onclick = function() {
            window.location.href = albumData[album].streaminglinks[index];
        };

        document.getElementById('streamingcontainer').appendChild(button);
    });

    // Insert clickable video thumbnail if a video exists
    if (albumData[album].video.exists === true) {
        const videoThumbnailContainer = document.getElementById("videothumbnailcontainer");
        const videoThumbnail = document.createElement("img");
        videoThumbnail.src = "../../images/albums/videothumbnails/" + albumData[album].id + "_videothumbnail.jpg";
        videoThumbnail.id = "videothumbnail";
        videoThumbnail.onclick = function() {
            window.location.href = albumData[album].video.link;
        };

        videoThumbnailContainer.appendChild(videoThumbnail);

        document.getElementById("videoheader").style.display = "block";
        videoThumbnailContainer.style.display = "block";
    }

    // Insert general information
    document.getElementById("publishdate").innerHTML = albumData[album].publishdate;
    document.getElementById("songcount").innerHTML = albumData[album].songcount;
    document.getElementById("length").innerHTML = albumData[album].length;
    document.getElementById("instrumental").innerHTML = albumData[album].instrumental + " von " + albumData[album].songcount;

    // Insert song list
    const tableBody = document.querySelector('#songtable tbody');
    albumData[album].songs.forEach((song, index) => {
        const row = document.createElement('tr');

        const numberCell = document.createElement('td');
        numberCell.className = "numbercell";
        numberCell.textContent = index + 1;

        const nameCell = document.createElement('td');
        nameCell.className = "namecell";
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