const leadersData = {
    'Biden': { image: 'images/biden.png' },
    'Draghi': { image: 'images/Draghi.png' },
    'Jinping': { image: 'images/jinping.jpg' },
    'Johnson': { image: 'images/johnson.png' },
    'Macron': { image: 'images/Macron.png' },
    'Merkel': { image: 'images/merkel.jpg' },
    'Morrison': { image: 'images/morrison.png' },
    'Suga': { image: 'images/suga.png' },
    'Trudeau': { image: 'images/Trudeau.png' },
    'Von Der Leyen': { image: 'images/vonderleyen.png' },
};

// Load a random 4 leaders when the page loads
function getRandomLeaders(number) {
    const leaderNames = Object.keys(leadersData);
    const shuffledLeaderNames = [];

    // Shuffled Array
    while (shuffledLeaderNames.length < number) {
        const randomIndex = Math.floor(Math.random() * leaderNames.length);
        const randomLeaderName = leaderNames[randomIndex];

        // Duplicate Check
        if (!shuffledLeaderNames.includes(randomLeaderName)) {
            shuffledLeaderNames.push(randomLeaderName);
        }
    }

    const selectedLeaders = {};

    // Create a new object with the selected leaders
    for (let i = 0; i < number; i++) {
        const leaderName = shuffledLeaderNames[i];
        selectedLeaders[leaderName] = leadersData[leaderName];
    }

    return selectedLeaders;
}

function addLeadersOnLoad() {
    const numberOfLeaders = 4;
    const selectedLeaders = getRandomLeaders(numberOfLeaders);

    // Add the selected leaders to the page
    addLeadersToPage(selectedLeaders);

    // mouseover tooltip 
    const leaderElements = document.querySelectorAll('.leader');
    leaderElements.forEach((leaderElement) => {
        const imgElement = leaderElement.querySelector('img');
        const leaderName = imgElement.alt;

        const tooltipElement = document.createElement('div');
        tooltipElement.className = 'tooltip';
        tooltipElement.textContent = 'Your leader is ' + leaderName;

        leaderElement.appendChild(tooltipElement);

        // event listeners for mouseover and mouseout
        leaderElement.addEventListener('mouseover', function () {
            tooltipElement.style.display = 'block';
        });

        leaderElement.addEventListener('mouseout', function () {
            tooltipElement.style.display = 'none';
        });
    });
}
addLeadersOnLoad();


function addLeadersToPage(selectedLeaders) {
    const leadersContainer = document.getElementById('leaders-container');
    const leadersList = document.getElementById('leaders-list');

    // Add the selected leaders to the page
    for (const leaderName in selectedLeaders) {
        const leaderData = selectedLeaders[leaderName];

        const leaderElement = document.createElement('div');
        leaderElement.className = 'leader';

        const imgElement = document.createElement('img');
        imgElement.src = leaderData.image;
        imgElement.alt = leaderName;

        leaderElement.appendChild(imgElement);

        // Add to container
        leadersContainer.appendChild(leaderElement);

        // Add the leader name to the list
        const listItem = document.createElement('li');
        listItem.textContent = leaderName;
        leadersList.appendChild(listItem);
    }
}

function addLeader() {
    const maxLeaders = 10;

    //console.log('addLeader called');

    // Can't do a duplicate check without breaking this function
    // The initial leaders on the page aren't checked for duplicates against the newly added ones and I can't figure it out.

    // Check if the maximum number of leaders has been reached
    if (document.querySelectorAll('.leader').length >= maxLeaders) {
        alert('Maximum number of leaders reached (10).');
        return;
    }

    const numberOfLeadersToAdd = 1;
    const selectedLeaders = getRandomLeaders(numberOfLeadersToAdd);

    // Add the selected leaders to the page
    addLeadersToPage(selectedLeaders);

    // mouseover tooltip
    const leaderElements = document.querySelectorAll('.leader');
    leaderElements.forEach((leaderElement) => {
        const imgElement = leaderElement.querySelector('img');
        const leaderName = imgElement.alt;

        const tooltipElement = document.createElement('div');
        tooltipElement.className = 'tooltip';
        tooltipElement.textContent = 'Your leader is ' + leaderName;

        leaderElement.appendChild(tooltipElement);

        // event listeners for mouseover and mouseout
        leaderElement.addEventListener('mouseover', function () {
            tooltipElement.style.display = 'block';
        });

        leaderElement.addEventListener('mouseout', function () {
            tooltipElement.style.display = 'none';
        });
        //console.log('addLeader ended');

    });
}

function swapLeader() {
    const leaderElements = document.querySelectorAll('.leader');

    // Check if there are at least two leaders to swap
    if (leaderElements.length < 2) {
        alert('At least 2 required to swap.');
        return;
    }

    // Get the first and last leaders
    const firstLeader = leaderElements[0];
    const lastLeader = leaderElements[leaderElements.length - 1];

    // Swap position
    const container = document.getElementById('leaders-container');
    container.insertBefore(lastLeader, leaderElements[0].nextSibling);
    container.appendChild(firstLeader);

    updateLeaderList();
}

// Update the list after the swap
function updateLeaderList() {
    const leadersList = document.getElementById('leaders-list');
    leadersList.innerHTML = '';

    const leaderElements = document.querySelectorAll('.leader');
    leaderElements.forEach((leaderElement) => {
        const imgElement = leaderElement.querySelector('img');
        const leaderName = imgElement.alt;

        const listItem = document.createElement('li');
        listItem.textContent = leaderName;
        leadersList.appendChild(listItem);
    });
}

function removeLeader() {
    const leaderElements = document.querySelectorAll('.leader');

    // Check if there is enough leaders to delete
    if (leaderElements.length === 0) {
        alert('No leaders to remove.');
        return;
    }

    // Remove the fisrt leader
    const container = document.getElementById('leaders-container');
    container.removeChild(leaderElements[0]);

    // Update the list
    updateLeaderList();

    // Disable deletion if no leaders are left
    const removeButton = document.getElementById('remove-button');
    removeButton.disabled = leaderElements.length === 0;
}

function shuffleLeaders() {
    const leaderElements = document.querySelectorAll('.leader');
    const container = document.getElementById('leaders-container');

    // Check if there are at least two leaders to shuffle
    if (leaderElements.length < 2) {
        alert('At least 2 leaders required.');
        return;
    }

    // Create an array of leader elements
    const leaderArray = Array.from(leaderElements);

    // shuffle the array
    leaderArray.sort(function () {
        return Math.random() - 0.5;
    });


    // Clear the current container
    container.innerHTML = '';

    // Apend the shuffled leaders to the container
    leaderArray.forEach(function (leader) {
        container.appendChild(leader);
    });


    // Update the list
    updateLeaderList();
}

