import express from 'express'
const app = express()

app.use(express.json())

let numbers = [
    {
      id: 1,
      name: "Arto Hellas",
      number: "040-123456",
    },
    {
      id: 2,
      name: "Ada Lovelace",
      number: "39-44-5323523",
    },
    {
      id: 3,
      name: "Dan Abramov",
      number: "12-43-234345",
    },
    {
      id: 4,
      name: "Mary Poppendick",
      number: "39-23-6423122",
    }
  ]

  app.get('/api/persons', (request, response) => {
    response.json(numbers)
  })

  app.get('/info', (request, response) => {
    let amountOfNumbers = numbers.length
    let date = new Date()

    response.send("<p>Phonebook has info for " + amountOfNumbers + " people</p>" + "<p>" + date + "</p>")
    })

  app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = numbers.find(person => person.id === id)
    if (person) {
      response.json(person)
    } else {
      response.sendStatus(404);
    }
  })

  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    numbers = numbers.filter(number => number.id !== id)
    response.status(204).end()
  })

  const generateId = (max) => {
    const newId = Math.floor(Math.random() * max)
    return newId
  }
  
  app.post('/api/persons', (request, response) => {
    const body = request.body
  
    if (!body.name) {
      return response.status(400).json({ 
        error: 'Please give a name' 
      })
    }

    if (!body.number) {
      return response.status(400).json({ 
        error: 'Please give a number' 
      })
    }

    if (numbers.find(n => n.name === body.name)) {
      return response.status(400).json({ 
        error: 'Name is already in the numberbook' 
      })
    }
  
    const number = {  
      id: generateId(99999999),
      name: body.name,
      number: body.number
    }
  
    numbers = numbers.concat(number)
  
    response.json(number)
  })
  
  const PORT = 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })