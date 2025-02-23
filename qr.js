// qr.js
const qrcode = require('qrcode');
const qrcodeTerminal = require('qrcode-terminal');
const fs = require('fs').promises;
const path = require('path');
const { delay } = require('@whiskeysockets/baileys');

class BrovhiQR {
  constructor(sessionName = 'brovhi-md') {
    this.sessionName = sessionName;
    this.qrDirectory = path.join(__dirname, 'sessions', this.sessionName);
    this.currentQR = null;
    this.qrVersion = 1;
  }

  /**
   * Generate and handle QR codes for WhatsApp authentication
   * @param {string} qr - Raw QR code data
   * @param {object} options - Generation options
   */
  async handleQR(qr, options = {}) {
    try {
      this.currentQR = qr;
      
      // Create session directory if not exists
      await this._ensureDirectoryExists();

      // Generate outputs based on options
      if (options.saveAsImage) await this._generateQRImage(qr);
      if (options.showInTerminal) this._showInTerminal(qr);
      
      // Handle QR versioning
      this.qrVersion = options.newSession ? 1 : this.qrVersion + 1;
      
      // Start expiration timer
      if (options.timeout) this._startExpirationTimer(options.timeout);
      
      return this.qrPath;
    } catch (error) {
      console.error('❌ BROVHI QR Error:', error.message);
      throw error;
    }
  }

  async _generateQRImage(qr) {
    this.qrPath = path.join(this.qrDirectory, `brovhi-qr-v${this.qrVersion}.png`);
    await qrcode.toFile(this.qrPath, qr, {
      type: 'png',
      width: 400,
      margin: 2,
      color: {
        dark: '#1a1a1a',
        light: '#ffffff'
      }
    });
    console.log(`🔐 QR saved: ${this.qrPath}`);
  }

  _showInTerminal(qr) {
    console.log('\n\x1b[36m=== BROVHI MD QR CODE ===\x1b[0m');
    qrcodeTerminal.generate(qr, { small: true }, (terminalQR) => {
      console.log(terminalQR);
      console.log('\x1b[33mScan within 2 minutes\x1b[0m\n');
    });
  }

  async _ensureDirectoryExists() {
    try {
      await fs.access(this.qrDirectory);
    } catch {
      await fs.mkdir(this.qrDirectory, { recursive: true });
    }
  }

  _startExpirationTimer(timeout = 120000) {
    this.expirationTimer = setTimeout(() => {
      console.log('⌛ QR code expired');
      this.currentQR = null;
    }, timeout);
  }

  async waitForScan() {
    const start = Date.now();
    while (Date.now() - start < 120000) { // 2 minute timeout
      if (!this.currentQR) return true;
      await delay(5000);
    }
    throw new Error('QR scan timeout');
  }

  async clearOldQRCodes() {
    try {
      const files = await fs.readdir(this.qrDirectory);
      for (const file of files) {
        if (file.startsWith('brovhi-qr-')) {
          await fs.unlink(path.join(this.qrDirectory, file));
        }
      }
      console.log('♻️ Old BROVHI QR codes cleared');
    } catch (error) {
      console.error('Cleanup error:', error.message);
    }
  }
}

module.exports = BrovhiQR;
