document.addEventListener('DOMContentLoaded', function() {
    loadProfiles();
});

function loadProfiles() {
    // XML-Datei laden
    fetch('Profiles.xml')
        .then(response => response.text())
        .then(data => {
            let parser = new DOMParser();
            let xmlDoc = parser.parseFromString(data, 'text/xml');
            let profiles = xmlDoc.getElementsByTagName('profile');
            let dropdownContent = document.getElementById('dropdown-content');
            
            for (let i = 0; i < profiles.length; i++) {
                let name = profiles[i].getElementsByTagName('name')[0].childNodes[0].nodeValue;
                let imgSrc = `Profiles/${name}.png`;

                // Neues Dropdown-Element erstellen
                let profileItem = document.createElement('div');
                let img = document.createElement('img');
                img.src = imgSrc;
                img.alt = name;
                let text = document.createElement('span');
                text.textContent = name;

                profileItem.appendChild(img);
                profileItem.appendChild(text);
                dropdownContent.appendChild(profileItem);
            }
        })
        .catch(error => console.log('Error loading XML:', error));
}
