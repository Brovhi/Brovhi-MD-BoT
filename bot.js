require('dotenv').config();
const { WAConnection, MessageType } = require('@adiwajshing/baileys');
const qrcode = require('qrcode-terminal');
const mongoose = require('mongoose');

// Database Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Initialize WhatsApp Client
const client = new WAConnection();

// Session Handling
client.loadAuthInfo(process.env.SESSION_ID || 'session');

// Event Handlers
client.on('qr', qr => {
  qrcode.generate(qr, { small: true });
  console.log('Scan the QR code above');
});

client.on('open', () => {
  console.log('Connected to WhatsApp');
  console.log(`Bot Name: ${client.user.name}`);
});

client.on('chat-update', async (message) => {
  if (!message.hasNewMessage) return;
  const m = message.messages.all()[0];
  if (!m.message) return;
  
  await processMessage(m);
});

// Command Processor
async function processMessage(m) {
  const body = m.message.conversation || m.message.extendedTextMessage?.text || '';
  const sender = m.key.remoteJid;
  const prefix = process.env.PREFIX || '!';

  if (!body.startsWith(prefix)) return;

  const args = body.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  switch(command) {
    case 'ping':
      await client.sendMessage(sender, '🏓 Pong!', MessageType.text);
      break;

    case 'help':
      const helpText = `🌟 *Brovhi MD Bot Commands* 🌟
      
      ${prefix}ping - Check bot status
      ${prefix}info - Bot information
      ${prefix}sticker - Create sticker from image
      ${prefix}yt <url> - Download YouTube video`;
      await client.sendMessage(sender, helpText, MessageType.text);
      break;

    case 'sticker':
      if (m.message.imageMessage) {
        const media = await client.downloadMediaMessage(m);
        await client.sendMessage(sender, media, MessageType.sticker);
      }
      break;

    case 'info':
      const info = `🤖 *Bot Information*
      
      Owner: ${process.env.OWNER_NUMBER}
      Prefix: ${prefix}
      Version: 1.0.0
      Runtime: Node.js ${process.version}`;
      await client.sendMessage(sender, info, MessageType.text);
      break;

    // Add more commands here
  }
}

// Mention Handler
client.on('message', async (m) => {
  if (m.message.extendedTextMessage?.contextInfo?.mentionedJid?.includes(client.user.jid)) {
    await client.sendMessage(m.key.remoteJid, 'You mentioned me! 🚀', MessageType.text);
  }
});

// Group Join Handler
client.on('group-participants-update', async (update) => {
  if (update.action === 'add') {
    const welcomeMsg = `Welcome ${update.participants[0].split('@')[0]} to ${update.jid}!`;
    await client.sendMessage(update.jid, welcomeMsg, MessageType.text);
  }
});

// Error Handling
client.on('error', (err) => {
  console.error('Connection Error:', err);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

// Connect to WhatsApp
client.connect();
