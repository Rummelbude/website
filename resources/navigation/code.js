function navigationControl(display) {
    document.getElementById("menu").style.display = display;

    function handleEsc(event) {
        if (event.key === 'Escape') {
            document.getElementById("menu").style.display = "none";
            document.removeEventListener('keydown', handleEsc);
        }
    }

    if (display === "block") {
        document.addEventListener('keydown', handleEsc);
    }
}

async function insertLinks() {
    let links;

    await fetch('/website/links/links.json')
        .then((response) => response.json())
        .then((json) => links = json);

    const insertionDiv = document.getElementById('navigationSocialMedia');
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

document.addEventListener("DOMContentLoaded", function() {
    insertLinks();
});