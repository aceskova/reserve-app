import { Controller, Get, Post, Body } from '@nestjs/common';
import { ReservationService } from './reservation.service';

@Controller('reservations')
export class ReservationController {
  constructor(private reservationService: ReservationService) {}

  @Get()
  findAll() {
    return this.reservationService.findAll();
  }

  @Post()
  create(@Body() body: { name: string; date: string }) {
    return this.reservationService.create({
      name: body.name,
      date: new Date(body.date),
    });
  }
}
