/**
 * Chat UI module for INTENSE Tarif-Ermittler
 * Handles all DOM manipulation and UI rendering
 */

const ChatUI = {
  // SVG templates for avatars
  SVG_TEMPLATES: {
    user: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
    bot: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>`
  },

  /**
   * Open the chat panel
   */
  openChat() {
    document.getElementById('chatPanel').classList.add('open');
    document.getElementById('chatFloatBtn').classList.add('hidden');
    document.getElementById('userInput').focus();
  },

  /**
   * Close the chat panel
   */
  closeChat() {
    document.getElementById('chatPanel').classList.remove('open');
    document.getElementById('chatFloatBtn').classList.remove('hidden');
  },

  /**
   * Add a message to the chat
   * @param {string} text - The message text
   * @param {string} sender - 'user' or 'bot'
   */
  addMessage(text, sender) {
    const chatBody = document.getElementById('chatBody');
    const time = new Date().toLocaleTimeString(CONFIG.LOCALE, { hour: '2-digit', minute: '2-digit' });

    const wrapper = document.createElement('div');
    wrapper.classList.add('message-wrapper', sender);

    const avatar = document.createElement('div');
    avatar.classList.add('avatar', sender === 'user' ? 'user-avatar' : 'bot-avatar');
    avatar.innerHTML = this.SVG_TEMPLATES[sender];

    const content = document.createElement('div');
    content.classList.add('message-content');

    const bubble = document.createElement('div');
    bubble.classList.add('message-bubble');
    bubble.innerHTML = text.replace(/\n/g, '<br>');

    const timestamp = document.createElement('div');
    timestamp.classList.add('timestamp');
    timestamp.textContent = time;

    content.appendChild(bubble);
    content.appendChild(timestamp);
    wrapper.appendChild(avatar);
    wrapper.appendChild(content);
    chatBody.appendChild(wrapper);

    this.scrollToBottom();
  },

  /**
   * Show typing indicator
   */
  showTyping() {
    const chatBody = document.getElementById('chatBody');
    const typing = document.createElement('div');
    typing.id = 'typing';
    typing.innerHTML = `
      <div class="message-wrapper bot">
        <div class="avatar bot-avatar">
          ${this.SVG_TEMPLATES.bot}
        </div>
        <div class="message-content">
          <div class="message-bubble" style="font-style: italic; opacity: 0.7;">${CONFIG.MESSAGES.TYPING}</div>
        </div>
      </div>
    `;
    chatBody.appendChild(typing);
    this.scrollToBottom();
  },

  /**
   * Remove typing indicator
   */
  removeTyping() {
    const typing = document.getElementById('typing');
    if (typing) typing.remove();
  },

  /**
   * Scroll chat to bottom
   */
  scrollToBottom() {
    const chatBody = document.getElementById('chatBody');
    chatBody.scrollTop = chatBody.scrollHeight;
  },

  /**
   * Enable or disable the input
   * @param {boolean} enabled - Whether to enable the input
   */
  setInputEnabled(enabled) {
    const input = document.getElementById('userInput');
    input.disabled = !enabled;
    if (enabled) input.focus();
  },

  /**
   * Clear the input field
   */
  clearInput() {
    document.getElementById('userInput').value = '';
  },

  /**
   * Get the input value
   * @returns {string} The trimmed input value
   */
  getInputValue() {
    return document.getElementById('userInput').value.trim();
  }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ChatUI };
}