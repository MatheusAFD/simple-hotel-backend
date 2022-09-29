import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";

class HotelController {
  async getHotelsByCity(request: Request, response: Response) {
    const cityId = request.params.id;

    const hotels = await prismaClient.hotel.findMany({
      where: {
        cityId,
      },
      select: {
        name: true,
        bannerUrl: true,
        price: true,
        rooms: true,
        isOpen: true,
        breakfast: true,
        city: {
          select: {
            name: true,
            bannerUrl: true,
          },
        },
      },
    });

    return response.json(hotels);
  }

  async createHotelByCity(request: Request, response: Response) {
    const cityId = request.params.id;
    const body = request.body;

    const hotel = await prismaClient.hotel.create({
      data: {
        cityId,
        isOpen: body.isOpen,
        rooms: body.rooms,
        breakfast: body.breakfast,
        price: body.price,
        name: body.name,
        bannerUrl: body.bannerUrl,
        coordinates: body.coordinates.join(","),
      },
    });

    return response.status(201).json(hotel);
  }
}

export default new HotelController();
