document.addEventListener('DOMContentLoaded', function() {
    const messagesList = document.getElementById('messagesList');
    
    // Load messages from localStorage (from the previous message board)
    function loadMessages() {
        const messages = JSON.parse(localStorage.getItem('messages')) || [];
        displayMessages(messages);
    }
    
    // Display messages with request buttons
    function displayMessages(messages) {
        messagesList.innerHTML = '';
        
        if (messages.length === 0) {
            messagesList.innerHTML = '<div class="no-messages">No messages available</div>';
            return;
        }
        
        messages.forEach(message => {
            const messageElement = document.createElement('div');
            messageElement.className = 'message';
            
            const contentDiv = document.createElement('div');
            contentDiv.className = 'message-content';
            contentDiv.innerHTML = `
                <h3>${escapeHtml(message.name)}</h3>
                <p>${escapeHtml(message.message)}</p>
            `;
            
            const requestBtn = document.createElement('button');
            requestBtn.className = 'request-btn';
            requestBtn.textContent = 'Request';
            requestBtn.addEventListener('click', () => {
                handleRequest(message.id);
            });
            
            messageElement.appendChild(contentDiv);
            messageElement.appendChild(requestBtn);
            messagesList.appendChild(messageElement);
        });
    }
    
    // Handle request button click
    function handleRequest(messageId) {
        alert(`Request sent for message ID: ${messageId}`);
        // In a real app, you would send this to a server
    }
    
    // Basic HTML escaping
    function escapeHtml(unsafe) {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
    
    // Initial load
    loadMessages();
});