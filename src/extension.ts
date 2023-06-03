/** @format */

// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import * as fs from "fs";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
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

    const panel = vscode.window.createWebviewPanel(
      "csv-viewer",
      "CSV Viewer",
      vscode.ViewColumn.One,
      {
        enableScripts: true,
      }
    );
    panel.webview.html = generateHTMLHeader() + generateHTMLTable(filePath);
  });

  context.subscriptions.push(disposable);
}

function generateHTMLHeader(): string {
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

function generateHTMLTable(csvFilePath: string): string {
  // Read the CSV file
  const csvData: string = fs.readFileSync(csvFilePath, "utf-8");

  // Split the CSV data into rows
  const rows: string[] = csvData.split("\n");

  let html: string = "<table>";
  rows.forEach((row: string, index: number) => {
    const cells: string[] = row.split(",");
    const elementType: string = index === 0 ? "th" : "td";

    html += "<tr>";
    cells.forEach((cell: string) => {
      html += `<${elementType} style="border-right: 2px solid #000; border-bottom: 2px solid #000">${cell}</${elementType}>`;
    });
    html += "</tr>";
  });
  html += "</table>";

  return html;
}

// This method is called when your extension is deactivated
export function deactivate() {}
