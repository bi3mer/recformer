import { randomInt } from "./util";

const IS_BROWSER = typeof window !== "undefined";
const sounds: HTMLAudioElement[] = [];

export function audioLoad(callback: () => void): void {
  if (IS_BROWSER) {
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
  } else {
    callback();
  }
}

export function audioCoin() {
  if (IS_BROWSER) {
    const coinIndex = randomInt(0, 4);
    sounds[coinIndex].currentTime = 0.15;
    sounds[coinIndex].play();
  }
}

export function audioLaser() {
  if (IS_BROWSER) {
    sounds[5].currentTime = 0;
    sounds[5].play();
  }
}

export function audioTurretFire() {}
