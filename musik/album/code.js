function redirect(url) {
    window.location.href = url;
}

async function insertData() {
    let albumdata;
    let album;

    // Get the album data
    await fetch('./albumdata.json')
        .then((response) => response.json())
        .then((json) => albumdata = json);
    album = getURLparams().get("album");

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
            redirect(albumdata[album].streaminglinks[index]);
        };

        document.getElementById('streamingcontainer').appendChild(button);
        document.getElementById('streamingcontainer').appendChild(document.createElement("br"));
    });

    // Insert general information
    document.getElementById("publishdate").innerHTML = albumdata[album].publishdate;
    document.getElementById("songcount").innerHTML = albumdata[album].songcount;
    document.getElementById("length").innerHTML = albumdata[album].length;
    document.getElementById("instrumental").innerHTML = albumdata[album].instrumental + "/" + albumdata[album].songcount;

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

insertData()
