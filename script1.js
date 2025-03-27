document.addEventListener('DOMContentLoaded', function() {
    const messageForm = document.getElementById('messageForm');
    const nameInput = document.getElementById('nameInput');
    const messageInput = document.getElementById('messageInput');
    const messagesList = document.getElementById('messagesList');
    
    // Load messages when page loads
    loadMessages();
    
    // Handle form submission
    messageForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = nameInput.value.trim();
        const message = messageInput.value.trim();
        
        if (name && message) {
            addMessage(name, message);
            nameInput.value = '';
            messageInput.value = '';
        }
    });
    
    // Add a new message
    function addMessage(name, message) {
        const messages = getMessages();
        const newMessage = {
            id: Date.now(),
            name: name,
            message: message,
            timestamp: new Date().toISOString()
        };
        
        messages.unshift(newMessage); // Add to beginning of array
        localStorage.setItem('messages', JSON.stringify(messages));
        displayMessages(messages);
    }
    
    // Get all messages from localStorage
    function getMessages() {
        const messages = localStorage.getItem('messages');
        return messages ? JSON.parse(messages) : [];
    }
    
    // Load and display messages
    function loadMessages() {
        const messages = getMessages();
        displayMessages(messages);
    }
    
    // Display messages in the UI
    function displayMessages(messages) {
        messagesList.innerHTML = '';
        
        if (messages.length === 0) {
            messagesList.innerHTML = '<p>No messages yet. Be the first to post!</p>';
            return;
        }
        
        messages.forEach(message => {
            const messageElement = document.createElement('div');
            messageElement.className = 'message';
            
            const date = new Date(message.timestamp);
            const formattedDate = date.toLocaleString();
            
            messageElement.innerHTML = `
                <h3>${escapeHtml(message.name)}</h3>
                <p>${escapeHtml(message.message)}</p>
                <small>${formattedDate}</small>
            `;
            
            messagesList.appendChild(messageElement);
        });
    }
    
    // Basic HTML escaping to prevent XSS
    function escapeHtml(unsafe) {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
});