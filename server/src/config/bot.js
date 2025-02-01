import TelegramBot from 'node-telegram-bot-api';
import axios from 'axios';

const token = process.env.TELEGRAM_TOKEN;
const bot = new TelegramBot(token, { polling: true });

// Command Handlers
bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  
  // Check if user exists in DB
  const user = await axios.get(`${process.env.API_URL}/users/${msg.from.id}`);
  
  if(!user.data) {
    return bot.sendMessage(chatId, 'Please complete signup at [YourWebsite] first!');
  }

  bot.sendMessage(chatId, `Welcome ${user.data.name}! 🚀
    
📚 Available Commands:
/checkin - Daily reward (50 DKL)
/invite - Get referral link
/courses - View available courses
/balance - Check your tokens`);
});

bot.onText(/\/checkin/, async (msg) => {
  const response = await axios.post(`${process.env.API_URL}/checkin`, {
    userId: msg.from.id
  });
  bot.sendMessage(msg.chat.id, response.data.message);
});

// Add other command handlers