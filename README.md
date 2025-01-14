# grafana-statuspage
Grafana-StatusPage.io connector

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/PolymathNetwork/grafana-statuspage)

Use the above button to create a new Heroku App to connect Grafana and StatusPage. You need to specify a `STATUSPAGE_API_KEY` and `STATUSPAGE_PAGE_ID` config settings in the newly created application.

## How to add a new alert

Use latest version of Grafana that enables the Alerting feature, then create a new Webhook notification. The url should follow this structure:

    https://yourapp.herokuapp.com/grafana/{componentId}

Where `componentId` is the id in your StatusPage.io component url.

By default on `alerting` webhook from Grafana, it will post a `partial_outage` to StatusPage. You can override the status in the url:

    https://yourapp.herokuapp.com/grafana/{componentId}/{status}

    e.g. https://yourapp.herokuapp.com/grafana/dja8902jx/major_outage
