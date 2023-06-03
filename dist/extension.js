/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("vscode");

/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = require("fs");

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

/** @format */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = __webpack_require__(1);
const fs = __webpack_require__(2);
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
function activate(context) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "csv-viewer" is now active!');
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand("csv-viewer.edit", () => {
        // The code you place here will be executed every time your command is executed
        // Display a message box to the user
        vscode.window.showInformationMessage("running csv cmd");
        //create new webview panel
        const activeTextEditor = vscode.window.activeTextEditor;
        // ensure active text editor
        if (!activeTextEditor) {
            console.log("No active text editor");
            return;
        }
        //ensure .csv file is open
        const fileUri = activeTextEditor.document.uri;
        const filePath = fileUri.fsPath;
        if (!filePath.endsWith(".csv")) {
            console.log("no csv open");
            return;
        }
        const panel = vscode.window.createWebviewPanel("csv-viewer", "CSV Viewer", vscode.ViewColumn.One, {
            enableScripts: true,
        });
        panel.webview.html = generateHTMLHeader() + generateHTMLTable(filePath);
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
function generateHTMLHeader() {
    return `
    <head>  
      <style>
        table {
          border-collapse: collapse;
          width: 100%;
        }
        th, td {
          text-align: right;
          padding: 8px;
        }
        tr:nth-child(even) {
          background-color: #0F0F0F;
        }
        tr:nth-child(odd) {
          background-color: #1F1F1F;
        }
        th {
          background-color: #1F1FFF;
          color: white;
        }
      </style>
    </head>
  `;
}
function generateHTMLTable(csvFilePath) {
    // Read the CSV file
    const csvData = fs.readFileSync(csvFilePath, "utf-8");
    // Split the CSV data into rows
    const rows = csvData.split("\n");
    let html = "<table>";
    rows.forEach((row, index) => {
        const cells = row.split(",");
        const elementType = index === 0 ? "th" : "td";
        html += "<tr>";
        cells.forEach((cell) => {
            html += `<${elementType} style="border-right: 2px solid #000; border-bottom: 2px solid #000">${cell}</${elementType}>`;
        });
        html += "</tr>";
    });
    html += "</table>";
    return html;
}
// This method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;

})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=extension.js.map