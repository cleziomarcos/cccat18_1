import crypto from "crypto";
import pgp from "pg-promise";
import express from "express";
import { validateCpf } from "./validateCpf";
import { validateEmail } from "./validateEmail";

const app = express();
app.use(express.json());

function validateName(name: string) {
	return !!name.match(/[a-zA-Z] [a-zA-Z]+/)
}

function validateCarPlate(carPlate: string) {
	return !!carPlate.match(/[A-Z]{3}[0-9]{4}/)
}

app.post("/signup", async function (req, res) {
	try {
		const { name, email, cpf, carPlate, isPassenger, isDriver, password } = req.body
		if (!validateName(name)) throw new Error('Invalid name.')
		if (!validateEmail(email)) throw new Error('Invalid email.')
		if (!validateCpf(cpf)) throw new Error('Invalid cpf.')
		if (isDriver && !validateCarPlate(carPlate)) throw new Error('Invalid car plate.')
		
		const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
		const [account] = await connection.query("select * from ccca.account where email = $1", [email]);
		if (account) {
			await connection.$pool.end();
			throw new Error('Account already exists.')
		}
		const id = crypto.randomUUID();
		await connection.query("insert into ccca.account (accountId, name, email, cpf, carPlate, isPassenger, isDriver, password) values ($1, $2, $3, $4, $5, $6, $7, $8)", [
			id,
			name,
			email,
			cpf,
			carPlate,
			isPassenger,
			isDriver,
			password
		]);
		await connection.$pool.end();
		res.status(201).json({ accountId: id })
	} catch (e: any) {
		res.status(422).json(e.message)
	}
});

app.listen(3000);
