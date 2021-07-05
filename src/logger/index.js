/* Implement 3rd party logger here or roll your own */

const {
  LOG_LEVEL = 'info',
} = process.env;

export default {
  debug: (msg) => {
    if (LOG_LEVEL.toLowerCase() === 'debug') {
      print(msg, 'DEBUG');
    }
  },
  info: (msg) => print(msg, 'INFO'),
  warn: (msg) => print(msg, 'WARN'),
  error: (msg) => print(msg, 'ERROR', true),
};

function print(msg, level, noParse = false) {
  const log = (typeof msg === 'object' && !noParse) ? JSON.parse(JSON.stringify(msg, undefined, 4)) : msg;
  console.log(`${level}: `);
  console.log(log);
}
