document
  .querySelector(".currency-button")
  .addEventListener("click", getCurrencyList);

async function getCurrencyList() {
  try {
    const response = await fetch("https://api.frankfurter.app/latest");
    const data = await response.json();

    if (!data.rates) {
      console.error("Brak danych o walutach");
      return;
    }

    let select = document.querySelector(".currency-select");

    if (!select) {
      select = document.createElement("select");
      select.classList.add("currency-select");
    } else {
      select.innerHTML = "";
    }

    const eurOption = document.createElement("option");
    eurOption.value = "EUR";
    eurOption.textContent = "EUR (1.00)";
    select.appendChild(eurOption);

    for (const currency in data.rates) {
      const value = data.rates[currency];
      const option = document.createElement("option");
      option.value = currency;
      option.textContent = `${currency} (${value.toFixed(2)})`;
      select.appendChild(option);
    }

    document.body.appendChild(select);
  } catch (error) {
    console.error("Błąd podczas pobierania walut:", error);
  }
}
