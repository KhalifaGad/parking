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

      if (diff <= 1 && card.exitAttempts < 2) {
        card.exitAttempts = (card.exitAttempts ?? 0) + 1;
        await card.save({ validateBeforeSave: false });
        console.log(card.populated());
        return { data: await card.populate("car").execPopulate() };
      }
      return await this.dispatchExitEvent(card);
    } catch (err) {
      return { err };
    }
  }

  async dispatchExitEvent(card) {
    card.lastExit = new Date();
    card.credit = card.credit - 4;
    card.exitAttempts = 1;
    try {
      await card.save({ validateBeforeSave: false });
      return { data: await card.populate("car").execPopulate() };
    } catch (err) {
      return { err };
    }
  }
}

export default CarExistService;
