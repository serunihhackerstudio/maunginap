Telegram = require('node-telegram-bot-api')
const token = '1234739216:AAHlqwvhG0boPK0bwRmtToZtfD_s6smdxKk';
const bot = new Telegram(token, { polling: true });
bot.sendMessage("530477611", "SELAMAT MALAM");
// bot.on('message', (msg) => {
//     const chatId = msg.chat.id;
//     var message = msg.text.toString();
//     dbot.get_response(message, function(err, result){
//         if(!err) {
//             bot.sendMessage(chatId, result)
//         }else{
//             console.log(err)
//         }
//     });
// });