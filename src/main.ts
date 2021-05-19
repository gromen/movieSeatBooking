import './scss/style.scss';

import './js/test';
import Seats from './js/components/seat';

document.querySelector('.js-c-seatBooking')!.innerHTML = `
  <h1>Movie Seat booking</h1>
  <div class="c-seatBooking__seats js-c-seatBooking__seats"></div>
  <div class="js-c-seatBooking__summary">You have selected {{SELECTED_SEATS}} for a price {{SELECTED_SEATS}}$</div>
`
new Seats('.js-c-seatBooking__seats').mount();
