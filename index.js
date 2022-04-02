const { Telegraf, Markup } = require('telegraf')

const keyboard = Markup.inlineKeyboard([
  Markup.button.url('❤️', 'http://telegraf.js.org'),
  Markup.button.callback('Delete', 'delete')
])

const bot = new Telegraf('543688025:AAGkD3QLpEuhqG4w9KVvNSF8gqlPagXbjOQ_____')
bot.start((ctx) => {
  ctx.reply('Привет. Рады видеть вас в нашем боте. Пожалуйста, идентифицируйте себя, нажав команду /identify');
});
bot.help((ctx) => {
  console.log(ctx.chat);
  ctx.telegram.sendMessage(ctx.chat.id, 'справка');
})

bot.command('test', (ctx) => {
  console.log('chatId', ctx.chat.id);
});

bot.command('identify', (ctx) => {
  console.log('chatId', ctx.chat.id);                           
  ctx.reply("Пожалуйста, идентфицируйте себя, нажав на кноку ниже.", {
    reply_markup: {
      keyboard: [
        [
          {
            text: "📲 отправить номер телефона",
            request_contact: true,
          },
        ],
      ],
      one_time_keyboard: true,
    },
  });
});

bot.command('image', (ctx) => {
  ctx.telegram.sendPhoto(ctx.chat.id, 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/220px-Cat03.jpg');  
})


bot.on('message', async (ctx) => {
  console.log('message', JSON.stringify(ctx));
  console.log('message', ctx);


  let message_type = "";
  let keys = Object.keys(ctx.message);
  
  if (keys.includes("text")) {
    message_type = "text";
  } else if (keys.includes("sticker")) {
    message_type = "sticker";
  } else if (keys.includes("photo")) {
    message_type = "photo";
  } else if (keys.includes("voice")) {
    message_type = "voice";
  } else if (keys.includes("document")) {
    message_type = "document";
  }
  console.log(`Message Type is: ${message_type}`);

  if (message_type === 'document') {
    const obj = ctx.message.document;
    console.log('obj document', obj);
    const link = await ctx.telegram.getFileLink(obj.file_id);
    console.log('link', link);
  }

  ctx.telegram.sendCopy(ctx.message.chat.id, ctx.message, keyboard)
})

bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))