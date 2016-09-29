const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(err, conn) {
  conn.createChannel(function(err, ch) {
    const q = 'task_queue';
    ch.assertQueue(q, {durable: true});
    ch.prefetch(1);
    console.log('[*] Waiting for message in %s.', q);
    ch.consume(q, function(msg) {
      let secs = msg.content.toString().split('.').length - 1;
      console.log(" [x] Received %s", msg.content.toString());

      setTimeout(function() {
        console.log(" [x] Done");
      }, secs * 1000);
    }, {noAck: false});
  });
});
