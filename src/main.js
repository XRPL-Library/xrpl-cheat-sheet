const fs = require("fs");
const xrplSheetJson = require("./xrpl-cheat-sheet.json");

const main = () => {

    // Markdown things
    const nL = `\n\n`;
    let hash = `#`;

    const convertToMd = (data = null, deep = 1) => {
        if (!data) {
            return "";
        };

        let currentString = "";

        if (Array.isArray(data)) {
            currentString += `Name | Link \n--- | ---\n`
            data.forEach(row => {
                if (row.name) {
                    currentString += `${row.name} | ![Link](${row.link})\n`
                }
            });
        }
        else if (typeof data === "object") {
            for (const topic in data) {
                if (topic === "description") {
                    currentString += `> ${data[topic]}${nL}`;
                }
                else {
                    currentString += `${hash.repeat(deep)} ${topic}\n___${nL}` + convertToMd(data[topic], deep + 1);
                }
            }
        };

        return currentString;
    };

    let MD_DATA = `${hash} XRP Ledger Cheat Sheet${nL} A curated list of everything awesome going on in the XRP Ledger.${nL}`
    MD_DATA += convertToMd(xrplSheetJson, 2);

    fs.writeFileSync("README.md", MD_DATA);
};


main();