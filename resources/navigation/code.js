function navigationControl() {
    const header = document.getElementById("header");
    const menu = document.getElementById("menu");
    const spaceAroundMenu = document.getElementById("spaceAroundMenu");

    if (!header || !menu || !spaceAroundMenu) return;

    if (menu.classList.contains('hidden')) {
        showNavigation(menu, header, spaceAroundMenu, handleEsc);
    } else {
        hideNavigation(menu, header, spaceAroundMenu);
    }

    function handleEsc(event) {
        if (event.key === 'Escape') {
            hideNavigation(menu, header, spaceAroundMenu);
            document.removeEventListener('keydown', handleEsc);
        }
    }
}

function showNavigation(menu, header, spaceAroundMenu, handleEsc) {
    menu.classList.remove('hidden');
    menu.style.display = 'block';
    setTimeout(function () {
        menu.classList.remove('visuallyHidden');
    }, 20);

    header.classList.remove("headerWhenMenuClosed");
    header.classList.add("headerWhenMenuOpen");

    spaceAroundMenu.classList.remove("hidden");

    document.addEventListener('keydown', handleEsc);
}

function hideNavigation(menu, header, spaceAroundMenu) {
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

    header.classList.remove("headerWhenMenuOpen");
    header.classList.add("headerWhenMenuClosed");

    spaceAroundMenu.classList.add("hidden");

    menuButton.checked = false;
}

function createLinkElement(name, link) {
    const icon = document.createElement("img");
    icon.src = `/images/links/${name}.svg`;
    icon.classList.add("navigationPlatformIcon");
    icon.alt = name;

    const button = document.createElement("button");
    button.appendChild(icon);

    const linkElement = document.createElement("a");
    linkElement.href = link;
    linkElement.target = "_blank";
    linkElement.rel = "noopener noreferrer";
    linkElement.appendChild(button);

    return linkElement;
}

async function insertLinks() {
    try {
        const response = await fetch('/links/links.json');
        const links = await response.json();

        const insertionDiv = document.getElementById('navigationSocialMedia');
        Object.entries(links.general).forEach(([key, { name, link }]) => {
            if (key !== "Website") {
                const linkElement = createLinkElement(name, link);
                insertionDiv.appendChild(linkElement);
            }
        });
    } catch (error) {
        console.error('Failed to insert links:', error);
    }
}

async function adjustMenuPosition() {
    const header = document.getElementById("header");
    const menu = document.getElementById("menu");
    const topSpacer = document.getElementById("topSpacer");

    if (!header || !menu || !topSpacer) return;

    const menuOffset = convertToPx(4, "vmin");
    const spacerAddition = convertToPx(4, "vmin");

    menu.style.top = `${header.offsetHeight + menuOffset}px`;
    topSpacer.style.height = `${header.offsetHeight + spacerAddition}px`;
}

function convertToPx(value, unit) {
    const tempElement = document.createElement("div");

    tempElement.style.height = `${value}${unit}`;
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

        if (!(navSocialMedia && header && menu && topSpacer && spaceAroundMenu)) return;

        void insertLinks();
        void adjustMenuPosition();
        clearInterval(checkElementsAndInitialize);
        window.addEventListener('resize', debounce(adjustMenuPosition, 100));
    }, 100);
});
