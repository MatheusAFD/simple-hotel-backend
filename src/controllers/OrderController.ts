import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";

class OrderController {
  async getAllOrdersFromUser(request: Request, response: Response) {
    const userId = request.params.id;

    const orders = await prismaClient.order.findMany({
      select: {
        hotel: {
          select: {
            name: true,
            price: true,
            isOpen: true,
            bannerUrl: true,
            city: true,
            order: {
              select: {
                createdAt: true,
              },
            },
          },
        },
      },
      where: {
        user: {
          id: userId,
        },
      },
    });

    return response.json(orders);
  }
}

export default new OrderController();
