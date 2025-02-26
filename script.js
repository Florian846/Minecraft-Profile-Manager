document.addEventListener('DOMContentLoaded', function() {
    loadProfiles();

    const sidebar = document.querySelector('.sidebar');
    const toggleBtn = document.querySelector('.sidebar-toggle-btn');

    // Event Listener für das Ein- und Ausfahren der Sidebar
    toggleBtn.addEventListener('click', function() {
        sidebar.classList.toggle('collapsed');
    });

    // Wenn die Sidebar eingeklappt ist, deaktivieren wir die Buttons
    sidebar.addEventListener('transitionend', function() {
        const buttons = sidebar.querySelectorAll('.btn');
        if (sidebar.classList.contains('collapsed')) {
            buttons.forEach(button => {
                button.style.pointerEvents = 'none'; // Buttons deaktivieren
                button.style.opacity = '0.5'; // Buttons weniger sichtbar machen
            });
        } else {
            buttons.forEach(button => {
                button.style.pointerEvents = 'auto'; // Buttons aktivieren
                button.style.opacity = '1'; // Buttons normal sichtbar machen
            });
        }
    });
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
            let selectedProfile = document.getElementById('selected-profile');

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

                // Klick-Event für das Dropdown-Element
                profileItem.addEventListener('click', function() {
                    // Gewähltes Profil im Button anzeigen
                    selectedProfile.innerHTML = '';
                    let selectedImg = document.createElement('img');
                    selectedImg.src = imgSrc;
                    selectedImg.alt = name;
                    let selectedText = document.createElement('span');
                    selectedText.textContent = name;

                    selectedProfile.appendChild(selectedImg);
                    selectedProfile.appendChild(selectedText);
                });
            }
        })
        .catch(error => console.log('Error loading XML:', error));
}

// Todo ein ausfahren mit pfeil drehung animation
// Todo einbauen des config buttons mit dem Bild gear.png

//