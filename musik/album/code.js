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
}

function getURLparams() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return(urlParams);
}

replace()