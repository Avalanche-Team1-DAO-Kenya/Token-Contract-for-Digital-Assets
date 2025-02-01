import db from "../config/firebase.js";

export const signup = async (req, res) => {
  try {
    const userData = req.body;
    const userRef = db.collection("users").doc(userData.email);
    await userRef.set(userData);

    // Send Telegram notification
    const telegramResponse = await fetch(process.env.TELEGRAM_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: process.env.TELEGRAM_ADMIN_CHAT_ID,
        text: `New user signed up:\nName: ${userData.name}\nEmail: ${userData.email}\nC-Chain Address: ${userData.cChainAddress}`,
      }),
    });

    if (!telegramResponse.ok) {
      throw new Error("Failed to send Telegram notification");
    }

    res.status(201).json({ 
      success: true, 
      message: "Registration successful! Join our Telegram: t.me/DalasTokenEduBot" 
    });
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(400).json({ success: false, message: error.message });
  }
};