# :chart_with_upwards_trend::moneybag: Slanzo :moneybag::chart_with_upwards_trend:
**Slack integration for Plunzo webhooks**


## Before starting

You'll need the following:
- a [Plunzo](https://plunzo.com/) account
- a [Slack](https://api.slack.com/) developer account
- create a [slack app](https://api.slack.com/apps), enable `Incoming Webhooks` functionality and register a webhook for a channel. Copy and save the webhook URL for later (`SLACK_WEBHOOK_URL`)

## Run using npm

```bash
npm install
npm run build
SLACK_WEBHOOK_URL='<SLACK_WEBHOOK_URL>' npm run start
```

## Run using balena.io

```bash
balena push <YOUR_BALENA_APP> --dockerfile Dockerfile.template --env SLACK_WEBHOOK_URL='<SLACK_WEBHOOK_URL>'
```

## Run using Docker

```bash
sed 's/%%BALENA_MACHINE_NAME%%/amd64/' Dockerfile.template > Dockerfile
docker build -t slanzo .
docker run -p 3000:3000 -e SLACK_WEBHOOK_URL='<SLACK_WEBHOOK_URL>' slanzo
```

## Testing

Plunzo test webhooks can be triggered with this command:

```bash
./test/trigger.sh "<SERVER>" "<WEBHOOK>"
```

where server is the URL of the deployment (for example: `http://192.168.90.170:3000`) and `WEBHOOK` is one of:
- `INCOMING (default)`: "nuevo movimiento ingresante"
- `OUTGOING`: "nuevo movimiento saliente"
- `BALANCE`: "balance"
