export default class movieSeatBooking{
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
  }

  mount() {
    this.retrieveSelectedSeatsAfterRefresh();
    this.updateTextSummary();
    this.attachEvents();
  }

  attachEvents() {
    this.seats.forEach(seat => seat.addEventListener('click', () => {
      if (!seat.classList.contains(this.CSS_SEAT_OCCUPIED)) {
        this.clickHandler(seat);
      }
    }));

    this.select?.addEventListener('change', this.selectOnChangeHandler, false);
  }

  clickHandler = (seat) => {
    seat.classList.toggle(this.CSS_SEAT_SELECTED, !seat.classList.contains(this.CSS_SEAT_SELECTED));

    this.updateTextSummary();
    this.selectedSeatsIndices();
  };

  selectOnChangeHandler = () => {
    this.updateTextSummary();
    this.updateOptionSelected();
    // this.saveMovieData(this.getSelectedSeats(), this.optionSelectedValue);
  }

  mountAllSeats() {
    for (let i = 0; i < this.ALL_SEATS_AMOUNT; i++) {
      const seat = document.createElement('div');
      seat.setAttribute('class', 'c-seatBooking__seat js-c-seatBooking__seat');
      this.container!.appendChild(seat);
    }
  }

  get allSelectedLength() {
    return this.seats.filter(seat => seat.classList.contains(this.CSS_SEAT_SELECTED)).length;
  }

  get optionSelectedValue() {
    return this.select!.value;
  }

  get optionSelectedIndex() {
    return this.select!.selectedIndex;
  }

  getSelectedOption(index)  {
    return this.select!.selectedIndex = index;
  }

  getSelectedSeats = () => this.allSelectedLength;

  selectedSeatsIndices() {
    const selectedSeats =
      document.querySelectorAll(`.${this.CSS_SEAT_SELECTED}, ${this.CSS_SEAT_OCCUPIED}`);
    console.log(selectedSeats);
    this.getSelectedOption(localStorage.getItem('optionSelectedIndex'));

    // @ts-ignore
    const selectedSeatsIndices = [...selectedSeats].map(seat => this.seats.indexOf(seat));
    console.log(selectedSeatsIndices);
    localStorage.setItem('selectedSeatsIndices', JSON.stringify(selectedSeatsIndices));

  }

  retrieveSelectedSeatsAfterRefresh() {
    const selectedSeatsIndices =
      JSON.parse(<string>localStorage.getItem('selectedSeatsIndices'));

    if (selectedSeatsIndices != null && selectedSeatsIndices.length > 0) {
      this.seats.forEach((seat, index) => {
        if (selectedSeatsIndices.indexOf(index) > -1) {
          seat.classList.add(this.CSS_SEAT_SELECTED);
        }
      });
    }
  }

  updateOptionSelected() {
    localStorage.setItem('optionSelectedIndex', `${this.optionSelectedIndex}`);
  }

  updateTextSummary = () => {
    this.textSummary!.innerHTML =
      `You have selected ${this.getSelectedSeats()} for a price ${this.totalPrice()}$`
  }

  totalPrice = () => this.getSelectedSeats() * parseInt(this.optionSelectedValue, 10)
}
