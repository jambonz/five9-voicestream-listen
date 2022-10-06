const router = require('express').Router();
const WebhookResponse = require('@jambonz/node-client').WebhookResponse;

router.post('/', (req, res) => {
  const {logger} = req.app.locals;
  logger.debug({payload: req.body}, 'POST /listen');
  try {
    const app = new WebhookResponse();
    app.listen({
      url: process.env.LISTEN_URL,
      passDtmf: true,
      metadata: {
        foo: 'bar'
      }
    });
    res.status(200).json(app);
  } catch (err) {
    logger.error({err}, 'Error');
    res.sendStatus(503);
  }
});

module.exports = router;
