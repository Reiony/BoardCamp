import { connection } from "../database/db.js";
export async function getGames(req, res) {
  try {
    const gamesQuery = await connection.query("SELECT * from games;");
    res.send(gamesQuery.rows);
  } catch (err) {
    res.status(500).send({ message: "Failed to get games from database" });
  }
}

export async function createGames(req, res) {
  const { name, image, stockTotal, pricePerDay } = res.locals.game;
  try {
    await connection.query(
      'INSERT INTO games (name,image,"stockTotal","pricePerDay") VALUES ($1, $2, $3, $4)',
      [name, image, stockTotal, pricePerDay]
    );
    res.sendStatus(201);
  } catch (error) {
    const verifyErrors = error.details.map((e) => e.message);
    return res.status(400).send(verifyErrors);
  }
}
