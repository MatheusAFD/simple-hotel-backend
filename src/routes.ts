import { Router } from "express";
import CityController from "./controllers/CityController";
import HotelController from "./controllers/HotelController";
import OrderController from "./controllers/OrderController";
import RestaurantControler from "./controllers/RestaurantControler";

const router = Router();

router.get("/cities", CityController.getCities);
router.get("/cities/:id/hotels", HotelController.getHotelsByCity);
router.get("/cities/:id/restaurants", RestaurantControler.getRestaurantsByCity);
router.get("/users/:id/orders", OrderController.getAllOrdersFromUser);
router.post("/cities/:id/hotels", HotelController.createHotelByCity);

export { router };
