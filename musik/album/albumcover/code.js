const album = getQueryString().get("album");

function goBack() {
    window.location.href = "../?album=" + encodeURIComponent(album);
}

async function insertData() {
    let albumData;
    await fetch('../../../resources/albums/albumdata.json')
        .then((response) => response.json())
        .then((json) => albumData = json);

    document.title = albumData[album].name + "-Cover | Rummelbude";
    document.getElementById("albumcover").src = "../../../images/albums/" + albumData[album].id + ".jpg";
}

function getQueryString() {
    return(new URLSearchParams(window.location.search));
}

document.addEventListener("DOMContentLoaded", function() {
    insertData();
});