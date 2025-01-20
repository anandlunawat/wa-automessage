const express = require('express');
const { Client, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode');
const path = require('path');

// Initialize the WhatsApp client
const client = new Client();

// Initialize Express app
const app = express();
const PORT = 3000;

// Variable to store the generated QR code as a data URL
let qrCodeDataUrl = '';

// List of phone numbers (in the format +countrycodephonenumber@c.us)
const phoneNumbers = [];

const buttonArray = [
    { buttonId: '1', buttonText: { displayText: 'Baraat Swagat' }, type: 1 },
    { buttonId: '2', buttonText: { displayText: 'Lunch Area' }, type: 1 },
    { buttonId: '3', buttonText: { displayText: 'Carnival' }, type: 1 },
    { buttonId: '4', buttonText: { displayText: 'Sangeet' }, type: 1 },
    { buttonId: '5', buttonText: { displayText: 'Phera' }, type: 1 },
    { buttonId: '6', buttonText: { displayText: 'Mahera' }, type: 1 },
    { buttonId: '7', buttonText: { displayText: 'Hi-Tea' }, type: 1 },
    { buttonId: '8', buttonText: { displayText: 'Varmala' }, type: 1 }
];

async function sendOptionsWithButtons(phoneNumber) {
    const message = 'Hello! Welcome to Akanksha and Aman\'s wedding!! I am your wedding assistant.\n\n' +
        'Please choose from options below:\n' +
        '1. Baraat Swagat\n' +
        '2. Lunch Area\n' +
        '3. Carnival\n' +
        '4. Sangeet\n' +
        '5. Phera\n' +
        '6. Mahera\n' +
        '7. Hi-Tea\n' +
        '8. Varmala';

    await client.sendMessage(phoneNumber, message, {
        buttons: buttonArray,
        headerType: 1
    });
}

// Path to the image you want to send
const imagePath = path.join(__dirname, 'patrika.jpg'); // Replace with the actual image path

// Event when QR code is generated (for login)
client.on('qr', async qr => {
    try {
        qrCodeDataUrl = await qrcode.toDataURL(qr);
        console.log('QR code generated. Visit http://localhost:3000/qr to scan it.');
    } catch (err) {
        console.error('Failed to generate QR code', err);
    }
});

// Event when client is ready
client.on('ready', () => {
    console.log('Client is ready!');
});

// Event when a message is received
client.on('message', async message => {
    console.log('Message received:', message.body);

    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    if (message.body.toLowerCase().includes('hii') || message.body.toLowerCase().includes('hi')) {
        await sleep(5000);
        await sendOptionsWithButtons(message.from);
    } else if (message.body.toLowerCase().includes('carnival')) {
        await sleep(5000);
        await sendMessage(message.from, 'Carnival is scheduled at 3:00pm sharp on 21st January near Lotus lobby area! Theme for the event is Pastel colors. Keep your energy high. See you soon!!:)');
    } else if (message.body.toLowerCase().includes('sangit') || message.body.toLowerCase().includes('sangeet')) {
        await sleep(5000);
        await sendMessage(message.from, 'Sangeet is scheduled at 7:00pm sharp on 21st January at Aster lawn. Theme for the event is Indo-western style. Come and groove to evergreen hits as we celebrate Akanksha and Aman\'s forever! See you there!:)');
    } else if (message.body.toLowerCase().includes('baraat swagat')) {
        await sleep(5000);
        await sendMessage(message.from, 'Baraat swagat is scheduled at 11:00am on 21st January at Daisy Hall. Theme for the event is white and red. Don\'t miss the grand entry of bride and groom! See you there!! :)');
    } else if (message.body.toLowerCase().includes('lunch area')) {
        await sleep(5000);
        await sendMessage(message.from, 'Lunch for both the days is arranged at Banquet area next to Daisy Hall. Padhaaro sa!');
    } else if (message.body.toLowerCase().includes('phera')) {
        await sleep(5000);
        await sendMessage(message.from, 'Phera is scheduled at 11:00am on 22nd January at Lotus. Theme for the event is Ghagra and Kurta. Bring on your traditional game and let\'s cheer for the new couple in town! See you there!! :)');
    } else if (message.body.toLowerCase().includes('mahera')) {
        await sleep(5000);
        await sendMessage(message.from, 'Mahera is scheduled at 3:00pm on 22nd January at Tulip Hall. Theme for the event is Pink Lehriya. Do not miss this, as the celebration continues in style. See you there!! :)');
    } else if (message.body.toLowerCase().includes('hi-tea')) {
        await sleep(5000);
        await sendMessage(message.from, 'Hi-tea is arranged at Lotus lobby area. See you there!!:)');
    } else if (message.body.toLowerCase().includes('varmala')) {
        await sleep(5000);
        await sendMessage(message.from, 'Varmala is scheduled at 7:00pm on 22nd January at Aster Lawn. Let\'s come together for one final time to celebrate our newly wed couple. See you there!! :)');
    } else {
        console.log('Received a message that does not match predefined keywords');
    }
});

// Function to send text messages
async function sendMessage(phoneNumber, messageText) {
    try {
        console.log(`Sending message to ${phoneNumber}: ${messageText}`);
        await client.sendMessage(phoneNumber, messageText);
        console.log(`Message sent to ${phoneNumber}`);
    } catch (error) {
        console.log(`Error sending message to ${phoneNumber}:, error`);
    }
}

// Serve the QR code as an HTML page
app.get('/qr', (req, res) => {
    if (qrCodeDataUrl) {
        res.send(`
            <html>
            <head><title>QR Code</title></head>
            <body style="text-align:center; padding: 20px;">
                <h1>Scan the QR Code to Login</h1>
                <img src="${qrCodeDataUrl}" alt="QR Code" />
            </body>
            </html>
        `);
    } else {
        res.send('<h1>QR Code is not yet generated. Please wait...</h1>');
    }
});

// Start Express server
app.listen(PORT, () => {
    console.log('Server is running on http://localhost:${PORT}');
});

// Initialize the client
client.initialize();
