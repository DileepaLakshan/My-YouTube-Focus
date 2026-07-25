# My YouTube Focus 🎯

**My YouTube Focus** is a lightweight, customizable Chrome Extension designed to help you regain control over your YouTube experience and boost your productivity. It allows you to automatically hide distracting videos based on keywords and completely removes YouTube Shorts from your feed to prevent doomscrolling.

## Features ✨

* 🚫 **Custom Keyword Blocking:** Automatically hides videos on your YouTube feed that contain specific keywords in their title (e.g., "gaming", "drama", "react").
* 📱 **Hide YouTube Shorts:** A simple toggle instantly removes the Shorts shelf from the home page and hides the Shorts button in the sidebar.
* ⚡ **Real-Time UI:** Built with a modern, dark-mode popup interface that lets you add/remove tags and toggle features on the fly. The YouTube page updates instantly—no refresh required!
* 🔒 **Privacy First:** All data (your tags and settings) is stored locally using `chrome.storage.sync`. The extension does not track you or send data to external servers.

## Installation 🛠️

Since the extension is currently in development, you can install it manually in Chrome via Developer Mode:

1. Download or clone this repository to your local machine.
2. Open Google Chrome and navigate to `chrome://extensions/`.
3. Enable **Developer mode** using the toggle switch in the top right corner.
4. Click the **Load unpacked** button in the top left corner.
5. Select the folder containing this extension's files (where `manifest.json` is located).
6. **(Optional but recommended):** Click the puzzle piece icon next to your profile avatar in the Chrome toolbar and "pin" the My YouTube Focus extension so it's always accessible.

## Usage 💡

1. Navigate to [YouTube](https://www.youtube.com).
2. Click the **My YouTube Focus** icon in your browser toolbar to open the popup window.
3. Use the toggles to enable/disable the extension entirely or toggle the Shorts hiding feature.
4. Type a keyword into the input box and click **Add** to block videos containing that word.
5. Click the `×` on any keyword tag to remove it. 

Watch your feed clean itself up automatically!

## Tech Stack 💻

* **HTML/CSS/JavaScript:** Plain vanilla web technologies for maximum performance.
* **Chrome Extension API (Manifest V3):** 
  * `chrome.storage.sync` for saving user preferences.
  * `content_scripts` for observing DOM mutations and filtering out distracting video elements.

## License 📄
This project is open-source and free to use.


