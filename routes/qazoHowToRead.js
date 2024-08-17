module.exports = (bot) => {
    bot.onText(/Qazolar qanday o'qiladi/, (msg) => {
        const chatId = msg.chat.id;
        bot.sendMessage(chatId, `Batafsil o'qish uchun saytga o'ting👉 https://islom.uz/namoz/1/#block88`);
    });
};
