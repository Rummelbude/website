function redirect(url) {
    window.location.href = url;
}

async function replace() {
    let albumdata;
    let album;
    await fetch('./albumdata.json')
        .then((response) => response.json())
        .then((json) => albumdata = json);

    album = getURLparams().get("album");
    console.log (album);

    document.title = albumdata[album].name + " | Rummelbude";
    document.getElementById("name").innerHTML = albumdata[album].name;
    document.getElementById("albumcover").src = "../../images/albums/200x200/" + albumdata[album].albumcover;

    document.getElementById("streamingheader").innerHTML = albumdata[album].name + " streamen";
    document.getElementById("streamingplatforms").innerHTML = albumdata[album].streamingplatforms;
    document.getElementById("streaminglinks").innerHTML = albumdata[album].streaminglinks;

    document.getElementById("publishdate").innerHTML = albumdata[album].publishdate;
    document.getElementById("songcount").innerHTML = albumdata[album].songcount;
    document.getElementById("length").innerHTML = albumdata[album].length;
    document.getElementById("instrumental").innerHTML = albumdata[album].instrumental + "/" + albumdata[album].songcount;

    document.getElementById("songs").innerHTML = albumdata[album].songs;
}

function getURLparams() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return(urlParams);
}

replace()