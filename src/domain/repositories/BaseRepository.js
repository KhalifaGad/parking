class BaseRepo {
  constructor(model) {
    this._model = model;
  }

  async count(args) {
    return await this._model.countDocuments({ ...args });
  }

  async create(item, { leaned } = { leaned: true }) {
    return leaned
      ? await this._model.create(item).then((item) => item.toObject())
      : await this._model.create(item);
  }

  async findById(
    id,
    { leaned = true, populateFields } = { leaned: true, populateFields: [] }
  ) {
    if (!populateFields) populateFields = [];
    if (leaned)
      return this._model.findById(id).populate(populateFields.join(" ")).lean();
    return this._model.findById(id).populate(populateFields.join(" "));
  }

  async findOneBy(
    args,
    { leaned, populateFields } = { leaned: true, populateFields: [] }
  ) {
    if (leaned)
      return this._model
        .findOne({ ...args })
        .populate(populateFields.join(" "))
        .lean();
    return this._model.findOne({ ...args });
  }

  async update(id, data) {
    return this._model.findOneAndUpdate(
      { _id: id },
      { ...data },
      { new: true }
    );
  }

  async list(args, populateField = undefined) {
    return this._model
      .find({ ...args })
      .populate(populateField)
      .lean();
  }

  async delete(id) {
    return this._model.deleteOne({ _id: id });
  }
}

export { BaseRepo };
