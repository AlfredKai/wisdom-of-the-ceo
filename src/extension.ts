import * as http from 'http';
import * as vscode from 'vscode';

const CEO_SERVER = 'http://ceospeech.ddns.net/';
const CEO_INTERVAL = 1500000;

export function activate(context: vscode.ExtensionContext) {
  (async () => {
    try {
      await callCeo(true);
      const interval = setInterval(async () => {
        try {
          callCeo(false);
        } catch (err) {
          vscode.window.showErrorMessage('CEO現在忙碌中！');
          clearInterval(interval);
        }
      }, CEO_INTERVAL);
    } catch (err) {
      vscode.window.showErrorMessage('CEO現在忙碌中！');
    }
  })();
}

async function callCeo(first: boolean) {
  const msg = (await request(CEO_SERVER)) as string;
  if (first) {
    vscode.window.showInformationMessage('您的CEO已經上線！');
    vscode.window.showInformationMessage(msg);
    first = false;
  } else {
    vscode.window.showInformationMessage(msg);
  }
}

function request(url: string) {
  return new Promise((resolve, reject) => {
    http
      .get(url, (resp) => {
        let data = '';

        resp.on('data', (chunk) => {
          data += chunk;
        });

        resp.on('end', () => {
          resolve(data);
        });
      })
      .on('error', (err) => {
        reject(err);
      });
  });
}
