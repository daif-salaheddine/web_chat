/**
 * Main entry point for INTENSE Tarif-Ermittler
 * Initializes the application and sets up event listeners
 */

(function() {
  'use strict';

  // Initialize session
  const sessionId = SessionManager.getOrCreateSessionId();

  /**
   * Handle sending a message
   */
  async function handleSendMessage() {
    const text = ChatUI.getInputValue();
    if (!text) return;

    // Clear input and disable it
    ChatUI.addMessage(text, 'user');
    ChatUI.clearInput();
    ChatUI.setInputEnabled(false);

    // Show typing indicator
    ChatUI.showTyping();

    // Send message to API
    const response = await ChatAPI.sendMessage(text, sessionId);

    // Remove typing and show response
    ChatUI.removeTyping();
    ChatUI.addMessage(response, 'bot');

    // Re-enable input
    ChatUI.setInputEnabled(true);
  }

  /**
   * Make functions globally available for onclick handlers
   */
  window.openChat = function() {
    ChatUI.openChat();
  };

  window.closeChat = function() {
    ChatUI.closeChat();
  };

  window.sendMessage = function() {
    handleSendMessage();
  };

  /**
   * Set up event listeners when DOM is ready
   */
  document.addEventListener('DOMContentLoaded', function() {
    // Enter key to send message
    const userInput = document.getElementById('userInput');
    if (userInput) {
      userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
          handleSendMessage();
        }
      });
    }
  });

})();