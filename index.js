document.addEventListener("DOMContentLoaded", () => {
  const gbInput = document.getElementById("input");
  const packageList = document.getElementById("package-list");
  const priceList = document.getElementById("price-list");
  const totalPriceElem = document.getElementById("total-price");
  const button = document.getElementById("btn");
  const greeting = document.getElementById("greeting");
  const copyMessage = document.getElementById("copy-message");
  const inputOutputDiv = document.getElementById("input-output");
  const dateElem = document.getElementById("date");
  const Normal = document.getElementById("Normal");
  const Express = document.getElementById("Express");

  let allPackages = []; // array to store current packages

  button.addEventListener("click", handleCopy);

  gbInput.addEventListener("input", () => {
    const inputValue = gbInput.value.trim();
    if (!inputValue) {
      allPackages = [];
      renderPackages();
      return;
    }

    const gbValues = inputValue.split("+").map(s => s.trim()).filter(Boolean);

    // Determine which operator is checked
    if (!Normal.checked && !Express.checked) {
      allPackages = [];
      renderPackages();
      return;
    }

    const operator = Normal.checked ? "MTN" : "Airtel Tigo";
    const pricesObj = Normal.checked ? prices : Eprices;

    // rebuild allPackages from scratch for current input
    allPackages = gbValues.map(gb => {
      const key = gb.replace(/GB/i, "").trim();
      const price = pricesObj[key] || 0;
      return { value: key, operator, price };
    });

    renderPackages();
  });

  function renderPackages() {
    // Sort so MTN comes first
    const sorted = [...allPackages].sort((a, b) => {
      if (a.operator === b.operator) return 0;
      return a.operator === "MTN" ? -1 : 1;
    });

    packageList.innerHTML = sorted
      .map((p, index) =>
        `<li class="list-group-item number-item"><span class="num">${index+1}.</span> ${p.value}GB (${p.operator})</li>`
      ).join("");

    priceList.innerHTML = sorted
      .map(p => `<li class="list-group-item">${p.price.toFixed(2)} cedis</li>`).join("");

    const total = sorted.reduce((sum, p) => sum + p.price, 0);
    totalPriceElem.innerHTML = sorted.length ? `Total Price: ${total.toFixed(2)} cedis` : '';
  }

  function handleCopy() {
    const sorted = [...allPackages].sort((a, b) => {
      if (a.operator === b.operator) return 0;
      return a.operator === "MTN" ? -1 : 1;
    });

    if (!sorted.length) return;

    let output = `${dateElem.innerText}\n\nPackages           Prices\n`;

    sorted.forEach((p, i) => {
      const pkgStr = `${i+1}. ${p.value}GB (${p.operator})`.padEnd(25, " ");
      const priceStr = `${p.price.toFixed(2)} cedis`;
      output += `${pkgStr} ${priceStr}\n`;
    });

    const total = sorted.reduce((sum, p) => sum + p.price, 0);
    output += `\nTotal Price: ${total.toFixed(2)} cedis\n\nMake payment to: Fawuzan Masahudu [0543650011]`;

    navigator.clipboard.writeText(output).then(() => {
      copyMessage.style.display = "block";
      setTimeout(() => copyMessage.style.display = "none", 2000);
    });
  }

  function displayGreeting() {
    const hour = new Date().getHours();
    greeting.innerText = hour < 12 ? "Good Morning!" : hour < 18 ? "Good Afternoon!" : "Good Evening!";
  }

  function displayDate() {
    dateElem.innerText = `Date: ${new Date().toDateString()}`;
  }

  displayGreeting();
  displayDate();
  setTimeout(() => {
    inputOutputDiv.classList.add("visible");
    setTimeout(() => document.body.style.overflow = "auto", 1000);
  }, 100);

  const prices = { 1:4.9,2:9.5,3:14.2,4:18.5,5:23,6:28,7:32,8:38,9:42,10:43.5,15:62.5,20:85,25:105,30:125,40:162,50:205,100:390 };
  const Eprices = { 1:4.5,2:8.5,3:12,4:16,5:20,6:24,7:28,8:32,9:35,10:38,11:45,12:49,13:55,14:58,15:60,20:81,25:101,30:129,40:167,50:185,100:395 };
});
