const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(err, conn) {
  conn.createChannel(function(err, ch) {
    const ex = 'topic_logs';
    let args = process.argv.slice(2);

    let msg = args.slice(1).join(' ') || 'Hello World!';
    let key = (args.length > 0) ? args[0] : 'anonymous.info';

    ch.assertExchange(ex, 'topic', {durable: false});
    ch.publish(ex, key, new Buffer(msg));
    console.log(" [x] Sent %s: '%s'", key, msg);
  });

  setTimeout(function() { conn.close(); process.exit(0) }, 500);
});