import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";

dotenv.config();

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });

// Command: /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `Welcome to Dalas Token! 🚀

📚 Available Commands:
/checkin - Daily reward (50 DKL)
/invite - Get referral link
/courses - View available courses
/balance - Check your tokens`);
});

// Command: /checkin
bot.onText(/\/checkin/, async (msg) => {
  const chatId = msg.chat.id;
  const userEmail = msg.from.id; // Use Telegram ID as email for simplicity

  try {
    // Award tokens (mock implementation)
    bot.sendMessage(chatId, "You've checked in! 50 DKL awarded.");

    // Log check-in in Firestore
    const userRef = db.collection("users").doc(userEmail);
    await userRef.update({
      lastCheckin: new Date().toISOString(),
      tokensEarned: admin.firestore.FieldValue.increment(50),
    });
  } catch (error) {
    bot.sendMessage(chatId, "Error processing check-in. Please try again.");
  }
});