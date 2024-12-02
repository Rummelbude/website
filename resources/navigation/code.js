function navigationControl(display) {
    document.getElementById("menu").style.display = display;
}

async function insertData() {
    let links;

    await fetch('/website/links/links.json')
        .then((response) => response.json())
        .then((json) => links = json);

    const insertionDiv = document.getElementById('socialMediaPlatforms');
    for (const key in links) {
        if (links.hasOwnProperty(key)) {
            const { name, link } = links[key];

            const button = document.createElement("button");
            button.textContent = name;

            const linkElement = document.createElement("a");
            linkElement.href = link;

            linkElement.appendChild(button);
            insertionDiv.appendChild(linkElement);
        }
    }

}

document.addEventListener("DOMContentLoaded", () => {
    insertData();
});