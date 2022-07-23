const fs = require("fs");
const xrplSheetJson = require("./xrpl-cheat-sheet.json");

const main = () => {
    const nL = `\n\n`;
    let readme_MD_data = `# XRP Ledger Cheat Sheet${nL} A curated list of all the awesome things happening in XRP Ledger.${nL}`;

    // Adding Data from JSON file
    Object.keys(xrplSheetJson).map(topic => {
        readme_MD_data += `## ${topic}${nL}`;
    });

    fs.writeFileSync("README.md", readme_MD_data);
    console.log(readme_MD_data)

};


main();