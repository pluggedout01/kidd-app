const searchBar = document.querySelector('.search-bar');
const dropdownMenu = document.getElementById('dropdownMenu');
const dropdownItems = document.querySelectorAll('.dropdown-item');
const logo = document.querySelector('.logo');

// Dropdown filtering with "menu" keyword to show all
searchBar.addEventListener('input', function () {
    const query = this.value.trim().toLowerCase();

    if (query === 'menu') {
        dropdownItems.forEach(item => {
            item.style.display = 'block';
        });
        dropdownMenu.classList.add('show');
        searchBar.classList.add('dropdown-active');
        return;
    }

    let matchFound = false;

    dropdownItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        if (text.includes(query)) {
            item.style.display = 'block';
            matchFound = true;
        } else {
            item.style.display = 'none';
        }
    });

    if (query.length > 0 && matchFound) {
        dropdownMenu.classList.add('show');
        searchBar.classList.add('dropdown-active');
    } else {
        dropdownMenu.classList.remove('show');
        searchBar.classList.remove('dropdown-active');
    }
});

// Hide dropdown when clicking outside
document.addEventListener('click', function(event) {
    if (!event.target.closest('.search-container')) {
        dropdownMenu.classList.remove('show');
        searchBar.classList.remove('dropdown-active');
    }
});

// Dropdown item click navigation
dropdownItems.forEach(item => {
    item.addEventListener('click', function() {
        const page = this.getAttribute('data-page');
        searchBar.value = this.textContent;
        dropdownMenu.classList.remove('show');
        searchBar.classList.remove('dropdown-active');
        console.log(`Navigating to: ${page}`);
        alert(`Would navigate to: ${page} page`);
    });
});

// Secret keywords for sounds or redirects (all lowercase keys)
const secretActions = {
    "xyzsound": {
        type: "sound",
        soundFiles: ["sounds/secret-sound.mp3"]
    },
    "opensesame": {
        type: "redirect",
        url: "secret.html"
    },
    "kidd": {
        type: "sound",
        soundFiles: [
            "sounds/Kidd - YO!.mp3",
            "sounds/Kidd - TAG01.mp3"
        ]
    },
    
    "thekiddturnedoutfine": {
        type: "sound",
        soundFile: "sounds/TheKiddTurnedOutFine.mp3"
    }
};


// Cat sounds array
const catSounds = [];
for (let i = 1; i <= 15; i++) {
    catSounds.push(`sounds/Cat${i}.mp3`);
}

// Play random cat sound function
function playRandomCatSound() {
    const randomIndex = Math.floor(Math.random() * catSounds.length);
    const audio = new Audio(catSounds[randomIndex]);
    audio.play();
}

// Search bar Enter key handler (single listener)
searchBar.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        const query = this.value.trim().toLowerCase();

        if (query === 'cat') {
            playRandomCatSound();
            return;
        }

        if (secretActions[query]) {
            const action = secretActions[query];
            if (action.type === "sound") {
                if (Array.isArray(action.soundFiles)) {
                    // Handle random sound from multiple files
                    const randomIndex = Math.floor(Math.random() * action.soundFiles.length);
                    new Audio(action.soundFiles[randomIndex]).play();
                } else {
                    new Audio(action.soundFile).play();
                }
            } else if (action.type === "redirect") {
                window.location.href = action.url;
            }
            return;
        }

        if (query) {
            console.log(`Searching for: ${query}`);
            alert(`Would search for: ${query}`);
        }
    }
});


// Logo click plays random cat sound
logo.addEventListener('click', function(event) {
    event.preventDefault();
    playRandomCatSound();
});
