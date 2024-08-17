const fs = require('fs');
const path = require('path');
const home = require('../keyboards/home');

// Fayl yo'li
const dataFilePath = path.join(__dirname, 'qazoData.json');

// Ma'lumotlarni fayldan yuklash
const loadQazoData = () => {
    if (fs.existsSync(dataFilePath)) {
        const data = fs.readFileSync(dataFilePath, 'utf-8');
        return JSON.parse(data);
    }
    return {};
};

// Ma'lumotlarni faylga saqlash funksiyasi
const saveQazoData = (data) => {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};

// Ma'lumotlarni fayldan o'chirish
const deleteUserData = (chatId, data) => {
    delete data[chatId];
    saveQazoData(data);
};

module.exports = (bot) => {
    let qazoData = loadQazoData();

    bot.on("message", (msg) => {
        const chatId = msg.chat.id;
        const text = msg.text;

        // Foydalanuvchi ma'lumotlarini tayinlash
        if (!qazoData[chatId]) {
            qazoData[chatId] = {
                bomdodCount: 0,
                peshinCount: 0,
                asrCount: 0,
                shomCount: 0,
                xuftonCount: 0,
                vitrCount: 0
            };
        }

        // "Qazolarni sanab borish" tugmasi bosilganda
        if (text === "Qazolarni sanab borish.") {
            const option = {
                reply_to_message_id: msg.message_id,
                parse_mode: "markdown",
                reply_markup: JSON.stringify({
                    resize_keyboard: true,
                    keyboard: [
                        [`Bomdod`, `Peshin`],
                        [`Asr`, `Shom`],
                        [`Xufton`, `Vitr`],
                        [`Hisob`, `Tozalash`, `⬅️Ortga`] // Added "Tozalash" button
                    ]
                })
            };
            bot.sendMessage(chatId, `Qazosini o'qigan namozingizni tanlang`, option);
        }

        // Qazo sanash
        if (text === "Bomdod") {
            qazoData[chatId].bomdodCount++;
            saveQazoData(qazoData);
            bot.sendMessage(chatId, `Bomdod namozi uchun bir qazo sanaldi. Hozirda ${qazoData[chatId].bomdodCount} ta qazo bor.`);
        }
        if (text === "Peshin") {
            qazoData[chatId].peshinCount++;
            saveQazoData(qazoData);
            bot.sendMessage(chatId, `Peshin namozi uchun bir qazo sanaldi. Hozirda ${qazoData[chatId].peshinCount} ta qazo bor.`);
        }
        if (text === "Asr") {
            qazoData[chatId].asrCount++;
            saveQazoData(qazoData);
            bot.sendMessage(chatId, `Asr namozi uchun bir qazo sanaldi. Hozirda ${qazoData[chatId].asrCount} ta qazo bor.`);
        }
        if (text === "Shom") {
            qazoData[chatId].shomCount++;
            saveQazoData(qazoData);
            bot.sendMessage(chatId, `Shom namozi uchun bir qazo sanaldi. Hozirda ${qazoData[chatId].shomCount} ta qazo bor.`);
        }
        if (text === "Xufton") {
            qazoData[chatId].xuftonCount++;
            saveQazoData(qazoData);
            bot.sendMessage(chatId, `Xufton namozi uchun bir qazo sanaldi. Hozirda ${qazoData[chatId].xuftonCount} ta qazo bor.`);
        }
        if (text === "Vitr") {
            qazoData[chatId].vitrCount++;
            saveQazoData(qazoData);
            bot.sendMessage(chatId, `Vitr namozi uchun bir qazo sanaldi. Hozirda ${qazoData[chatId].vitrCount} ta qazo bor.`);
        }

        if (text === "Hisob") {
            // Qazo namozlari hisobini ko'rsatish
            bot.sendMessage(chatId, `Hozirgi hisob:\n` +
                `Bomdod: ${qazoData[chatId].bomdodCount} ta qazo\n` +
                `Peshin: ${qazoData[chatId].peshinCount} ta qazo\n` +
                `Asr: ${qazoData[chatId].asrCount} ta qazo\n` +
                `Shom: ${qazoData[chatId].shomCount} ta qazo\n` +
                `Xufton: ${qazoData[chatId].xuftonCount} ta qazo\n` +
                `Vitr: ${qazoData[chatId].vitrCount} ta qazo`);
        }

        if (text === "Tozalash") {
            deleteUserData(chatId, qazoData);
            bot.sendMessage(chatId, 'Sizning barcha ma\'lumotlaringiz o\'chirildi.');
            return; // Exit the function to avoid further processing
        }

        if (text === "⬅️Ortga") {
            const option = {
                reply_to_message_id: msg.message_id,
                parse_mode: "markdown",
                reply_markup: home
            };
            bot.sendMessage(chatId, `Bosh sahifadasiz!`, option);
        }
    });
};

