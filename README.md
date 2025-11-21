# 🔄 Hangul ↔ QWERTY Converter (Chrome Extension)

A simple yet powerful Chrome Extension that restores text typed in the wrong keyboard layout. Whether you accidentally typed Korean on an English keyboard (`dkssud`) or English on a Korean keyboard (`ㅗㄷlld`), this tool fixes it instantly.

## ✨ Key Features

- **🇰🇷 English → Korean (`dkssud` → `안녕`)**
  - Converts QWERTY keyboard input into Hangul characters.
- **🇺🇸 Korean → English (`ㅗㄷlld` → `hello`)**
  - Decodes Hangul characters back to their QWERTY key strokes.
- **🔀 Mixed Text Toggle**
  - Smartly swaps languages in a mixed string. Useful when you have a sentence like `dkssud하세요` (converts to `안녕gktpdy`).
- **🖱️ Context Menu Support (Right-Click)**
  - No need to open the popup! Select text on any website, right-click, and convert it **in-place**.

## 🚀 Installation

Since this extension is not yet on the Chrome Web Store, you need to load it manually:

1. **Clone or Download** this repository to your local machine.
2. Open Google Chrome and navigate to `chrome://extensions`.
3. Enable **Developer mode** (toggle in the top-right corner).
4. Click **Load unpacked**.
5. Select the folder containing the `manifest.json` file.

## 📖 Usage

### Method 1: Using the Popup

1. Click the extension icon in the browser toolbar.
2. Paste or type the text into the text area.
3. Click the desired button:
   - **🇰🇷 Eng → Kor**: Converts English typing to Korean.
   - **🔀 Toggle**: Swaps English parts to Korean and Korean parts to English.
   - **🇺🇸 Kor → Eng**: Converts Korean typing to English.
4. Click the **Clipboard** button to copy the result.

### Method 2: Using the Context Menu (Right-Click)

1. Highlight any text on a webpage (e.g., in a search bar or comment box).
2. Right-click to open the menu.
3. Select **Hangul ↔ QWERTY Converter** > Choose conversion type.
4. The selected text will be **replaced automatically** with the converted text.

## 🛠️ Permissions

This extension requires the following permissions to function correctly:

- `contextMenus`: To add the conversion options to the right-click menu.
- `activeTab` & `scripting`: To access and modify the selected text on the current webpage for in-place conversion.

> **Note:** No user data is collected or sent to external servers. All processing happens locally within your browser.

## 📂 Project Structure

```text
├── manifest.json      # Extension configuration and permissions
├── popup.html         # Popup UI layout
├── popup.js           # Popup logic and event handlers
├── background.js      # Background script for Context Menus
├── hangul_map.js      # Core logic for Hangul assembly/disassembly
└── icon.png           # Extension icon
```
