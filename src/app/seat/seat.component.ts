import { Component } from '@angular/core';

interface Seat {
  number: number;
  available: boolean;
}

@Component({
  selector: 'app-seat',
  templateUrl: './seat.component.html',
  styleUrls: ['./seat.component.css']
})
export class SeatComponent {
  requestedSeats: number = 1;
  coach: Seat[][] = [];

  constructor() {
    this.initSeats();
  }

  initSeats() {
    // Initialize 80 seats with availability
    for (let i = 0; i < 10; i++) {
      this.coach.push(Array.from({ length: 7 }, (_, idx) => ({
        number: i * 7 + idx + 1,
        available: true,
      })));
    }
    this.coach.push(Array.from({ length: 3 }, (_, idx) => ({
      number: 71 + idx,
      available: true,
    })));
  }

  reserveSeats() {
    const result = this.bookSeats(this.requestedSeats);
    if (typeof result === 'string') {
      alert(result);
    } else {
      alert(`Reserved seats: ${result.map(seat => seat.number).join(', ')}`);
    }
  }

  bookSeats(requestedSeats: number): Seat[] | string {
    let reservedSeats: Seat[] = [];

    // Try booking in one row first
    for (let row of this.coach) {
      let availableSeats = row.filter(seat => seat.available);
      if (availableSeats.length >= requestedSeats) {
        reservedSeats = availableSeats.slice(0, requestedSeats);
        reservedSeats.forEach(seat => seat.available = false);
        return reservedSeats;
      }
    }

    // Book across multiple rows if needed
    for (let row of this.coach) {
      let availableSeats = row.filter(seat => seat.available);
      reservedSeats.push(...availableSeats);
      reservedSeats.forEach(seat => seat.available = false);
      if (reservedSeats.length >= requestedSeats) {
        return reservedSeats.slice(0, requestedSeats);
      }
    }

    return "Unable to reserve seats. Not enough seats available!";
  }
}
