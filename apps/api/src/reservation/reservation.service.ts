import { Injectable } from '@nestjs/common';

@Injectable()
export class ReservationService {
  private reservations: Array<{ id: string; name: string; date: Date }> = [];

  findAll() {
    return this.reservations;
  }

  create(data: { name: string; date: Date }) {
    const reservation = {
      id: crypto.randomUUID(),
      ...data,
    };

    this.reservations.push(reservation);

    return reservation;
  }
}
