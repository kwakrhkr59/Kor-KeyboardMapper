importScripts("hangul_map.js");

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "toKor",
    title: "🇰🇷 영 → 한 변환",
    contexts: ["selection"],
  });

  chrome.contextMenus.create({
    id: "toggle",
    title: "🔀 영 ↔ 한 교차 변환",
    contexts: ["selection"],
  });

  chrome.contextMenus.create({
    id: "toEng",
    title: "🇺🇸 한 → 영 변환",
    contexts: ["selection"],
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  const text = info.selectionText;
  let convertedText = "";

  if (info.menuItemId === "toKor") {
    convertedText = convertEngToHangul(text);
  } else if (info.menuItemId === "toEng") {
    convertedText = convertKorToEng(text);
  }

  if (convertedText) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: replaceSelectedText,
      args: [convertedText],
    });
  }
});

chrome.commands.onCommand.addListener(async (command) => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (
    !tab ||
    !tab.url ||
    tab.url.startsWith("chrome://") ||
    tab.url.startsWith("edge://") ||
    tab.url.startsWith("about:")
  ) {
    console.warn("이 페이지에서는 확장 프로그램을 사용할 수 없습니다.");
    return;
  }

  const result = await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: getSelectedText,
  });

  const text = result[0]?.result;
  if (!text) return;

  let convertedText = "";
  if (command === "cmd_toggle") {
    convertedText = toggleLang(text);
  } else if (command === "cmd_to_kor") {
    convertedText = convertEngToHangul(text);
  } else if (command === "cmd_to_eng") {
    convertedText = convertKorToEng(text);
  }

  if (convertedText) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: replaceSelectedText,
      args: [convertedText],
    });
  }
});

function getSelectedText() {
  const activeElement = document.activeElement;

  if (
    activeElement &&
    (activeElement.tagName === "INPUT" || activeElement.tagName === "TEXTAREA")
  ) {
    const start = activeElement.selectionStart;
    const end = activeElement.selectionEnd;
    return activeElement.value.substring(start, end);
  } else {
    return window.getSelection().toString();
  }
}

function replaceSelectedText(replacementText) {
  const activeElement = document.activeElement;

  if (
    activeElement &&
    (activeElement.tagName === "INPUT" || activeElement.tagName === "TEXTAREA")
  ) {
    const start = activeElement.selectionStart;
    const end = activeElement.selectionEnd;
    const originalText = activeElement.value;
    activeElement.value =
      originalText.slice(0, start) + replacementText + originalText.slice(end);
    activeElement.selectionStart = activeElement.selectionEnd =
      start + replacementText.length;
  } else {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;
    const range = selection.getRangeAt(0);
    range.deleteContents();
    range.insertNode(document.createTextNode(replacementText));
  }
}
