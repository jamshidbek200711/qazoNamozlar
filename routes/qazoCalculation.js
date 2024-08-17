const home = require('../keyboards/home');               
               module.exports = (bot) => {
                   bot.on("message", (msg) => {
        const chatId = msg.chat.id;
        const text = msg.text;

        // Qazolarni hisoblash tugmasi bosilganda jinsni so'rash
        if (text === "Qazolarni hisoblash.") {
            const genderOptions = {
                reply_markup: {
                    keyboard: [
                        [{ text: "Erkak" }, { text: "Ayol" }],
                                   [{text: "⬅️Ortga."}],
                    ],
                    resize_keyboard: true,
                    one_time_keyboard: true,
                },
            };
            bot.sendMessage(chatId, 'Jinsingizni tanlang:', genderOptions);
        }

        // Erkaklar uchun hisoblash
        if (text === "Erkak") {
            bot.sendMessage(chatId, 'Tug\'ilgan yilingizni kiriting, masalan: 1990');
        
            bot.once('message', (msg) => {
                const birthYear = parseInt(msg.text);
        
                if (!isNaN(birthYear)) {
                    const startingYear = birthYear + 12;
        
                    bot.sendMessage(chatId, 'Namoz o\'qishni boshlagan yilingizni kiriting, masalan: 2005');
        
                    bot.once('message', (msg) => {
                        const startingNamozYear = parseInt(msg.text);
        
                        if (!isNaN(startingNamozYear) && startingNamozYear >= startingYear) {
                            const qazoCount = startingNamozYear - startingYear;
                            bot.sendMessage(chatId, `Sizda ${qazoCount} yillik qazo namozi bor.`);
                        } else {
                            bot.sendMessage(chatId, 'Noto\'g\'ri namoz boshlagan yili kiritildi, iltimos, qayta urinib ko\'ring!');
                        }
                    });
                } else {
                    bot.sendMessage(chatId, 'Noto\'g\'ri tug\'ilgan yili kiritildi, iltimos, qayta urinib ko\'ring!');
                }
            });
        }

        // Ayollar uchun hisoblash
        if (text === "Ayol") {
            bot.sendMessage(chatId, 'Tug\'ilgan yilingizni kiriting, masalan: 1990');
        
            bot.once('message', (msg) => {
                const birthYear = parseInt(msg.text);
        
                if (!isNaN(birthYear)) {
                    const startingYear = birthYear + 9;
        
                    bot.sendMessage(chatId, 'Namoz o\'qishni boshlagan yilingizni kiriting, masalan: 2005');
        
                    bot.once('message', (msg) => {
                        const startingNamozYear = parseInt(msg.text);
        
                        if (!isNaN(startingNamozYear) && startingNamozYear >= startingYear) {
                            const qazoCount = startingNamozYear - startingYear;
                            bot.sendMessage(chatId, `Sizda ${qazoCount} yillik qazo namozi bor.`);
                        } else {
                            bot.sendMessage(chatId, 'Noto\'g\'ri namoz boshlagan yili kiritildi, iltimos, qayta urinib ko\'ring!');
                        }
                    });
                } else {
                    bot.sendMessage(chatId, 'Noto\'g\'ri tug\'ilgan yili kiritildi, iltimos, qayta urinib ko\'ring!');
                }


            });
        }
        if (text === "⬅️Ortga.") {
            const option = {
           reply_to_message_id: msg.message_id,
           parse_mode: "markdown",
           reply_markup: home
   };
           bot.sendMessage(chatId, `Bosh sahifadasiz!`, option);
   }
    });
};
