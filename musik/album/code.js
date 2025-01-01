const album = getURLparams().get("album");

function goToAlbumcover() {
    window.location.href = "albumcover/?album=" + encodeURIComponent(album);
}

async function insertData() {
    let albumdata;

    // Get the album data
    await fetch('../../resources/albums/albumdata.json')
        .then((response) => response.json())
        .then((json) => albumdata = json);

    // Insert name and picture
    document.title = albumdata[album].name + " | Rummelbude";
    document.getElementById("name").innerHTML = albumdata[album].name;
    document.getElementById("albumcover").src = "../../images/albums/" + albumdata[album].id + ".jpg";

    // Insert streaming links
    document.getElementById("streamingheader").innerHTML = albumdata[album].name + " streamen";
    albumdata[album].streamingplatforms.forEach((platform, index) => {
        const button = document.createElement('button');
        button.innerHTML = platform;
        button.onclick = function() {
            window.location.href = albumdata[album].streaminglinks[index];
        };

        document.getElementById('streamingcontainer').appendChild(button);
    });

    // Insert clickable video thumbnail if a video exists
    if (albumdata[album].video.exists === true) {
        console.log("Video exists");
        const videothumbnailcontainer = document.getElementById("videothumbnailcontainer");
        const videothumbnail = document.createElement("img");
        videothumbnail.src = "../../images/albums/videothumbnails/" + albumdata[album].id + "_videothumbnail.jpg";
        videothumbnail.id = "videothumbnail";
        videothumbnail.onclick = function() {
            window.location.href = albumdata[album].video.link;
        };

        videothumbnailcontainer.appendChild(videothumbnail);

        document.getElementById("videoheader").style.display = "block";
        videothumbnailcontainer.style.display = "block";
    }

    // Insert general information
    document.getElementById("publishdate").innerHTML = albumdata[album].publishdate;
    document.getElementById("songcount").innerHTML = albumdata[album].songcount;
    document.getElementById("length").innerHTML = albumdata[album].length;
    document.getElementById("instrumental").innerHTML = albumdata[album].instrumental + " von " + albumdata[album].songcount;

    // Insert song list
    const tableBody = document.querySelector('#songtable tbody');
    albumdata[album].songs.forEach((song, index) => {
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

function getURLparams() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return(urlParams);
}

document.addEventListener("DOMContentLoaded", () => {
    insertData();
});