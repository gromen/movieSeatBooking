export default class movieSeatBooking {
  CSS_SEAT_SELECTED = 'cinemaHall__seat--selected';
  CSS_SEAT_OCCUPIED = 'cinemaHall__seat--occupied';
  CSS_HIDDEN = 'd-none';
  ALL_SEATS_AMOUNT = 40;

  container: HTMLElement | null;
  seats: Array<HTMLElement> = [];
  seatsOccupiedAndSelected: Array<HTMLElement> = [];
  select: HTMLSelectElement | null;
  textSummary: HTMLElement | null;
  buttonOrder: HTMLButtonElement | null;

  constructor(classContainer: string) {
    this.container = document.querySelector(classContainer);

    if (!this.container) {
      return;
    }

    this.mountAllSeats();

    this.seats = [
      ...this.container!.querySelectorAll('.js-cinemaHall__seat'),
    ] as Array<HTMLElement>;
    this.select = document.querySelector('.js-cinemaHall__select');
    this.textSummary = <HTMLElement>(
      document.querySelector('.js-cinemaHall__summaryBooking')
    );
    this.buttonOrder = document.querySelector('.js-cinemaHall__btnBuy');

    this.retrieveSelectedSeatsAfterRefresh();
    this.updateTextSummary();
    this.attachEvents();
    this.btnOrderVisibilityHandler();
  }

  btnOrderVisibilityHandler() {
    return this.buttonOrder?.classList.toggle(
      this.CSS_HIDDEN,
      !this.seats.some((seat) =>
        seat.classList.contains(this.CSS_SEAT_SELECTED)
      )
    );
  }

  attachEvents() {
    this.seats.forEach((seat) =>
      seat.addEventListener('click', () => {
        if (!seat.classList.contains(this.CSS_SEAT_OCCUPIED)) {
          this.clickHandler(seat);
        }
      })
    );

    this.select?.addEventListener('change', this.selectOnChangeHandler, false);
    this.buttonOrder?.addEventListener(
      'click',
      this.btnOrderClickHandler,
      false
    );
  }

  clickHandler = (seat) => {
    seat.classList.toggle(
      this.CSS_SEAT_SELECTED,
      !seat.classList.contains(this.CSS_SEAT_SELECTED)
    );

    this.seatsOccupiedAndSelected.push(seat);
    console.log(this.seatsOccupiedAndSelected);
    this.btnOrderVisibilityHandler();

    this.updateTextSummary();
    this.selectedSeatsIndices();
  };

  selectOnChangeHandler = () => {
    this.updateTextSummary();
    this.updateOptionSelected();
  };

  mountAllSeats() {
    for (let i = 0; i < this.ALL_SEATS_AMOUNT; i++) {
      const seat = document.createElement('div');
      seat.setAttribute('class', 'cinemaHall__seat js-cinemaHall__seat');
      this.container!.appendChild(seat);
    }
  }

  get allSelectedLength() {
    return this.seats.filter((seat) => {
      seat.classList.contains(this.CSS_SEAT_SELECTED);
    }).length;
  }

  get optionSelectedValue() {
    return this.select!.value;
  }

  get optionSelectedIndex() {
    return this.select!.selectedIndex;
  }

  get selectedSeatIndices() {
    return [...document.querySelectorAll(`.${this.CSS_SEAT_SELECTED}`)].map(
      (seat) => this.seats.indexOf(seat as HTMLElement)
    );
  }

  get occupiedSeatIndices() {
    return [...document.querySelectorAll(`.${this.CSS_SEAT_OCCUPIED}`)].map(
      (seat) => this.seats.indexOf(seat as HTMLElement)
    );
  }

  getSelectedOption(index) {
    return (this.select!.selectedIndex = index);
  }

  getSelectedSeats = () => this.allSelectedLength;

  selectedSeatsIndices() {
    this.getSelectedOption(localStorage.getItem('optionSelectedIndex'));
    localStorage.setItem(
      'selectedSeatsIndices',
      JSON.stringify(this.selectedSeatIndices)
    );
  }

  btnOrderClickHandler = () => {
    if (this.selectedSeatIndices.length < 1) return;

    this.seats.forEach((seat, index) => {
      if (this.selectedSeatIndices.indexOf(index) > -1) {
        seat.classList.remove(this.CSS_SEAT_SELECTED);
        seat.classList.add(this.CSS_SEAT_OCCUPIED);
      }
      localStorage.setItem(
        'occupiedSeatIndices',
        JSON.stringify(this.occupiedSeatIndices)
      );
    });
  };

  retrieveSelectedSeatsAfterRefresh() {
    const selectedSeatsIndices = JSON.parse(
      <string>localStorage.getItem('selectedSeatsIndices')
    );
    const occupiedSeatIndices = JSON.parse(
      <string>localStorage.getItem('occupiedSeatIndices')
    );

    if (selectedSeatsIndices?.length > 0 || occupiedSeatIndices?.length > 0) {
      this.seats.forEach((seat, index) => {
        if (selectedSeatsIndices.indexOf(index) > -1) {
          seat.classList.add(this.CSS_SEAT_SELECTED);
        }

        if (
          occupiedSeatIndices.indexOf(index) > -1 ||
          selectedSeatsIndices.indexOf(index) > -1
        ) {
          seat.classList.remove(this.CSS_SEAT_SELECTED);
          seat.classList.add(this.CSS_SEAT_OCCUPIED);
          this.seatsOccupiedAndSelected.push(seat);
        }
      });
    }
  }

  updateOptionSelected() {
    localStorage.setItem('optionSelectedIndex', `${this.optionSelectedIndex}`);
  }

  updateTextSummary = () => {
    this.textSummary!.innerHTML = `You have selected ${this.getSelectedSeats()} for a price ${this.totalPrice()}$`;
  };

  totalPrice = () =>
    this.getSelectedSeats() * parseInt(this.optionSelectedValue, 10);
}
