const home = require('../keyboards/home');

module.exports = (bot) => {
    bot.onText(/\/start/, (msg) => {
        const chatId = msg.chat.id;
    
        option = {
            reply_to_message_id: msg.message_id,
            parse_mode: "markdown",
            reply_markup: home
        };
        bot.sendMessage(chatId, `Assalamu alaykum. Bu Bot sizga Qazo namozlarini hisoblash, ularni qanday oqish haqida korsatmalar beradi va bir qancha foydali sayt va dasturlarni havola qiladi. `, option);
    });
};
