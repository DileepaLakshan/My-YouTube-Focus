document.addEventListener('DOMContentLoaded', () => {
    const extensionToggle = document.getElementById('extension-toggle');
    const shortsToggle = document.getElementById('shorts-toggle');
    const keywordInput = document.getElementById('keyword-input');
    const addBtn = document.getElementById('add-btn');
    const keywordList = document.getElementById('keyword-list');

    // Default keywords fallback if storage is empty
    const defaultKeywords = [
        "minecraft", "mine craft", "hypixel", "smp", "roblox", 
        "dream", "herobrine", "mod", "survival", "bedwars", 
        "skyblock", "prank", "gossip", "react"
    ];

    // Load settings from storage
    chrome.storage.sync.get({
        extensionEnabled: true,
        hideShorts: true,
        distractionKeywords: defaultKeywords
    }, (result) => {
        extensionToggle.checked = result.extensionEnabled;
        shortsToggle.checked = result.hideShorts;
        renderKeywords(result.distractionKeywords);
    });

    // Save toggles
    extensionToggle.addEventListener('change', () => {
        chrome.storage.sync.set({ extensionEnabled: extensionToggle.checked });
    });

    shortsToggle.addEventListener('change', () => {
        chrome.storage.sync.set({ hideShorts: shortsToggle.checked });
    });

    // Add keyword
    const addKeyword = () => {
        const keyword = keywordInput.value.trim().toLowerCase();
        if (keyword) {
            chrome.storage.sync.get({ distractionKeywords: defaultKeywords }, (result) => {
                let keywords = result.distractionKeywords;
                if (!keywords.includes(keyword)) {
                    keywords.push(keyword);
                    chrome.storage.sync.set({ distractionKeywords: keywords }, () => {
                        renderKeywords(keywords);
                        keywordInput.value = '';
                    });
                } else {
                    // Flash red or indicate already exists
                    keywordInput.style.borderColor = 'red';
                    setTimeout(() => keywordInput.style.borderColor = '', 500);
                }
            });
        }
    };

    addBtn.addEventListener('click', addKeyword);
    keywordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addKeyword();
    });

    // Render keyword tags
    function renderKeywords(keywords) {
        keywordList.innerHTML = '';
        keywords.forEach(keyword => {
            const li = document.createElement('li');
            li.className = 'keyword-tag';
            
            const textSpan = document.createElement('span');
            textSpan.textContent = keyword;
            
            const removeBtn = document.createElement('button');
            removeBtn.className = 'remove-btn';
            removeBtn.innerHTML = '&times;';
            removeBtn.title = 'Remove';
            
            removeBtn.addEventListener('click', () => {
                removeKeyword(keyword);
            });
            
            li.appendChild(textSpan);
            li.appendChild(removeBtn);
            keywordList.appendChild(li);
        });
    }

    // Remove keyword
    function removeKeyword(keywordToRemove) {
        chrome.storage.sync.get({ distractionKeywords: defaultKeywords }, (result) => {
            let keywords = result.distractionKeywords.filter(k => k !== keywordToRemove);
            chrome.storage.sync.set({ distractionKeywords: keywords }, () => {
                renderKeywords(keywords);
            });
        });
    }
});
