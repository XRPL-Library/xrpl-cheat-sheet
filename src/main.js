const fs = require("fs");
const xrplSheetJson = require("./xrpl-cheat-sheet.json");

const main = () => {

    // Markdown things
    const nL = `\n\n`;
    let hash = `#`;
    const bullet_symbols = [ "♦", "★", "·", "⁃"];

    const convertToMd = (data = null, deep = 1) => {
        if (!data) {
            return "";
        };

        let currentString = "";

        if (Array.isArray(data)) {
            currentString += `&nbsp;&nbsp;&nbsp;&nbsp;Name&nbsp;&nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp;&nbsp;Link&nbsp;&nbsp;&nbsp;&nbsp; \n--- | ---\n`
            data.forEach(row => {
                if (row.name) {
                    currentString += `${row.name} | [Link](${row.link})\n`
                }
            });
            currentString += nL + "---" + nL;
        }
        else if (typeof data === "object") {
            for (const topic in data) {
                if (topic === "description") {
                    currentString += `> ${data[topic]}${nL}`;
                }
                else {
                    currentString += `${hash.repeat(deep)} ${bullet_symbols[deep - 2]} ${topic} ${nL}` + convertToMd(data[topic], deep + 1);
                }
            }
        };

        return currentString;
    };

    let MD_DATA = `<div align="center" style="font-size:30px;">${nL} ${hash} XRP Ledger Cheat Sheet${nL} A curated list of everything related to the XRP Ledger.${nL}<img src="./src/XRPL.svg" style="padding:10px" onclick=" "/>${nL}</div>${nL}`
    MD_DATA += convertToMd(xrplSheetJson, 2);

    fs.writeFileSync("README.md", MD_DATA);
};


main();
