const { acceptedCurrencies } = require("./currencies.js");
const { converter, getConversions } = require("./converter.js");

function main() {
  console.log("Hello and Welcome to my Simple Currency Converter");

  const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  async function promptSelection() {
    readline.question(
      "\n\nTo view the currencies that this program can use, type 1 and enter,\nhit enter to start using the Currency Converter,\nor type 'q' and hit enter to quit.",
      async (selection) => {
        if (selection === "") {
          console.log("Starting Converter...");
          startConverter();
        } else if (parseInt(selection) === 1) {
          console.log(acceptedCurrencies);
          promptSelection();
        } else if (selection.toLowerCase() === "q") {
          getConversions();
          readline.close();
        } else {
          console.log("Invalid Selection.  Please enter 1 or press Enter");
          promptSelection();
        }
      },
    );
  }
  async function startConverter() {
    try {
      const exchangeRates = await getConversions();
      readline.question("Enter amount to be converted: ", (amountInput) => {
        const amount = parseFloat(amountInput);
        readline.question(
          "Enter the source currency Code: ",
          (fromCurrency) => {
            readline.question(
              "Enter the target currency Code: ",
              (toCurrency) => {
                try {
                  const convertedAmount = converter(
                    amount,
                    fromCurrency.toUpperCase(),
                    toCurrency.toUpperCase(),
                    exchangeRates,
                  );
                  console.log(
                    `Converted ${amount} ${fromCurrency} to ${convertedAmount.toFixed(2)} ${toCurrency}`,
                  );
                } catch (error) {
                  console.error(error.message);
                } finally {
                  promptSelection();
                  // readline.close();
                  // process.exit(0);
                }
              },
            );
          },
        );
      });
    } catch (error) {
      console.error("Error fetching converstion rates: ", error.message);
      readline.close();
      process.exit(1);
    }
  }
  promptSelection();
}

main();
