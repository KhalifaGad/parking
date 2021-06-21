class BaseController {
  constructor(aggregate) {
    this.aggregate = aggregate;
  }

  create(createFunctionName = "create") {
    return async (req, res, next) => {
      const { err, data } = await this.aggregate[createFunctionName](req.body);
      if (err) next(err);
      return res.status(201).json(data);
    };
  }

  list(listFunctionName = "list", queryStrings = []) {
    return async (req, res, next) => {
      let filters = {};
      if (queryStrings.length > 0) {
        queryStrings.forEach((queryString) => {
          filters[queryString] = req.query[queryString];
        });
      }
      const { err, data } = await this.aggregate[listFunctionName](filters);
      if (err) next(err);
      return res.status(200).json(data);
    };
  }

  get(functionName = "get", queryParam = "id") {
    return async (req, res, next) => {
      const { err, data } = await this.aggregate[functionName](
        req.params[queryParam]
      );
      if (err) next(err);
      return res.status(200).json(data);
    };
  }

  update(functionName = "update", queryParam = "id") {
    return async (req, res, next) => {
      const { err, data } = await this.aggregate[functionName](
        req.params[queryParam],
        req.body
      );
      if (err) next(err);
      return res.status(200).json(data);
    };
  }

  delete(functionName = "delete", queryParam = "id") {
    return async (req, res, next) => {
      const { err } = await this.aggregate[functionName](
        req.params[queryParam]
      );
      if (err) return next(err);
      return res.status(202).send();
    };
  }
}

export default BaseController;
