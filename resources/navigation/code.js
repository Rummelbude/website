function navigationControl() {
    const header = document.getElementById("header");
    const menu = document.getElementById("menu");
    const spaceAroundMenu = document.getElementById("spaceAroundMenu");

    if (menu.classList.contains('hidden')) {
        menu.classList.remove('hidden');
        menu.style.display = 'block';
        setTimeout(function () {
            menu.classList.remove('visuallyHidden');
        }, 20);

        header.classList.remove("headerWhenMenuClosed");
        header.classList.add("headerWhenMenuOpen");

        spaceAroundMenu.classList.remove("hidden");

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
    const header = document.getElementById("header");
    const spaceAroundMenu = document.getElementById("spaceAroundMenu");

    menu.classList.add('visuallyHidden');
    menu.addEventListener('transitionend', function() {
        menu.classList.add('hidden');
        menu.style.display = 'none';
    }, {
        capture: false,
        once: true,
        passive: false
    });

    header.classList.remove("headerWhenMenuOpen");
    header.classList.add("headerWhenMenuClosed");

    spaceAroundMenu.classList.add("hidden");

    menuButton.checked = false;
}

async function insertLinks() {
    let links;

    await fetch('/links/links.json')
        .then((response) => response.json())
        .then((json) => links = json);

    const insertionDiv = document.getElementById('navigationSocialMedia');
    for (const key in links) {
        if (links.hasOwnProperty(key) && key !== "website") {
            const { name, link } = links[key];

            const icon = document.createElement("img");
            icon.src = `/images/links/${name}.svg`;
            icon.classList.add("navigationPlatformIcon");
            icon.alt = name;

            const button = document.createElement("button");

            const linkElement = document.createElement("a");
            linkElement.href = link;

            button.appendChild(icon);
            linkElement.appendChild(button);
            insertionDiv.appendChild(linkElement);
        }
    }
}

async function adjustMenuPosition() {
    const header = document.getElementById("header");
    const menu = document.getElementById("menu");
    const topSpacer = document.getElementById("topSpacer");

    const menuOffset = vminToPx(4);
    const spacerAddition = vminToPx(4);

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

function debounce(func, delay) {
    let timer;
    return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(() => func.apply(this, args), delay);
    };
}

// Initialize page
document.addEventListener("DOMContentLoaded", function() {
    const checkElementsAndInitialize = setInterval(() => {
        const navSocialMedia = document.getElementById("navigationSocialMedia");
        const header = document.getElementById("header");
        const menu = document.getElementById("menu");
        const topSpacer = document.getElementById("topSpacer");
        const spaceAroundMenu = document.getElementById("spaceAroundMenu");

        if (navSocialMedia && header && menu && topSpacer && spaceAroundMenu) {
            insertLinks();
            adjustMenuPosition();
            clearInterval(checkElementsAndInitialize);

            window.addEventListener('resize', debounce(adjustMenuPosition, 100));
        }
    }, 100);
});