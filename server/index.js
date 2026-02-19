import express from 'express'
import cors from 'cors'
import fs from 'fs/promises'
import path from 'path'

const app = express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 4000

app.get('/api/destinos', async (req, res) => {
  try {
    const mod = await import('../src/paginas/paisesData.js')
    const data = mod.default || []
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: String(err) })
  }
})

const quotesFile = path.join(process.cwd(), 'server', 'data', 'quotes.json')

app.post('/api/quotes', async (req, res) => {
  const quote = { ...req.body, date: new Date().toISOString() }
  try {
    await fs.mkdir(path.dirname(quotesFile), { recursive: true })
    let existing = []
    try {
      const content = await fs.readFile(quotesFile, 'utf8')
      existing = JSON.parse(content)
    } catch (e) {
      existing = []
    }
    existing.push(quote)
    await fs.writeFile(quotesFile, JSON.stringify(existing, null, 2), 'utf8')
    res.status(201).json({ success: true })
  } catch (err) {
    res.status(500).json({ error: String(err) })
  }
})

app.listen(PORT, () => console.log(`API server listening on http://localhost:${PORT}`))
