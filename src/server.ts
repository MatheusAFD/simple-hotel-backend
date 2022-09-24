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
  });

  return response.json(hotels);
});

app.post("/cities/:id/hotels", async (request, response) => {
  const cityId = request.params.id;
  const body = request.body;

  const hotel = await prisma.hotel.create({
    data: {
      cityId,
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

app.listen(3333);
