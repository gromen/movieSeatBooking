export default class Seat {
  CSS_SEAT_SELECTED = 'c-seatBooking__seat--selected';
  CSS_SEAT_OCCUPIED = 'c-seatBooking__seat--occupied';
  ALL_SEATS_AMOUNT = 40;

  container:HTMLElement | null;
  seats:Array<HTMLElement>;

  constructor(classContainer: string) {
    this.container = document.querySelector(classContainer);
    this.mountAllSeats();
    this.seats = [...this.container!.querySelectorAll('.js-c-seatBooking__seat')] as Array<HTMLElement>;
  }

  mount() {
    this.mountOccupiedSeats();
    this.attachEvents();
  }

  attachEvents() {
    this.seats.forEach(seat => seat.addEventListener('click', () => {
      if (seat.classList.contains(this.CSS_SEAT_OCCUPIED)) {
        return;
      }

      this.clickHandler(seat);
    }))
  }

  clickHandler = (seat) => seat.classList.contains(this.CSS_SEAT_SELECTED) ?
    seat.classList.remove(this.CSS_SEAT_SELECTED) :
    seat.classList.add(this.CSS_SEAT_SELECTED);

  mountAllSeats() {
    let seat;

    for (let i = 0; i < this.ALL_SEATS_AMOUNT; i++) {
      seat = document.createElement('div');
      seat.setAttribute('class', 'c-seatBooking__seat js-c-seatBooking__seat');
      this.container!.appendChild(seat);
    }
  }

  mountOccupiedSeats() {
    for (let i = 0; i < this.ALL_SEATS_AMOUNT; i++) {
      this.seats[Math.floor(Math.random() * 39 + 1)].classList.add(this.CSS_SEAT_OCCUPIED);
    }
  }
}
