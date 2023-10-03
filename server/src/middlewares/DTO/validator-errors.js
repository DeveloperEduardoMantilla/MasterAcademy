import { validationResult } from "express-validator";

const verifyDTO = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const relevantErrors = {};

    errors.array().forEach((error) => {
      if (!relevantErrors[error.path]) {
        relevantErrors[error.path] = [];
      }
      relevantErrors[error.path].push(error.msg);
    });

    return res.status(400).send({ status: 400, message: relevantErrors });
  }

  return next();
};

export { verifyDTO };
