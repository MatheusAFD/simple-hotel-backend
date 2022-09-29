import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";

class RestaurantController {
  async getRestaurantsByCity(request: Request, response: Response) {
    const cityId = request.params.id;

    const restaurants = await prismaClient.restaurants.findMany({
      include: {
        city: {
          select: {
            name: true,
          },
        },
      },
      where: {
        cityId,
      },
    });

    return response.json(restaurants);
  }
}

export default new RestaurantController();
