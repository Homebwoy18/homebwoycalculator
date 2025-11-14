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

  gbInput.addEventListener("input", function handleCalculate() {
    if (Normal.checked) {
      const inputValue = gbInput.value;
      const gbValues = inputValue.split("+");
      const totalPrice = calculateTotal(gbValues);

      packageList.innerHTML = gbValues
        .map((gb) => `<li class="list-group-item">${gb.trim()}GB</li>`)
        .join("");
      priceList.innerHTML = gbValues
        .map(
          (gb) =>
            `<li class="list-group-item">${
              prices[gb.trim().replace("GB", "")] || 0
            } cedis</li>`
        )
        .join("");
      totalPriceElem.innerHTML = `Total Price: ${totalPrice} cedis`;

      calculateTotal(gbArray);
    }

    if (Normal.checked && Express.checked) {
      write("check only one *").style.Color = "red";
    } else {
    }
  });

  //Express condition

  gbInput.addEventListener("input", function handleCalculateExpress() {
    //gbInput.addEventListener('input', handleCalculate);

    if (Express.checked) {
      const inputValue = gbInput.value;
      const gbValues = inputValue.split("+");
      const totalPrice = calculateTotalExpress(gbValues);

      packageList.innerHTML = gbValues
        .map((gb) => `<li class="list-group-item">${gb.trim()}GB</li>`)
        .join("");
      priceList.innerHTML = gbValues
        .map(
          (gb) =>
            `<li class="list-group-item">${
              Eprices[gb.trim().replace("GB", "")] || 0
            } cedis</li>`
        )
        .join("");
      totalPriceElem.innerHTML = `Total Price: ${totalPrice} cedis`;

      calculateTotalExpress(gbArray);
    }
  });

  displayGreeting();
  displayDate();
  setTimeout(() => {
    inputOutputDiv.classList.add("visible");
    setTimeout(() => {
      document.body.style.overflow = "auto"; // Restore scrollbar after animation
    }, 1000);
  }, 100);

  function calculateTotal(gbArray) {
    let totalPrice = 0;
    gbArray.forEach((gb) => {
      const packagePrice = prices[gb.trim().replace("GB", "")];
      if (packagePrice) {
        totalPrice += packagePrice;
      } else {
        console.error(`Package not found: ${gb.trim()}GB`);
      }
    });
    return totalPrice;
  }

  ///hanling express prices here ........

  function calculateTotalExpress(gbArray) {
    let totalPrice = 0;
    gbArray.forEach((gb) => {
      const packagePrice = Eprices[gb.trim().replace("GB", "")];
      if (packagePrice) {
        totalPrice += packagePrice;
      } else {
        console.error(`Package not found: ${gb.trim()}GB`);
      }
    });
    return totalPrice;
  }

  function handleCopy() {
    const packageItems = Array.from(packageList.children).map((item) =>
      item.innerText.trim()
    );
    const priceItems = Array.from(priceList.children).map((item) =>
      item.innerText.trim()
    );
    const totalPriceText = totalPriceElem.innerText;
    const currentDate = dateElem.innerText;

    let outputText = `${currentDate}\n\nPackages\t\tPrices\n`;
    packageItems.forEach((pkg, index) => {
      outputText += `${pkg}\t\t${priceItems[index]}\n`;
    });
    outputText += `\n${totalPriceText}\n\nMake payment to: Fawuzan Masahudu [0543650011]`;

    navigator.clipboard
      .writeText(outputText)
      .then(() => {
        copyMessage.style.display = "block";
        setTimeout(() => (copyMessage.style.display = "none"), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  }

  function displayGreeting() {
    const currentHour = new Date().getHours();
    let greetingText = "";

    if (currentHour < 12) {
      greetingText = "Good Morning!";
    } else if (currentHour < 18) {
      greetingText = "Good Afternoon!";
    } else {
      greetingText = "Good Evening!";
    }

    greeting.innerText = greetingText;
  }

  function displayDate() {
    const today = new Date();
    const dateString = today.toDateString();
    dateElem.innerText = `Date: ${dateString}`;
  }

  const prices = {
    1: 4.90,
    2: 9.5,
    3: 14.2,
    4: 18.5,
    5: 23,
    6: 28,
    7: 32,
    8: 38,
    9: 42
    10: 43.5,
    15: 62.5,
    20: 85,
    25: 105,
    30: 125,
    40: 162,
    50: 205,
    100: 390,
  };

  const Eprices = {
    1: 4.5,
    2: 8.5,
    3: 12,
    4: 16,
    5: 20,
    6: 24,
    7: 28,
    8: 32,
    9: 35,
    10: 38,
    11: 45,
    12: 49,
    13: 55,
    14: 58,
    15: 60,
    20: 81,
    25: 101,
    30: 129,
    40: 167,
    50: 185,
    100: 395,
  };
});
