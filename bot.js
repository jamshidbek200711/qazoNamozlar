const TelegramBot = require('node-telegram-bot-api')
const botToken = '7180711339:AAEbUaGMME0yCIkRmCPrMiT06J2MxFMpD2M'
const bot = new TelegramBot(botToken, {polling: true})

const home = JSON.stringify({
    resize_keybord: true,
    keyboard: [
        [`Qazolarni hisoblash.`],
        [`Qazolar qanday o'qiladi?`],
        [`Qazolarni sanab borish.`]
    ]
});


bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id

    option = {
        reply_to_message_id: msg.message_id,
        parse_mode: "markdown",
        reply_markup: home
      }
    bot.sendMessage(chatId, `Assalamu alaykum. Bu Bot sizga Qazo namozlarini hisoblash va ularni qanday oqish haqida korsatmalar beradi.`, option)
})

bot.onText(/Qazolarni hisoblash./, (msg) => {
    const chatId = msg.chat.id
    const userId = msg.from.id;
    bot.sendMessage(chatId, `Bu erkaklarni qazo namozlarini yil boyicha aniqlab beradi. (Hisob 12 yoshingizdan boshlanadi.)`)
    // Foydalanuvchining tug'ilgan yilini so'rang
  bot.sendMessage(chatId, 'Tug\'ilgan yilingizni kiriting, masalan: 1990');

  // Foydalanuvchidan tug'ilgan yil ma'lumotini kuzatish uchun botni tinglash
  bot.once('message', (msg) => {
    const birthYear = parseInt(msg.text);

    if (!isNaN(birthYear)) {
      // Tug'ilgan yili uchun 12 yosh qo'shamiz
      const startingYear = birthYear + 12;

      // Foydalanuvchining namoz boshlagan yilini so'rang
      bot.sendMessage(chatId, 'Namoz oqishni boshlagan yilingizni kiriting, masalan: 2005');

      // Foydalanuvchidan namoz boshlagan yil ma'lumotini kuzatish uchun botni tinglash
      bot.once('message', (msg) => {
        const startingNamozYear = parseInt(msg.text);

        if (!isNaN(startingNamozYear) && startingNamozYear >= startingYear) {
          // Foydalanuvchi tomonidan kiritilgan yillarga qarab qazo namozlarni hisoblash
          const qazoCount = startingNamozYear - startingYear;

          // Natijani qaytarish
          bot.sendMessage(chatId, `Sizda ${qazoCount}yillik qazo namozi bor. Agar ularni qanday oqishni bilmasangiz [Qazolar qanday o'qiladi?]ni bosing.`);
        } else {
          bot.sendMessage(chatId, 'Noto\'g\'ri namoz boshlagan yili kiritildi, iltimos, qayta urinib koring!');
        }
      });
    } else {
      bot.sendMessage(chatId, 'Noto\'g\'ri tug\'ilgan yili kiritildi, iltimos, qayta urinib koring!');
    }
  });
});



console.log(`bot running...`);





