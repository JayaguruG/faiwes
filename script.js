const body = document.body;
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelectorAll('nav a');

function setMenuOpen(isOpen) {
    body.classList.toggle('nav-open', isOpen);
    if (menuToggle) {
        menuToggle.setAttribute('aria-expanded', String(isOpen));
        menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
    }
}

function scrollToElement(target) {
    if (!target) {
        return;
    }

    const header = document.querySelector('header');
    const headerOffset = header ? header.offsetHeight + 16 : 96;
    const elementPosition = target.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - headerOffset;

    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
}

if (menuToggle) {
    menuToggle.addEventListener('click', function() {
        setMenuOpen(!body.classList.contains('nav-open'));
    });
}

navLinks.forEach(function(link) {
    link.addEventListener('click', function() {
        setMenuOpen(false);
    });
});

document.getElementById('home-link').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default anchor click behavior
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

document.getElementById('contact-link').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default anchor behavior
    const contactSection = document.getElementById('contact-us'); // Ensure you have the correct ID

    setMenuOpen(false);
    scrollToElement(contactSection);
});

document.getElementById('about-link').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default anchor behavior
    const target = document.querySelector('#about');
    setMenuOpen(false);
    scrollToElement(target);
});
function toggleChatbox() {
    const chatbox = document.getElementById("chatbox");
    const chatIcon = document.getElementById("chat-icon");

    if (chatbox.classList.contains("hidden")) {
        chatbox.classList.remove("hidden");
        chatIcon.style.display = "none";
    } else {
        chatbox.classList.add("hidden");
        chatIcon.style.display = "block";
    }
}

function minimizeChatbox() {
    const chatbox = document.getElementById("chatbox");
    const chatIcon = document.getElementById("chat-icon");

    // Hide chatbox but keep conversation
    chatbox.classList.add("hidden");
    chatIcon.style.display = "block";
}

function closeChatbox() {
    const chatbox = document.getElementById("chatbox");
    const chatIcon = document.getElementById("chat-icon");
    const chatMessages = document.getElementById("chat-messages");

    // Hide chatbox and clear conversation
    chatbox.classList.add("hidden");
    chatMessages.innerHTML = ""; // Clear all messages
    chatIcon.style.display = "block";
}

function sendMessage() {
    const userInput = document.getElementById("user-input");
    const message = userInput.value.trim();

    if (message) {
        addMessageToChat("You", message);

        // Generate a bot response
        const response = getBotResponse(message);
        addMessageToChat("Faiwes", response);

        userInput.value = ""; // Clear input
    }
}

function addMessageToChat(sender, message) {
    const chatMessages = document.getElementById("chat-messages");
    const messageElement = document.createElement("div");
    messageElement.textContent = `${sender}: ${message}`;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to the latest message
}

function getBotResponse(message) {
    const normalizedMessage = message.trim().toLowerCase();

    // Keyword-based responses
    if (normalizedMessage === "hi" || normalizedMessage === "hello") {
        const responses = [
            "Hi there! How can I assist you today?",
            "Hello! What can I do for you?",
            "Hey! Need any help?",
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    } else if (normalizedMessage.includes("how are you")) {
        return "I'm just a bot, but I'm here to help!";
    } else if (normalizedMessage.includes("help")) {
        return "Sure! Please tell me what you need help with.";
    } else if (normalizedMessage.includes("thank you")) {
        return "You're welcome! Let me know if there's anything else.";
    } else if (normalizedMessage.includes("bye")) {
        return "Goodbye! Have a great day!";
    }

    // For unrecognized queries, provide an email address
    const emailAddress = "faiwestechnologies@gmail.com";
    //setTimeout(() => alert("Thank you"), 100); // Simulate delayed "thank you" message
    return `Our team will contact you. Please reach out at ${emailAddress}.`;
}


// Event listener for Enter key to send the message
document.getElementById('user-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

document.getElementById('contactForm').onsubmit = async function (event) {
    event.preventDefault();

    document.getElementById('spinner').style.display = 'inline';
    document.getElementById('confirmation-message').style.display = 'none';
    document.getElementById('error-message').style.display = 'none';

    const formData = new FormData(event.target);

    try {
        const response = await fetch(event.target.action, {
            method: 'POST',
            body: formData
        });

        console.log("Response status:", response.status);

        if (response.ok) {
            document.getElementById('confirmation-message').style.display = 'block';
            event.target.reset(); // Clear form
        } else {
            console.error("Server returned error status:", response.status);
            document.getElementById('error-message').style.display = 'block';
        }
    } catch (error) {
        console.error('Failed to send the message:', error);
        document.getElementById('error-message').style.display = 'block';
    } finally {
        document.getElementById('spinner').style.display = 'none';
    }
};
