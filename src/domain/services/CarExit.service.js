import { CardRepo } from "../repositories";

class CarExistService {
  constructor(cardId) {
    this.cardId = cardId;
  }

  async exec() {
    try {
      const card = await CardRepo.findOneBy(
        { cardId: this.cardId },
        { leaned: false }
      );
      const lastExit = card.lastExit;
      if (!lastExit) return await this.dispatchExitEvent(card);
      let diff = (lastExit.getTime() - new Date().getTime()) / 1000;
      diff /= 60;
      if (diff <= 1) return { data: await card.populate("car").toObject() };
      return await this.dispatchExitEvent(card);
    } catch (err) {
      return { err };
    }
  }

  async dispatchExitEvent(card) {
    card.lastExit = new Date();
    card.credit = card.credit - 4;
    try {
      await card.save();
      return { data: await card.populate("car").toObject() };
    } catch (err) {
      return { err };
    }
  }
}

export default CarExistService;
