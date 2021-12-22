import * as vscode from 'vscode';

import { WISDOMS } from './wisdoms';

const CEO_INTERVAL = 1500000;

export function activate(context: vscode.ExtensionContext) {
  setInterval(() => {
    vscode.window.showErrorMessage(WISDOMS[getRandomInt(0, WISDOMS.length)]);
  }, CEO_INTERVAL);
}

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}
