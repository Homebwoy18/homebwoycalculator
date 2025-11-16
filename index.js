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

  button.addEventListener("click", handleCopy);
  gbInput.addEventListener("input", handleCalculate);

  displayGreeting();
  displayDate();

  setTimeout(() => {
    inputOutputDiv.classList.add("visible");
    setTimeout(() => { document.body.style.overflow = "auto"; }, 1000);
  }, 100);

  const prices = { 1: 4.90, 2: 9.5, 3: 14.2, 4: 18.5, 5: 23, 6: 28, 7: 32, 8: 38, 9: 42, 10: 43.5, 15: 62.5, 20: 85, 25: 105, 30: 125, 40: 162, 50: 205, 100: 390 };
  const Eprices = { 1: 4.5, 2: 8.5, 3: 12, 4: 16, 5: 20, 6: 24, 7: 28, 8: 32, 9: 35, 10: 38, 11: 45, 12: 49, 13: 55, 14: 58, 15: 60, 20: 81, 25: 101, 30: 129, 40: 167, 50: 185, 100: 395 };

  let mtnCounter = 1;
  let tigoCounter = 1;
  let mtnPackages = [];
  let tigoPackages = [];

  function handleCalculate() {
    const inputValue = gbInput.value.trim();
    if (!inputValue) {
      packageList.innerHTML = "";
      priceList.innerHTML = "";
      totalPriceElem.innerText = "";
      mtnPackages = [];
      tigoPackages = [];
      mtnCounter = 1;
      tigoCounter = 1;
      return;
    }

    const gbValues = inputValue.split("+").map(s => s.trim()).filter(Boolean);

    let packageHTML = "";
    let priceHTML = "";
    let total = 0;

    // MTN Calculation
    if (Normal.checked) {
      const newMtn = gbValues.filter(gb => !mtnPackages.includes(gb));
      newMtn.forEach(gb => {
        const key = gb.replace(/GB/i, "").trim();
        const price = prices[key] || 0;
        packageHTML += `<li class="package-row"><span>${mtnCounter}. ${key}GB</span></li>`;
        priceHTML += `<li class="package-row"><span>${price.toFixed(2)} cedis</span></li>`;
        total += price;
        mtnPackages.push(gb);
        mtnCounter++;
      });
    }

    // Airtel Tigo Calculation
    if (Express.checked) {
      const newTigo = gbValues.filter(gb => !tigoPackages.includes(gb));
      newTigo.forEach(gb => {
        const key = gb.replace(/GB/i, "").trim();
        const price = Eprices[key] || 0;
        packageHTML += `<li class="package-row"><span>${tigoCounter}. ${key}GB</span></li>`;
        priceHTML += `<li class="package-row"><span>${price.toFixed(2)} cedis</span></li>`;
        total += price;
        tigoPackages.push(gb);
        tigoCounter++;
      });
    }

    packageList.innerHTML = packageHTML;
    priceList.innerHTML = priceHTML;
    totalPriceElem.innerHTML = `Total Price: ${total.toFixed(2)} cedis`;
  }

  function handleCopy() {
    const packageItems = Array.from(packageList.children).map((item, index) => {
      const pkg = item.innerText.trim();
      const price = priceList.children[index].innerText.trim();
      return { pkg, price };
    });

    const totalPriceText = totalPriceElem.innerText;
    const currentDate = dateElem.innerText;

    let maxLength = Math.max(...packageItems.map(p => p.pkg.length));
    let outputText = `${currentDate}\n\nPackages${" ".repeat(maxLength - 8)}Prices\n`;

    packageItems.forEach(({ pkg, price }) => {
      const spaces = " ".repeat(maxLength - pkg.length + 4);
      outputText += `${pkg}${spaces}${price}\n`;
    });

    outputText += `\n${totalPriceText}\n\nMake payment to: Fawuzan Masahudu [0543650011]`;

    navigator.clipboard.writeText(outputText)
      .then(() => { copyMessage.style.display = "block"; setTimeout(() => copyMessage.style.display = "none", 2000); })
      .catch(err => console.error("Failed to copy: ", err));
  }

  function displayGreeting() {
    const hour = new Date().getHours();
    greeting.innerText = hour < 12 ? "Good Morning!" : hour < 18 ? "Good Afternoon!" : "Good Evening!";
  }

  function displayDate() {
    dateElem.innerText = `Date: ${new Date().toDateString()}`;
  }
});
