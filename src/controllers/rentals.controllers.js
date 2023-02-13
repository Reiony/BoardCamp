import { connection } from "../database/db.js";
export async function getRentals(req, res) {
  try {
    const Rentals = await connection.query(
      `SELECT rentals.*,
      customers.id AS "id_customer",
      customers.name AS "name_customer",
      games.id AS "game_id",
      games.name AS "game_name"
      FROM rentals 
      JOIN customers ON customers.id=rentals."customerId"
      JOIN games ON games.id=rentals."gameId"`
    );
    const RentalsListed = Rentals.rows.map((re) => {
      return {
        id: re.id,
        customerId: re.customerId,
        gameId: re.gameId,
        rentDate: re.rentDate,
        daysRented: re.daysRented,
        returnDate: re.returnDate,
        originalPrice: re.originalPrice,
        delayFee: re.delayFee,
        customer: {
          id: re.id_customer,
          name: re.name_customer,
        },
        game: {
          id: re.game_id,
          name: re.game_name,
        },
      };
    });
    res.status(201).send(RentalsListed);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function postRentals(req, res) {
  const {
    customerId,
    gameId,
    daysRented,
    rentDate,
    originalPrice,
    returnDate,
    delayFee,
  } = res.locals.rental;
  try {
    await connection.query(
      `INSERT INTO rentals ("customerId", "gameId", "daysRented","rentDate","originalPrice","returnDate","delayFee") VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        customerId,
        gameId,
        daysRented,
        rentDate,
        originalPrice,
        returnDate,
        delayFee,
      ]
    );
    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function returnGame(req, res){
    const {id} = req.params;

    try {
        const findRentals = await connection.query("SELECT * FROM rentals WHERE id=$1",[id]);
        const rental = findRentals.rows[0];
        if (rental.rowCount ===0){
            return res.sendStatus(404);
        }
        if (rental.returnDate){
            return res.sendStatus(400);
        }
        const CurrentTimeDifference = Date.now() - Date.now(rental.rentDate);
        const Today = Date.now();
        const CTDInDays = Math.floor(CurrentTimeDifference/(24*60*60*1000));

        let delayFee = 0;
        if (CTDInDays>rental.daysRented){
            const delayInDays = CTDInDays - rental.daysRented;
            delayFee = delayInDays * rental.originalPrice;
        }

        await connection.query(`UPDATE rentals SET "returnDate" = $1, "delayFee" = $2, WHERE id = $3`,[Today,delayFee,id])

        res.sendStatus(200);

    } catch (err){
        res.status(500).send(err.message);
    }
}



export async function removeRentals(req, res){
    const {id}=req.params;

    try{
        const rentals=await connection.query(
            "SELECT * FROM rentals WHERE id=$1",
            [id]
        );

        const rental=rentals.rows[0];

        if(rentals.rowCount===0){
            return res.sendStatus(404);
        }
            
        if(!rental.returnDate){
            return res.sendStatus(400);
        }

        await connection.query(
            "DELETE FROM rentals WHERE id=$1",
            [id]
        )

        res.sendStatus(200);
    }catch(error){
        res.status(500).send(error.message);
    }
}