const album = getURLparams().get("album");

function goback() {
    window.location.href = "../?album=" + encodeURIComponent(album);
}

async function insertData() {
    let albumdata;
    await fetch('./../albumdata.json')
        .then((response) => response.json())
        .then((json) => albumdata = json);

    document.title = albumdata[album].name + "-Cover | Rummelbude";
    document.getElementById("albumcover").src = "../../../images/albums/" + albumdata[album].id + ".jpg";
}

function getURLparams() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return(urlParams);
}

document.addEventListener("DOMContentLoaded", () => {
    insertData();
});