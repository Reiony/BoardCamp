import { connection } from "../database/db.js";
export async function getCustomers(req, res) {
  try {
    const customersQuery = await connection.query("SELECT * from customers");
    res.send(customersQuery.rows);
  } catch (err) {
    res.status(500).send({ message: "Failed to get customers from database" });
  }
}

export async function newCustomer(req, res) {
  const { name, phone, cpf, birthday } = res.locals.customer;
  try {
    await connection.query(
      "INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4)",
      [name, phone, cpf, birthday]
    );
    res.sendStatus(201);
  } catch (error) {
    const verifyErrors = error.details.map((e) => e.message);
    return res.status(500).send(verifyErrors);
  }
}

export async function getCustomerbyId(req, res) {
  const { id } = req.params;

  try {
    const idSearch = await connection.query(
      "SELECT * FROM customers WHERE id=$1",
      [id]
    );
    if (idSearch.rowCount === 0) {
      return res.status(404).send({ message: "ID not Found!" });
    }
    res.send(idSearch.rows);
  } catch (err) {
    const verifyErrors = err.details.map((e) => e.message);
    return res.status(500).send(verifyErrors);
  }
}

export async function updateCustomer(req, res) {
  const { name, phone, cpf, birthday } = res.locals.customer;
  const { id } = req.params;

  try {
    await connection.query(
      "UPDATE customers SET name=$1, phone=$2, cpf=$3, birthday=$4 WHERE id=$5;",
      [name, phone, cpf, birthday, id]
    );
    return res.sendStatus(200);
  } catch (err) {
    const verifyErrors = err.details.map((e) => e.message);
    return res.status(500).send(verifyErrors);
  }
}
