function navigationControl() {
    const header = document.getElementById("header");
    const menu = document.getElementById("menu");

    if (menu.classList.contains('hidden')) {
        menu.classList.remove('hidden');
        menu.style.display = 'block';
        setTimeout(function () {
            menu.classList.remove('visuallyHidden');
        }, 20);

        header.style.borderBottomLeftRadius = "0";
        header.style.borderBottomRightRadius = "0";

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
    menu.addEventListener('transitionend', function() {
        menu.classList.add('hidden');
        menu.style.display = 'none';
    }, {
        capture: false,
        once: true,
        passive: false
    });

    header.style.borderBottomLeftRadius = "0.5em";
    header.style.borderBottomRightRadius = "0.5em";

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

    adjustMenuPosition();
}

async function adjustMenuPosition() {
    const header = document.getElementById("header");
    const menu = document.getElementById("menu");
    const topSpacer = document.getElementById("topSpacer");

    const menuOffset = vminToPx(4);
    const spacerAddition = vminToPx(8);

    menu.style.top = `${header.offsetHeight + menuOffset}px`;
    topSpacer.style.height = `${header.offsetHeight + spacerAddition}px`;
}

function vminToPx(vminValue) {
    const tempElement = document.createElement("div");

    tempElement.style.height = `${vminValue}vmin`;
    tempElement.style.position = "absolute";
    tempElement.style.visibility = "hidden";

    document.body.appendChild(tempElement);
    const pxValue = tempElement.offsetHeight;
    document.body.removeChild(tempElement);

    return pxValue;
}

document.addEventListener("DOMContentLoaded", function() {
    insertLinks();
});