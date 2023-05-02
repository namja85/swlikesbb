const XLSX = require("xlsx");
const path = require("path");
const fs = require("fs");

const directoryPath = path.resolve(process.cwd(), "resources");
const fileName = path.resolve(directoryPath, "income-tax-table.xlsx");
const sheetName = "Sheet1";

const workbook = XLSX.readFile(fileName);
const workSheet = workbook.Sheets[sheetName];
workSheet["!ref"] = "A7:M653";

const rows = XLSX.utils.sheet_to_json(workSheet, { header: 1 });

const targetFileName = path.resolve(directoryPath, "parsed.json");
fs.writeFileSync(targetFileName, JSON.stringify(rows));
