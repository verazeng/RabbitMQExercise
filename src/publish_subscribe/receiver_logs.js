const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(err, conn) {
  conn.createChannel(function(err, ch) {
    const ex = 'logs';
    ch.assertExchange(ex, 'fanout', {durable: false});

    ch.assertQueue('', {exclusive: true}, function(err, q) {
      console.log('[*] Waiting for message in %s.', q.queue);
      ch.bindQueue(q.queue, ex, '');
      ch.consume(q.queue, function(msg) {
        console.log(" [x] Received %s", msg.content.toString());
      }, {noAck: true});
    });
  });
});
