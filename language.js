// language.js
module.exports = {
  LANG: {
    // English (Default)
    EN: {
      GREETINGS: {
        WELCOME: "👋 Welcome {user} to {group}!",
        GOODBYE: "😢 Goodbye {user}!",
        OWNER_CONTACT: "Contact owner: {owner}"
      },
      COMMANDS: {
        HELP_HEADER: "🌟 *Brovhi MD Bot Commands* 🌟\n",
        HELP_FOOTER: "\n📚 Total Commands: {count}",
        COMMAND_LIST: [
          { cmd: "!help", desc: "Show all commands" },
          { cmd: "!sticker", desc: "Create sticker from image" },
          { cmd: "!yt <url>", desc: "Download YouTube video" },
          { cmd: "!ai <query>", desc: "Chat with AI" },
          { cmd: "!groupinfo", desc: "Show group details" }
        ],
        OWNER_ONLY: "🚫 This command is only for bot owner!",
        ADMIN_ONLY: "⚠️ This command requires admin privileges!"
      },
      ERRORS: {
        GENERAL: "❌ Error occurred: {error}",
        WRONG_USAGE: "⚠️ Wrong command usage! Correct format: {syntax}",
        MEDIA_MISSING: "📷 Please send/reply to an image/video!",
        DOWNLOAD_FAIL: "⏬ Failed to download media",
        API_FAIL: "🌐 API connection failed"
      },
      GROUP: {
        PROMOTE: "🎉 {user} promoted to admin!",
        DEMOTE: "🔻 {user} demoted from admin",
        WARN: "⚠️ Warning: {reason}",
        LINK: "🔗 Group link: {link}"
      },
      OWNER: {
        BROADCAST: "📢 Broadcast sent to {count} users",
        MAINTENANCE: "🔧 Maintenance mode {status}",
        EVAL_RESULT: "📝 Evaluation result:\n{result}"
      },
      FUN: {
        QUOTE: "💬 Today's quote:\n{quote}",
        MEME: "🎲 Random meme:\n{url}",
        FACT: "📚 Did you know?\n{fact}"
      }
    },

    // Sinhala (SI)
    SI: {
      GREETINGS: {
        WELCOME: "👋 ආයුබෝවන් {user} {group} ගෲපයට!",
        GOODBYE: "😢 ආයුබෝවන් {user}!",
        OWNER_CONTACT: "හිමිකරුට අමතන්න: {owner}"
      },
      // ... other Sinhala translations
    },

    // Spanish (ES)
    ES: {
      GREETINGS: {
        WELCOME: "👋 ¡Bienvenido {user} a {group}!",
        GOODBYE: "😢 ¡Adiós {user}!",
        OWNER_CONTACT: "Contactar al propietario: {owner}"
      },
      // ... other Spanish translations
    }
  },

  // Default language
  DEFAULT_LANG: "EN",

  // Language detection
  getLanguage: function(langCode) {
    return this.LANG[langCode?.toUpperCase()] || this.LANG[this.DEFAULT_LANG];
  }
};
