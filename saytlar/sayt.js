// bu yerda Foydali saytlar tugmasiga javob berish uchun kod
const home = require('../keyboards/home');
module.exports = (bot) => {
    bot.on("message", (msg) => {
        const chatId = msg.chat.id;
        const text = msg.text;
        const option2 = {
            reply_to_message_id: msg.message_id,
            parse_mode: "markdown",
            reply_markup: JSON.stringify({
                resize_keyboard: true,
                keyboard: [
                    [`Quran apps`, `Hadis apps`],
                    [`Manfaatli sayt`, `Kitoblar`],
                             ['⬅️Ortga']
                ]
            })
        };
            if(text == 'Foydali saytlar'){
                bot.sendMessage(chatId, `Kerakli tugmani tanlang.` ,option2)
        }

        // Quran apps tugmasiga javob berish
        if(text == 'Quran apps'){
            const data1 = '1. Quran book: https://play.google.com/store/apps/details?id=com.quran.labs.androidquran&hl=ru \n\n 2. Madina Mushafi: https://play.google.com/store/apps/details?id=com.isysway.mushaf&hl=en_US'
            bot.sendMessage(chatId, data1)
        }

        // Hadis apps tugmasi javob berish
        if(text == 'Hadis apps'){
            const data2 = '1. Hadis toplamlari sayti (uzbek): https://hadis.uz/ \n\n 2. Hadislar toplami ilovasi (english..): https://play.google.com/store/apps/details?id=com.greentech.hadith&hl=uz'
            bot.sendMessage(chatId, data2)
        }

        // Manfaatli sayt tugmasiga javob berish
        if(text == 'Manfaatli sayt'){
            const data3 = '1. IslomUz sayti: https://islam.uz/ \n\n 2. Zikr ahlidan sorang: https://savollar.islom.uz/ \n\n 3. Namoz vaqtlari: https://namozvaqti.uz/ \n\n 4. Fiqhi masalalar: https://fiqh.uz/'
            bot.sendMessage(chatId, data3)
        }

        // Kitoblar tugmasiga javob berish
        if(text == 'Kitoblar'){
            const data4 = '1. Elektron kitoblar:https://e-hilolnashr.uz/ \n\n 2. PDF kitoblar (telegram): https://t.me/KutubxonaAPK'
            bot.sendMessage(chatId, data4)
        }

        // ⬅️Ortga tugamsiga javob berish
        if (text === "⬅️Ortga.") {
            const option = {
            reply_to_message_id: msg.message_id,
            parse_mode: "markdown",
            reply_markup: home
        };
           bot.sendMessage(chatId, `Bosh sahifadasiz!`, option);
        }
    })
};
