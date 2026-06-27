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

    const msg = message.trim().toLowerCase();

    // Greetings
    if (["hi","hello","hey","good morning","good afternoon","good evening"].includes(msg)) {
        return "Hello! Welcome to Faiwes Technologies. How can I help you today?";
    }

    // Company
    if (msg.includes("who are you") ||
        msg.includes("about") ||
        msg.includes("company")) {

        return "Faiwes Technologies is an IT consulting company providing Data Engineering, Cloud & DevOps, Software Development, Web Development, Software Testing, AI & Analytics solutions.";
    }

    // Services
    if (msg.includes("service") || msg.includes("services")) {
        return "We provide:\n\n• Data Engineering\n• Cloud & DevOps\n• Software Development\n• Web Development\n• Software Testing\n• AI & Analytics\n\nWhich service would you like to know more about?";
    }

    // Data Engineering
    if (msg.includes("data")) {
        return "Our Data Engineering services include ETL development, Data Warehousing, Data Lakes, Data Pipelines, Azure Data Factory, Databricks, Snowflake, SQL and Analytics.";
    }

    // Cloud
    if (msg.includes("cloud") ||
        msg.includes("aws") ||
        msg.includes("azure")) {

        return "We help businesses migrate and manage cloud platforms including AWS and Microsoft Azure. We also provide Infrastructure as Code, Automation and Cloud Operations.";
    }

    // DevOps
    if (msg.includes("devops") ||
        msg.includes("terraform") ||
        msg.includes("docker") ||
        msg.includes("kubernetes") ||
        msg.includes("jenkins")) {

        return "Our DevOps services include CI/CD pipelines, Terraform, Docker, Kubernetes, Jenkins, GitHub Actions and infrastructure automation.";
    }

    // Software Development
    if (msg.includes("software")) {
        return "We build enterprise software, APIs, business applications and custom solutions based on your business requirements.";
    }

    // Website
    if (msg.includes("website") ||
        msg.includes("web")) {

        return "Yes. We develop responsive business websites, company portfolios, web applications and custom web solutions.";
    }

    // Testing
    if (msg.includes("testing") ||
        msg.includes("qa") ||
        msg.includes("automation")) {

        return "We provide Manual Testing, Automation Testing, API Testing, Regression Testing, Performance Testing and Quality Assurance services.";
    }

    // AI
    if (msg.includes("ai") ||
        msg.includes("artificial intelligence") ||
        msg.includes("machine learning")) {

        return "We help businesses implement AI-powered solutions, automation and analytics to improve productivity and decision making.";
    }

    // Quote
    if (msg.includes("price") ||
        msg.includes("cost") ||
        msg.includes("quotation") ||
        msg.includes("quote")) {

        return "Project pricing depends on the scope and requirements. Please submit your requirements through our contact form and our team will provide a customized quotation.";
    }

    // Contact
    if (msg.includes("contact") ||
        msg.includes("email") ||
        msg.includes("phone")) {

        return "You can contact us at:\n\n📧 faiwestechnologies@gmail.com\n\nor submit the Contact Us form on this website.";
    }

    // Location
    if (msg.includes("location") ||
        msg.includes("where")) {

        return "We provide remote IT consulting services for clients across different locations.";
    }

    // Careers
    if (msg.includes("career") ||
        msg.includes("job") ||
        msg.includes("vacancy")) {

        return "We are always interested in connecting with talented professionals. Please email your resume to faiwestechnologies@gmail.com.";
    }

    // Time
    if (msg.includes("working hours") ||
        msg.includes("business hours")) {

        return "Our team typically responds to enquiries within one business day.";
    }

    // Thanks
    if (msg.includes("thank")) {
        return "You're welcome! If you have any other questions, feel free to ask.";
    }

    // Bye
    if (msg.includes("bye")) {
        return "Thank you for visiting Faiwes Technologies. Have a great day!";
    }
    // Positive responses
if (
    msg === "ok" ||
    msg === "okay" ||
    msg === "fine" ||
    msg === "cool" ||
    msg === "great" ||
    msg === "good" ||
    msg === "nice" ||
    msg === "awesome" ||
    msg === "perfect"
) {

    const replies = [
        "Great! Is there anything else I can help you with?",
        "Happy to help! Feel free to ask any questions.",
        "Glad to hear that. What would you like to know next?",
        "Excellent! Let me know if you need any additional information.",
        "Sure! I'm here if you need anything else."
    ];

    return replies[Math.floor(Math.random() * replies.length)];
}

// Waiting
if (
    msg.includes("wait") ||
    msg.includes("hold on") ||
    msg.includes("one minute") ||
    msg.includes("give me a minute")
) {

    return "No problem. I'll be here whenever you're ready.";
}

// Thinking
if (
    msg.includes("let me think") ||
    msg.includes("i'll think") ||
    msg.includes("let me check")
) {

    return "Of course. Take your time. Let me know if you have any questions.";
}

// Yes
if (
    msg === "yes" ||
    msg === "yeah" ||
    msg === "yup"
) {

    return "Great! Please let me know how I can assist you further.";
}

// No
if (
    msg === "no" ||
    msg === "nope"
) {

    return "No worries. If you change your mind or need any assistance later, we're here to help.";
}

    // Default response
    return "\nI can help with:\n\n• Our Services\n• Data Engineering\n• Cloud & DevOps\n• Software Development\n• Web Development\n• Software Testing\n• AI & Analytics\n• Pricing\n• Contact Information\n\nOr email us at faiwestechnologies@gmail.com.";
}

// Event listener for Enter key to send the message
document.getElementById('user-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

// ================================
// EmailJS Initialization
// ================================

emailjs.init({
    publicKey: "5icm2b7GlneHQbOt8"
});

// ================================
// Contact Form
// ================================

const contactForm = document.getElementById("contactForm");
if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const submitBtn = document.getElementById("submitBtn");
        const status = document.getElementById("status");
        submitBtn.disabled = true;
        submitBtn.innerHTML = "Sending...";
        const templateParams = {
            from_name: document.getElementById("name").value,
            from_email: document.getElementById("email").value,
            message: document.getElementById("message").value
        };
        emailjs.send(
            "service_00fqi9o",
            "template_2a3dvx5",
            templateParams
        )
        .then(function () {
            status.innerHTML = "✅ Message sent successfully.";
            status.style.color = "green";
            contactForm.reset();
        })
        .catch(function (error) {
            console.error(error);
            status.innerHTML = "❌ Failed to send message.";
            status.style.color = "red";
        })
        .finally(function () {
            submitBtn.disabled = false;
            submitBtn.innerHTML = "Send Message";
        });
    });
}