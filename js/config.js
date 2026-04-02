/**
 * Configuration module for INTENSE Tarif-Ermittler
 * Contains all configuration constants and session management
 */

const CONFIG = {
  // N8N Webhook URL
  N8N_URL: "https://n8nprod.trythis.cfd/webhook/d68d05ae-6642-4624-92fa-c5ce1debbcb0",

  // Locale settings
  LOCALE: 'de-DE',

  // Messages
  MESSAGES: {
    NO_RESPONSE: "❌ Keine Antwort erhalten.",
    CONNECTION_ERROR: "❌ Fehler bei der Verbindung zum Server.",
    TYPING: "Wird getippt..."
  }
};

/**
 * Session Manager - Handles session ID persistence
 */
const SessionManager = {
  /**
   * Get or create a session ID
   * @returns {string} The session ID
   */
  getOrCreateSessionId() {
    let sessionId = localStorage.getItem("sessionId");
    if (!sessionId) {
      sessionId = crypto.randomUUID();
      localStorage.setItem("sessionId", sessionId);
    }
    return sessionId;
  },

  /**
   * Clear the current session
   */
  clearSession() {
    localStorage.removeItem("sessionId");
  }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CONFIG, SessionManager };
}