import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
const app = express();

app.use(express.json());
app.use(cors());

const prisma = new PrismaClient();

app.get("/cities", async (request, response) => {
  const cities = await prisma.city.findMany({
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
});

app.get("/cities/:id/hotels", async (request, response) => {
  const cityId = request.params.id;

  const hotels = await prisma.hotel.findMany({
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
});

app.post("/cities/:id/hotels", async (request, response) => {
  const cityId = request.params.id;
  const body = request.body;

  const hotel = await prisma.hotel.create({
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
});

app.get("/cities/:id/restaurants", async (request, response) => {
  const cityId = request.params.id;

  const restaurants = await prisma.restaurants.findMany({
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
});

app.get("/users/:id/orders", async (request, response) => {
  const userId = request.params.id;

  const orders = await prisma.order.findMany({
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
});

app.listen(3333);
