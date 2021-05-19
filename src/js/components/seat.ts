export default class Seat {
  CSS_SEAT_SELECTED = 'c-seatBooking__seat--selected';
  CSS_SEAT_OCCUPIED = 'c-seatBooking__seat--occupied';
  ALL_SEATS_AMOUNT = 40;

  container:HTMLElement | null;
  seats:Array<HTMLElement>;
  select:HTMLSelectElement | null;
  textSummary:HTMLElement | null;

  constructor(classContainer: string) {
    this.container = document.querySelector(classContainer);
    this.mountAllSeats();
    this.seats = [...this.container!.querySelectorAll('.js-c-seatBooking__seat')] as Array<HTMLElement>;
    this.select = document.querySelector('#selectMovie');
    this.textSummary = <HTMLElement> document.querySelector('.js-c-seatBooking__summary');
    // @ts-ignore
  }

  mount() {
    this.updateTextSummary();
    this.mountOccupiedSeats();
    this.attachEvents();
    this.totalPrice;
  }

  attachEvents() {
    this.seats.forEach(seat => seat.addEventListener('click', () => {
      if (seat.classList.contains(this.CSS_SEAT_OCCUPIED)) {
        return;
      }

      this.clickHandler(seat);
    }));

    this.select?.addEventListener('change', this.selectOnChangeHandler);
  }

  clickHandler = (seat) => {
    if (seat.classList.contains(this.CSS_SEAT_SELECTED)) {
      seat.classList.remove(this.CSS_SEAT_SELECTED);
    } else {
      seat.classList.add(this.CSS_SEAT_SELECTED);
    }

    this.updateTextSummary();
    this.saveMovieData(this.getSelectedSeats(), this.selectValue);
  };

  selectOnChangeHandler = () => {
    this.updateTextSummary();
    this.saveMovieData(this.getSelectedSeats(), this.selectValue);
  }

  mountAllSeats() {
    for (let i = 0; i < this.ALL_SEATS_AMOUNT; i++) {
      const seat = document.createElement('div');
      seat.setAttribute('class', 'c-seatBooking__seat js-c-seatBooking__seat');
      this.container!.appendChild(seat);
    }
  }

  mountOccupiedSeats() {
    for (let i = 0; i < this.ALL_SEATS_AMOUNT; i++) {
      this.seats[Math.floor(Math.random() * 39 + 1)].classList.add(this.CSS_SEAT_OCCUPIED);
    }
  }

  setSelected(seats) {
    return seats.filter(seat => seat.classList.contains(this.CSS_SEAT_SELECTED)).length;
  }

  getSelectedSeats = () => this.setSelected(this.seats);

  saveMovieData(selectedIndex, selectedPrice) {
    localStorage.setItem('selectedMovieIndex', selectedIndex);
    localStorage.setItem('selectedMoviePrice', selectedPrice);
  }

  get selectValue() {
    return this.select!.value;
  }

  updateTextSummary = () => {
    this.textSummary!.innerHTML = `You have selected ${this.getSelectedSeats()} for a price ${this.totalPrice()}$`
  }

  totalPrice = () => this.getSelectedSeats() * parseInt(this.selectValue, 10)
}
