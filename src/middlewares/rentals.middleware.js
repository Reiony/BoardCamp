import { connection } from "../database/db.js";
import { rentalsSchema } from "../schemas/rentals.schema.js";

export async function rentalsSchemaValidation(req, res, next) {
  const { customerId, gameId, daysRented } = req.body;

  try {
    const verifyGame = await connection.query(
      "SELECT * FROM games WHERE id = $1",
      [gameId]
    );

    if (verifyGame.rowCount === 0) {
      return res.sendStatus(400);
    }
    const rentalObject = {
      customerId,
      gameId,
      daysRented,
      rentDate: new Date(),
      originalPrice: daysRented * verifyGame.rows[0].pricePerDay,
      returnDate: null,
      delayFee: null,
    };

    const { error } = rentalsSchema.validate(rentalObject, {
      abortEarly: false,
    });
    if (error) {
      const verifyErrors = error.details.map((e) => e.message);
      return res.status(400).send(verifyErrors);
    }
    const CustomerExists = await connection.query(
      "SELECT * FROM customers WHERE id = $1",
      [customerId]
    );
    if (CustomerExists.rowCount === 0) {
      return res.sendStatus(400);
    }

    res.locals.rental = rentalObject;
    res.locals.game = verifyGame;
    next();
  } catch (err) {
    res.status(500).send(err.message);
  }
}
