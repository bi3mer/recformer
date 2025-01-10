import { randomInt } from "./util";

const sounds: HTMLAudioElement[] = [];

export function audioLoad(callback: () => void): void {
  sounds.push(new Audio("audio/coin_1.wav"));
  sounds.push(new Audio("audio/coin_2.wav"));
  sounds.push(new Audio("audio/coin_3.wav"));
  sounds.push(new Audio("audio/coin_4.wav"));
  sounds.push(new Audio("audio/coin_5.wav"));
  sounds.push(new Audio("audio/laser.wav"));

  const waitForAudioToLoad = () => {
    let audioLoaded = true;
    for (let i = 0; i < sounds.length; ++i) {
      if (!sounds[i].readyState) {
        console.log("here");
        audioLoaded = false;
        break;
      }
    }

    if (audioLoaded) {
      sounds[5].volume = 0.4;
      callback();
    } else {
      setTimeout(waitForAudioToLoad, 100);
    }
  };

  waitForAudioToLoad();
}

export function audioPlayCoin() {
  const coinIndex = randomInt(0, 4);
  sounds[coinIndex].currentTime = 0.15;
  sounds[coinIndex].play();
}

export function audioPlayLaser() {
  sounds[5].currentTime = 0;
  sounds[5].play();
}

export function audioPlayTurretFire() {}
