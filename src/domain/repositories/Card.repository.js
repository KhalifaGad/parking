import { BaseRepo } from "./BaseRepository";
import { CardModel } from "../entities";

class CardRepo extends BaseRepo {
  constructor() {
    super(CardModel);
  }
}

export default new CardRepo();
