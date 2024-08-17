const TelegramBot = require('node-telegram-bot-api');
const botToken = '7180711339:AAEbUaGMME0yCIkRmCPrMiT06J2MxFMpD2M';
const bot = new TelegramBot(botToken, {polling: true});

// Route larni import qilish
require('./routes/start')(bot);
require('./routes/qazoCalculation')(bot);
require('./routes/qazoHowToRead')(bot);
require('./routes/qazoCount')(bot);
require('./saytlar/sayt')(bot);

console.log(`bot running...`);
