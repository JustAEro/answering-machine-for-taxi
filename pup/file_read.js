const fs = require("fs");
let fileContent = fs.readFileSync("text_data.txt", "utf8");
console.log(fileContent);