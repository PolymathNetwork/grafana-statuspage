'use strict';

const logger = require('../logger'),
  statuspage = require('../statuspage');

const STATUS_MAPPING = {
  alerting: 'partial_outage',
  ok: 'operational',
  no_data: 'major_outage',
  paused: 'degraded_performance'
};

const receiveWebhook = (req, res) => {
  let status = STATUS_MAPPING[String(req.body.state).toLowerCase()];

  logger.info(`State come from the grafana is : ${String(req.body.state).toLowerCase()} and application mapped that state with status ${status}`);

  if (!status) {
    logger.warn(`Status ${req.body.state} not found in mapping.`);

    status = 'degraded_performance';
  }

  if (req.params.status && req.body.state === 'alerting') {
    status = req.params.status;
  }

  logger.info(`Updating ${req.params.componentId} component to ${status} status.`);

  return statuspage.postUpdate(req.params.componentId, status)
    .then(() => res.sendStatus(200))
    .catch(err => {
      logger.warn('Failed to post an update to StatusPage.io', err);

      res.sendStatus(200);
    });
};

module.exports = {
  receiveWebhook
};
