// V3: Debug Mode - Find out why videos are leaking

let extensionEnabled = true;
let hideShorts = true;
let distractionKeywords = [
    "minecraft", "mine craft", "hypixel", "smp", "roblox", 
    "dream", "herobrine", "mod", "survival", "bedwars", 
    "skyblock", "prank", "gossip", "react"
];

function updateBodyClass() {
    if (hideShorts && extensionEnabled) {
        document.body.classList.add('my-youtube-focus-hide-shorts');
    } else {
        document.body.classList.remove('my-youtube-focus-hide-shorts');
    }
}

function removeDistractions() {
    if (!extensionEnabled) return; // Do nothing if extension is disabled

    const videoSelectors = [
        "ytd-rich-item-renderer",
        "ytd-compact-video-renderer",
        "ytd-video-renderer",
        "ytd-grid-video-renderer",
        "ytd-reel-item-renderer"
    ];

    const videos = document.querySelectorAll(videoSelectors.join(","));

    videos.forEach(video => {
        const videoText = video.innerText.toLowerCase();

        const found = distractionKeywords.some(keyword => videoText.includes(keyword));

        if (found) {
            video.style.display = "none";
            video.setAttribute("hidden", "true"); 
        } else {
            // Un-hide in case it was previously hidden and keywords changed
            if (video.style.display === "none") {
                video.style.display = "";
                video.removeAttribute("hidden");
            }
        }
    });
}

// Function to refresh all videos (unhide all, then re-apply filter)
function refreshAllVideos() {
    const videoSelectors = [
        "ytd-rich-item-renderer",
        "ytd-compact-video-renderer",
        "ytd-video-renderer",
        "ytd-grid-video-renderer",
        "ytd-reel-item-renderer"
    ];
    const videos = document.querySelectorAll(videoSelectors.join(","));
    videos.forEach(video => {
        video.style.display = "";
        video.removeAttribute("hidden");
    });
    removeDistractions();
}

// Initialize settings from storage
chrome.storage.sync.get({
    extensionEnabled: true,
    hideShorts: true,
    distractionKeywords: distractionKeywords
}, (result) => {
    extensionEnabled = result.extensionEnabled;
    hideShorts = result.hideShorts;
    distractionKeywords = result.distractionKeywords;
    
    updateBodyClass();
    removeDistractions();
});

// Listen for changes from the popup
chrome.storage.onChanged.addListener((changes, namespace) => {
    if (namespace === 'sync') {
        if (changes.extensionEnabled) {
            extensionEnabled = changes.extensionEnabled.newValue;
        }
        if (changes.hideShorts) {
            hideShorts = changes.hideShorts.newValue;
        }
        if (changes.distractionKeywords) {
            distractionKeywords = changes.distractionKeywords.newValue;
        }
        
        updateBodyClass();
        refreshAllVideos(); // Re-evaluate all videos with new settings
    }
});


// Constant Observer
const observer = new MutationObserver(removeDistractions);
observer.observe(document.body, { childList: true, subtree: true });