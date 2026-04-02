/**
 * Chat API module for INTENSE Tarif-Ermittler
 * Handles all API communication with N8N webhook
 */

const ChatAPI = {
  /**
   * Send a message to the N8N webhook
   * @param {string} message - The message to send
   * @param {string} sessionId - The session ID
   * @returns {Promise<string>} The response from the server
   */
  async sendMessage(message, sessionId) {
    try {
      const response = await fetch(CONFIG.N8N_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: message,
          sessionId: sessionId
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.output || CONFIG.MESSAGES.NO_RESPONSE;

    } catch (error) {
      console.error('Chat API Error:', error);
      return CONFIG.MESSAGES.CONNECTION_ERROR;
    }
  }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ChatAPI };
}