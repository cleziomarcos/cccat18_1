import axios from "axios"

test("deve gerar o account id (uuid)", async () => {
  const response = await axios('http:localhost:3000/signup', {
    method: 'POST',
    data: {
      name: "Joe Doe",
      email: "joedoe@email.com",
      cpf: "14077977860",
      carPlate: "DVR9236",
      isPassenger: false,
      isDriver: true,
      password: "123456"
    }
  })
  .then(response => response)
  .catch(e => e.response)

  expect(response.status).toBe(201)
  expect(response.data.accountId).toBeTruthy()
})

test("deve validar o nome", async() => {
  const response = await axios('http:localhost:3000/signup', {
    method: 'POST',
    data: {
      name: "Jo",
      email: "joedoe@email.com",
      cpf: "14077977860",
      carPlate: "DVR9236",
      isPassenger: false,
      isDriver: true,
      password: "123456"
    }
  }).catch(e => e.response)

  expect(response.status).toBe(422)
  expect(response.data).toBe('Invalid name.')
}) 

test("deve validar o email", async() => {
  const response = await axios('http:localhost:3000/signup', {
    method: 'POST',
    data: {
      name: "Joe Doe",
      email: "joedoeemail.com",
      cpf: "14077977860",
      carPlate: "DVR9236",
      isPassenger: false,
      isDriver: true,
      password: "123456"
    }
  }).catch(e => e.response)

  expect(response.status).toBe(422)
  expect(response.data).toBe('Invalid email.')
}) 

test("deve validar o cpf", async() => {
  const response = await axios('http:localhost:3000/signup', {
    method: 'POST',
    data: {
      name: "Joe Doe",
      email: "joedoe@email.com",
      cpf: "2222222222222",
      carPlate: "DVR9236",
      isPassenger: false,
      isDriver: true,
      password: "123456"
    }
  }).catch(e => e.response)

  expect(response.status).toBe(422)
  expect(response.data).toBe('Invalid cpf.')
}) 

test("deve validar o car plate", async() => {
  const response = await axios('http:localhost:3000/signup', {
    method: 'POST',
    data: {
      name: "Joe Doe",
      email: "joedoe@email.com",
      cpf: "14077977860",
      carPlate: "DVR923A",
      isPassenger: false,
      isDriver: true,
      password: "123456"
    }
  }).catch(e => e.response)

  expect(response.status).toBe(422)
  expect(response.data).toBe('Invalid car plate.')
}) 

test("deve verificar se o email já existe e lançar um erro caso já exista", async () => {
  const response = await axios('http:localhost:3000/signup', {
    method: 'POST',
    data: {
      name: "Joe Doe",
      email: "joedoe@email.com",
      cpf: "14077977860",
      carPlate: "DVR9236",
      isPassenger: false,
      isDriver: true,
      password: "123456"
    }
  }).catch(e => e.response)

  expect(response.status).toBe(422)
  expect(response.data).toBe('Account already exists.')
})