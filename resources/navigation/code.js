function navigationControl() {
    const menu = document.getElementById("menu");

    if (menu.classList.contains('hidden')) {
        menu.classList.remove('hidden');
        menu.style.display = 'block';
        setTimeout(function () {
            menu.classList.remove('visuallyHidden');
        }, 20);

        document.addEventListener('keydown', handleEsc);
    } else {
        hideNavigation();
    }

    function handleEsc(event) {
        if (event.key === 'Escape') {
            hideNavigation();
            document.removeEventListener('keydown', handleEsc);
        }
    }
}

function hideNavigation() {
    const menu = document.getElementById("menu");
    const menuButton = document.getElementById("headerMenuButton");

    menu.classList.add('visuallyHidden');
    menu.addEventListener('transitionend', function(e) {
        menu.classList.add('hidden');
        menu.style.display = 'none';
    }, {
        capture: false,
        once: true,
        passive: false
    });

    menuButton.checked = false;
}

async function insertLinks() {
    let links;

    await fetch('/website/links/links.json')
        .then((response) => response.json())
        .then((json) => links = json);

    const insertionDiv = document.getElementById('navigationSocialMedia');
    for (const key in links) {
        if (links.hasOwnProperty(key) && key !== "website") {
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