import express from "express";
import {
  getAllTrips,
  addTrip,
  getTripById,
} from "../controllers/tripController.js";

const router = express.Router();

router.route("/trips").get(getAllTrips).post(addTrip);

// router.route("/:id/itineraries").get(getAllItinerary).delete(deleteItinerary);

router.route("/trips/:id").get(getTripById);

export default router;
