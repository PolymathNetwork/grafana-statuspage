'use strict';

const logger = require('../logger'),
  statuspage = require('../statuspage');

const STATUS_MAPPING = {
  Alerting: 'degraded_performance',
  OK: 'operational'
};

const receiveWebhook = (req, res) => {
  let status = STATUS_MAPPING[req.body.state];

  if (!status) {
    logger.warn(`Status ${req.body.state} not found in mapping.`);

    status = 'operational';
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