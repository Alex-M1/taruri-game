// import { invoke } from '@tauri-apps/api/tauri';
import Game from './Engine/Game';
import LoadingScene from './scenes/LoadingScene';

// let greetInputEl: HTMLInputElement | null;
// let greetMsgEl: HTMLElement | null;

window.addEventListener('DOMContentLoaded', () => {
  // eslint-disable-next-line no-new
  new Game({ width: 700, height: 700, scenes: [LoadingScene] });
});

// async function greet() {
//   if (greetMsgEl && greetInputEl) {
//     // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
//     greetMsgEl.textContent = await invoke('greet', {
//       name: greetInputEl.value,
//     });
//   }
// }

// window.greet = greet;
