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

    document.title = albumdata[album].name + " | Rummelbude";
    document.getElementById("name").innerHTML = albumdata[album].name;
    document.getElementById("albumcover").src = "../../images/albums/" + albumdata[album].id + ".jpg";

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

document.write('\
\
    <div id="footer">\
            <table id="footertable">\
                <tr id="tableheading">\
                    <th>Support</th>\
                    <th>Navigation</th>\
                    <th>Rechtliches</th>\
                </tr>\
                <tr>\
                    <th><a href="mailto:sup.rummelbude_musik@gmx.de">E-Mail</a></th>\
                    <th><a href="/website/musik">Musik</a></th>\
                    <th>Copyright © 2023-2024 Rummelbude</th>\
                </tr>\
                <tr>\
                    <th><a href="/website/support">Support</a></th>\
                    <th><a href="/website/diskografie">Diskografie</a></th>\
                    <th>(sofern nicht anders angegeben)</th>\
                </tr>\
                <tr>\
                    <th></th>\
                    <th><a href="/website/support">Support</a></th>\
                </tr>\
                <tr>\
                    <th></th>\
                    <th><a href="/website/newsletter">Newsletter</a></th>\
                </tr>\
            </table>\
        </div>\
\
');