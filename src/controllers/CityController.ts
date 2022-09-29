import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";

class CityController {
  async getCities(request: Request, response: Response) {
    const cities = await prismaClient.city.findMany({
      include: {
        _count: {
          select: {
            hotel: true,
            restaurant: true,
          },
        },
      },
    });

    return response.json(cities);
  }
}

export default new CityController();
