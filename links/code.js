async function insertData() {
    let links;

    // Get the album data
    await fetch('./links.json')
        .then((response) => response.json())
        .then((json) => links = json);

    const insertionDiv = document.getElementById('socialMediaPlatforms');
    for (const key in links) {
        if (links.hasOwnProperty(key)) {
            const { name, link } = links[key];

            // Create the wrapper div with the class "tablediv"
            const tableDiv = document.createElement('div');
            tableDiv.className = 'tablediv';

            // Create table
            const table = document.createElement('table');
            const tableBody = document.createElement('tbody');

            // Create row
            const row = document.createElement('tr');

            // Logo cell
            const logoCell = document.createElement('td');
            const logoLink = document.createElement('a');
            logoLink.href = link;
            logoLink.target = "_blank";
            logoLink.innerHTML = `<img src="../images/links/${name}.svg" class="platformicon" alt="${name}">`;
            logoCell.appendChild(logoLink);
            row.appendChild(logoCell);

            // Link cell
            const linkCell = document.createElement('td');
            const linkElement = document.createElement('a');
            linkElement.href = link;
            linkElement.target = "_blank";
            linkElement.textContent = name;
            linkCell.appendChild(linkElement);
            row.appendChild(linkCell);

            // Add row to table body
            const rowDiv = document.createElement('div');
            rowDiv.className = "row";
            rowDiv.appendChild(row);
            tableBody.appendChild(rowDiv);
            table.appendChild(tableBody);

            // Append the table to the tableDiv, then append the tableDiv to insertionDiv
            tableDiv.appendChild(table);
            insertionDiv.appendChild(tableDiv);
        }
    }

}

insertData();