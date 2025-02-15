// new_mints.js
import WebSocket from 'ws';
import { processMint } from './main.js';

const ws = new WebSocket('wss://pumpportal.fun/api/data');

ws.on('open', () => {
  //console.log('Verbonden met PumpPortal WebSocket');
  const payload = { method: "subscribeNewToken" };
  ws.send(JSON.stringify(payload));
});

ws.on('message', (data) => {
  try {
    const message = JSON.parse(data);
    // Verwacht dat het minted adres in message.mint zit
    if (message && message.mint) {
      const mintedAddress = message.mint;
      //console.log('Ontvangen minted address:', mintedAddress);
      processMint(mintedAddress);
    } else {
      //console.log('Ontvangen bericht:', message);
    }
  } catch (err) {
    //console.error('Fout bij verwerken bericht:', err);
  }
});

ws.on('error', (err) => {
  //console.error('WebSocket fout:', err);
});

ws.on('close', () => {
  //console.log('WebSocket verbinding gesloten');
});
