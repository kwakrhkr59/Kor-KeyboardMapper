const output = document.getElementById("output");
const copyBtn = document.getElementById("copyBtn");

document.getElementById("toKor").addEventListener("click", () => {
  const input = document.getElementById("input").value.trim();
  const result = convertEngToHangul(input);
  output.innerText = result || "(변환 결과 없음)";

  copyBtn.style.display = output.textContent.trim() ? "block" : "none";
});

document.getElementById("toggle").addEventListener("click", () => {
  const input = document.getElementById("input").value.trim();
  const result = toggleLang(input);
  output.innerText = result || "(변환 결과 없음)";

  copyBtn.style.display = output.textContent.trim() ? "block" : "none";
});

document.getElementById("toEng").addEventListener("click", () => {
  const input = document.getElementById("input").value.trim();
  const result = convertKorToEng(input);
  output.innerText = result || "(변환 결과 없음)";

  copyBtn.style.display = output.textContent.trim() ? "block" : "none";
});

copyBtn.addEventListener("click", async () => {
  const text = output.textContent.trim();
  if (!text) return;

  try {
    await navigator.clipboard.writeText(text);
    copyBtn.textContent = "✅ 복사됨";
    copyBtn.classList.add("copied");

    setTimeout(() => {
      copyBtn.textContent = "📋 복사";
      copyBtn.classList.remove("copied");
    }, 1500);
  } catch {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);

    copyBtn.textContent = "✅ 복사됨";
    copyBtn.classList.add("copied");

    setTimeout(() => {
      copyBtn.textContent = "📋 복사";
      copyBtn.classList.remove("copied");
    }, 1500);
  }
});
