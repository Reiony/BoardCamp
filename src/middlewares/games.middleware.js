import {connection} from "../database/db.js";
import {gamesSchema}  from "../schemas/games.schema.js";

export async function gamesSchemaValidation(req, res, next) {
    const game = req.body;
     const {error} = gamesSchema.validate(game,{ abortEarly: false });
     if (error){
        const verifyErrors = error.details.map((e)=>e.message);
        return res.status(400).send(verifyErrors);
     }
     const gameAlreadyExists = await connection.query("SELECT * FROM games WHERE name=$1;",[game.name]);
     console.log(gameAlreadyExists);
     if (gameAlreadyExists.rowCount!==0){
        return res.status(409).send({message:"Game Already Exists. Try to register another game"});
     }
     res.locals.game = game;
     next();
}
