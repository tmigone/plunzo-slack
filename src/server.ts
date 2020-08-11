import * as express from 'express'
import { Application } from 'express'
import { IncomingWebhook } from '@slack/webhook'

// Env vars
const port: string = process.env.PORT ?? '3001'
const slackWebhookURL: string = process.env.SLACK_WEBHOOK_URL ?? ''

// Init
const app: Application = express()
const webhook = new IncomingWebhook(slackWebhookURL)

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Routes
app.get('/ping', (_req, res) => res.send('OK'))

app.post('/tx', async (req, res) => {
  for (const transaction of req.body.data) {
    const { institution, type, description, amount, coin } = transaction
    await webhook.send({
      text: `[${institution}] Type: ${type} - ${coin} ${amount}: ${description}`
    })
  }
  res.send('OK')
})

app.post('/balance', async (req, res) => {
  const { localBalance, foreignBalance } = req.body.data
  await webhook.send({
    text: `[PLUNZO] Local balance: ${localBalance} - Foreign balance ${foreignBalance}`
  })
  res.send('OK')
})

// Start server
app.listen(port, () => {
  console.log(`--- Slanzo ---`)
  console.log(`- Listening on port: ${port}`)
  console.log(`- Slack webhook URL: ${slackWebhookURL}`)
  
})