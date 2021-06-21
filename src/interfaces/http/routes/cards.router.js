import { Router } from "express";
import asyncHandler from "express-async-handler";
import { CardsController } from "../controllers";

const cardsRouter = Router();

cardsRouter
  .route("/:cardId")
  .get(asyncHandler(asyncHandler(CardsController.get("getCard", "cardId"))));

cardsRouter
  .route("/:cardId/exit-events")
  .post(asyncHandler(CardsController.exitEvent));

export { cardsRouter };
