const fs = require("fs");
const xrplSheetJson = require("./xrpl-cheat-sheet.json");

const main = () => {

    // Markdown things
    const nL = `\n\n`;
    let hash = `#`;
    const bullet_symbols = ["➼", " ♦", "★", "‣", "⁃"];

    const convertToMd = (data = null, deep = 1) => {
        if (!data) {
            return "";
        };

        let currentString = "";

        if (Array.isArray(data)) {
            currentString += `&nbsp;&nbsp;&nbsp;&nbsp;Name&nbsp;&nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp;&nbsp;Link&nbsp;&nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp;&nbsp;Description&nbsp;&nbsp;&nbsp;&nbsp; \n --- | --- | --- \n `;
            data.forEach((row) => {
                if (row.name) {
                    currentString += `${row.name} | [Link](${row.link}) | ${
                        !row.description || row.description.length === 0 ? "-" : row.description
                    }\n`;
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

    let header = `<div align="center" style="font-size:30px;">${nL} ${hash} XRP Ledger Cheat Sheet${nL} A curated list of everything related to the XRP Ledger.${nL}<img src="./src/XRPL.svg" style="padding:10px" onclick=" "/>${nL}</div>${nL}`;
    let intro = `${hash.repeat(2)} ${bullet_symbols[0]} Introduction ${nL} \n${hash.repeat(3)} ${bullet_symbols[1]} General ${nL}This repository is a collection of projects, links and useful resources related to XRP Ledger.\nREADME.md file is derived from [xrpl-cheat-sheet.json](https://github.com/TusharPardhe/xrpl-cheat-sheet/blob/master/src/xrpl-cheat-sheet.json), one can directly use this JSON file to integrate with their application.${nL}${hash.repeat(3)} ${bullet_symbols[1]} Add your project! ${nL} 1. Go to the file [xrpl-cheat-sheet.json](https://github.com/TusharPardhe/xrpl-cheat-sheet/blob/master/src/xrpl-cheat-sheet.json) \n 2. Add your project with the same format as that in JSON file i.e. { name: "ABC" , link: "xyz.com", description: "Hi this is my new project" }. \n 3. After successful merge README.md file will auto update, and your project will be visible.${nL} > [Bonus]: This list will be used in "Useful Links/Projects" Section of [XPT Browser Extension](https://xptxrpl.com/).${nL}`;
    let credits = `${hash.repeat(2)} ${bullet_symbols[0]} Credits ${nL}`;

    let MD_DATA = header + intro + convertToMd(xrplSheetJson, 2) + credits;

    fs.writeFileSync("README.md", MD_DATA);
};


main();
