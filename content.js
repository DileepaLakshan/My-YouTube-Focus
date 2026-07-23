// V3: Debug Mode - Find out why videos are leaking

function removeDistractions() {
    // Add variations of Minecraft terms here
    const distractionKeywords = [
        "minecraft", "mine craft", "hypixel", "smp", "roblox", 
        "dream", "herobrine", "mod", "survival", "bedwars", 
        "skyblock", "prank", "gossip", "react"
    ];

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

        // --- DEBUG SECTION ---
        // If you open the Console (F12), this will show you the text of videos that slipped through
        // You can look at this list to find new words to block.
        // ---------------------

        const found = distractionKeywords.some(keyword => videoText.includes(keyword));

        if (found) {
            video.style.display = "none";
            video.setAttribute("hidden", "true"); 
        } else {
            // Optional: Uncomment the line below to see text of ALLOWED videos in your console
            // console.log("Allowed Video:", videoText.substring(0, 50) + "..."); 
        }
    });
}

// Run immediately
removeDistractions();

// Constant Observer
const observer = new MutationObserver(removeDistractions);
observer.observe(document.body, { childList: true, subtree: true });