// config.js
require('dotenv').config();

module.exports = {
  // Bot Basic Configuration
  BOT_SETTINGS: {
    NAME: process.env.BOT_NAME || "Brovhi MD",
    PREFIX: process.env.PREFIX || "!",
    SESSION_NAME: process.env.SESSION_NAME || "brovhi-md-session",
    WORK_TYPE: process.env.WORK_TYPE || "public", // public/private
    MAX_UPLOAD_SIZE: process.env.MAX_UPLOAD_SIZE || 100, // in MB
    LANG: process.env.BOT_LANGUAGE || "EN"
  },

  // Owner Configuration
  OWNER: {
    NAME: process.env.OWNER_NAME || "Brovhi Owner",
    NUMBER: process.env.OWNER_NUMBER || "923308437581@s.whatsapp.net",
    SOCIAL_MEDIA: {
      YOUTUBE: process.env.YT_CHANNEL || "https://www.youtube.com/@HassanBrohi-cd7xp",
      TELEGRAM: process.env.TG_CHANNEL || "https://whatsapp.com/channel/0029Vb35klIICVfpFtp1xN3S",
      WHATSAPP_GROUP: process.env.WA_GROUP || "https://chat.whatsapp.com/FnwXqp57x8P7qTCxOG05sN"
    }
  },

  // API Configuration
  API_KEYS: {
    OPENAI: process.env.OPENAI_KEY || "sk-your-openai-key",
    GOOGLE: process.env.GOOGLE_API_KEY || "your-google-key",
    DEEPAI: process.env.DEEPAI_KEY || "your-deepai-key",
    REMOVEBG: process.env.REMOVEBG_KEY || "your-removebg-key"
  },

  // Database Configuration
  DATABASE: {
    MONGODB_URI: process.env.MONGODB_URI || "mongodb://localhost:27017/brovhi-md",
    OPTIONS: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: false,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000
    }
  },

  // Feature Toggles
  FEATURES: {
    WELCOME_MESSAGE: process.env.WELCOME_MSG || true,
    GOODBYE_MESSAGE: process.env.GOODBYE_MSG || true,
    ANTI_SPAM: process.env.ANTI_SPAM || true,
    NSFW_FILTER: process.env.NSFW_FILTER || false,
    AUTO_BIO: process.env.AUTO_BIO || false,
    AUTO_READ_MSGS: process.env.AUTO_READ || true
  },

  // Message Customization
  MESSAGES: {
    WELCOME: "👋 Welcome {user} to {group}!",
    GOODBYE: "😢 Goodbye {user}!",
    GROUP_ONLY: "❌ This command only works in groups!",
    OWNER_ONLY: "⚠️ This command is restricted to owner only!",
    ERROR: "⚠️ Error occurred: {error}"
  },

  // Security Configuration
  SECURITY: {
    MAX_LOGIN_ATTEMPTS: 3,
    ALLOWED_IPS: process.env.ALLOWED_IPS ? process.env.ALLOWED_IPS.split(',') : [],
    COMMAND_COOLDOWN: 2000 // milliseconds
  },

  // Server Configuration
  SERVER: {
    HOST: process.env.HOST || "localhost",
    PORT: process.env.PORT || 3000,
    SSL: {
      ENABLED: process.env.SSL_ENABLED || false,
      KEY: process.env.SSL_KEY_PATH || "",
      CERT: process.env.SSL_CERT_PATH || ""
    }
  },

  // Module Configuration
  MODULES: {
    AI_CHAT: {
      ENABLED: true,
      PROVIDER: "openai", // openai/bard
      MODEL: "gpt-3.5-turbo",
      TEMPERATURE: 0.7
    },
    DOWNLOADER: {
      YOUTUBE: true,
      INSTAGRAM: true,
      TIKTOK: false
    }
  },

  // Admin/Developer List
  ADMINS: process.env.ADMINS ? process.env.ADMINS.split(',') : [],
  DEVELOPERS: process.env.DEVELOPERS ? process.env.DEVELOPERS.split(',') : [],

  // Ban System
  BANNED: {
    USERS: process.env.BANNED_USERS ? process.env.BANNED_USERS.split(',') : [],
    GROUPS: process.env.BANNED_GROUPS ? process.env.BANNED_GROUPS.split(',') : []
  },

  // Global Variables
  GLANG: {
    TIMEZONE: process.env.TZ || "Asia/Pakistan",
    COUNTRY: process.env.COUNTRY_CODE || "LK",
    WEBSITE: process.env.BOT_WEBSITE || "https://brovhi.example.com"
  }
};
