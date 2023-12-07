import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.getElementById('vimeo-player');
const player = new Player(iframe);

player.ready().then(() => {
  const storedTime = localStorage.getItem('videoplayer-current-time');
  if (storedTime) {
    player.setCurrentTime(parseFloat(storedTime));
  }

  const updateLocalStorage = throttle(() => {
    player.getCurrentTime().then(time => {
      localStorage.setItem('videoplayer-current-time', time);
    });
  }, 1000);

  player.on('timeupdate', updateLocalStorage);
});
