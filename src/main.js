import '@/scss/style.scss';

import '@/js/test';
import Seat from '@/js/components/seat';

document.querySelector('.js-c-seatBooking').innerHTML = `
  <h1>Movie Seat booking</h1>
  <div class="c-seatBooking__seats js-c-seatBooking__seats"></div>
`
new Seat('.js-c-seatBooking__seats');

