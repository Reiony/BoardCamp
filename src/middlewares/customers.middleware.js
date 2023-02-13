import { customersSchema } from "../schemas/customers.schema.js";
import { connection } from "../database/db.js";

export async function validateCustomerSchema(req, res, next) {
  const customer = req.body;

  const { error } = customersSchema.validate(customer, { abortEarly: false });
  if (error) {
    const errorDetails = error.details.map((e) => e.message);
    return res.status(400).send({ errorDetails });
  }

  const cpfAlreadyExists = await connection.query(
    "SELECT * FROM customers WHERE cpf=$1",
    [customer.cpf]
  );

  if (cpfAlreadyExists.rowCount !== 0 &&
    cpfAlreadyExists.rows[0].id !== Number(req.params.id)) {
    return res
      .status(409)
      .send({ message: "Conflict: CPF is already in use." });
  }

  res.locals.customer = customer;
  next();
}
