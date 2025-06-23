async function insertData() {
    let links;

    // Get the album data
    await fetch('./links.json')
        .then((response) => response.json())
        .then((json) => links = json);

    const generalDiv = document.getElementById('generalLinks');
    const musicServicesDiv = document.getElementById('musicServicesLinks');

    // Function to create buttons and append them to a target div
    const createButtons = (category, targetDiv) => {
        for (const key in links[category]) {
            const linkObj = links[category][key];

            const button = document.createElement('button');

            console.log(key);
            const logo = document.createElement('img');
            logo.src = `../images/links/${key}.svg`;
            logo.classList.add("streamingButtonWithLogo");
            button.style.fontSize = "smaller";
            button.appendChild(logo);

            const buttonText = document.createElement('span');
            buttonText.innerText = linkObj.name;
            button.appendChild(buttonText);

            const a = document.createElement('a');
            a.href = linkObj.link.toString();
            a.target = "_blank";
            a.appendChild(button);

            targetDiv.appendChild(a);
        }
    };

    // Create buttons for each category
    createButtons('general', generalDiv);
    createButtons('music-services', musicServicesDiv);
}

document.addEventListener("DOMContentLoaded", function() {
    insertData();
});
