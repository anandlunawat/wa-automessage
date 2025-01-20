const { Client, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const path = require('path');

// Initialize the WhatsApp client
const client = new Client();

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
    // Create the button list
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

    // Create a button message
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

    // Send the message with buttons
    await client.sendMessage(phoneNumber, message, {
        buttons: buttonArray,
        headerType: 1 // This will display a header (you can change it to 0 for no header)
    });
}

// Path to the image you want to send
const imagePath = path.join(__dirname, 'patrika.jpg'); // Replace with the actual image path

// Event when QR code is generated (for login)
client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
    console.log('Scan the QR code to login.');
});

// Event when client is ready
client.on('ready', () => {
    console.log('Client is ready!');
    // sendMediaToGroup()
});

// Event when a message is received
client.on('message', async message => {
    console.log('Message received:', message.body);

    // Function to create a delay (5-6 seconds)
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    // Check for specific keywords in the message and respond accordingly
    if (message.body.toLowerCase().includes('hii') || message.body.toLowerCase().includes('hi')) {
        // Introduce a 5-6 second delay before responding
        await sleep(5000); // 5000ms = 5 seconds
        await sendMessage(message.from, 'Hello! Welcome to Akanksha and Aman\'s wedding!! I am your wedding assistant.');
        await sendOptionsWithButtons(message.from);
        // Option Chooser : Please choose from options below : 
        // 1. Baraat Swagat ---
        // 2. Lunch Area ---
        // 3. Carnival ----
        // 4. Sangeet ---
        // 5. Phera
        // 6. Mahera
        // 7. Hi-Tea
        // 8. Varmala

    } else if (message.body.toLowerCase().includes('carnival')) {
        // Introduce a 5-6 second delay before responding
        await sleep(5000); // 5000ms = 5 seconds
        await sendMessage(message.from, 'Carnival is scheduled at 3:00pm sharp on 21st January near Lotus lobby area! Theme for the event is Pastel colors. Keep your energy high. See you soon!!:)');
    } else if (message.body.toLowerCase().includes('sangit') || message.body.toLowerCase().includes('sangeet')) {
        await sleep(5000); // 5000ms = 5 seconds
        await sendMessage(message.from, 'Sangeet is scheduled at 7:00pm sharp on 21st January at Aster lawn. Theme for the event is Indo-western style. Come and groove to evergreen hits as we celebrate Akanksha and Aman\'s forever! See you there!:)');
    } else if (message.body.toLowerCase().includes('baraat swagat')) {
        await sleep(5000); // 5000ms = 5 seconds
        await sendMessage(message.from, 'Baraat swagat is scheduled at 11:00am on 21st January at Daisy Hall. Theme for the event is white and red. Don\'t miss the grand entry of bride and groom! See you there!! :)');
    } else if (message.body.toLowerCase().includes('lunch area')) {
        await sleep(5000); // 5000ms = 5 seconds 
        await sendMessage(message.from, 'Lunch for both the days is arranged at Banquet area next to Daisy Hall. Padhaaro sa!');
    } else if (message.body.toLowerCase().includes('phera')) {
        await sleep(5000); // 5000ms = 5 seconds
        await sendMessage(message.from, 'Phera is scheduled at 11:00am on 22nd January at Lotus. Theme for the event is Ghagra and Kurta. Bring on your traditional game and let\'s cheer for the new couple in town! See you there!! :)   ');
    } else if (message.body.toLowerCase().includes('mahera')) {
        await sleep(5000); // 5000ms = 5 seconds
        await sendMessage(message.from, 'Mahera is scheduled at 3:00pm on 22nd January at Tulip Hall. Theme for the event is Pink Lehriya. Do not miss this, as the celebration continues in style. See you there!! :)');
    } else if (message.body.toLowerCase().includes('hi-tea')) {
        await sleep(5000); // 5000ms = 5 seconds
        await sendMessage(message.from, 'Hi-tea is arranged at Lotus lobby area. See you there!!:)');
    } else if (message.body.toLowerCase().includes('varmala')) {
        await sleep(5000); // 5000ms = 5 seconds
        await sendMessage(message.from, 'Varmala is scheduled at 7:00pm on 22nd January at Aster Lawn. Let\'s come together for one final time to celebrate our newly wed couple. See you there!! :)');
    }
    else {
        // Optionally, handle other messages if needed
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
        console.log(`Error sending message to ${phoneNumber}:`, error);
    }
}

// Function to send media message to a group of people
async function sendMediaToGroup() {
    // Load the image
    const media = MessageMedia.fromFilePath(imagePath); // Load the image from the file path

    // Loop through the phone numbers and send the media message
    for (let i = 0; i < phoneNumbers.length; i++) {
        try {
            const phoneNumber = phoneNumbers[i];
            console.log(`Sending media to ${phoneNumber}`);
            await client.sendMessage(phoneNumber, media, { caption: 'https://maps.app.goo.gl/GjbqK7bYTewC5X1u7' });
            console.log(`Media sent to ${phoneNumber}`);
            await sleep(3000); // Wait 3 seconds between each message (simulate a delay)
        } catch (error) {
            console.log(`Error sending media to ${phoneNumbers[i]}:`, error);
        }
    }
    console.log('All media sent!');
}

// Function to pause between messages
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Initialize the client
client.initialize();






// const { Client, MessageMedia } = require('whatsapp-web.js');
// const qrcode = require('qrcode-terminal');
// const path = require('path');

// // Initialize the WhatsApp client
// const client = new Client();

// // List of phone numbers (in the format +countrycodephonenumber@c.us)
// const phoneNumbers = [];

// // Button options
// const buttonArray = [
//     { buttonId: '1', buttonText: { displayText: 'Baraat Swagat' }, type: 1 },
//     { buttonId: '2', buttonText: { displayText: 'Lunch Area' }, type: 1 },
//     { buttonId: '3', buttonText: { displayText: 'Carnival' }, type: 1 },
//     { buttonId: '4', buttonText: { displayText: 'Sangeet' }, type: 1 },
//     { buttonId: '5', buttonText: { displayText: 'Phera' }, type: 1 },
//     { buttonId: '6', buttonText: { displayText: 'Mahera' }, type: 1 },
//     { buttonId: '7', buttonText: { displayText: 'Hi-Tea' }, type: 1 },
//     { buttonId: '8', buttonText: { displayText: 'Varmala' }, type: 1 }
// ];

// // Function to send message with buttons
// async function sendOptionsWithButtons(phoneNumber) {
//     const message = 'Hello! Welcome to Akanksha and Aman\'s wedding!! I am your wedding assistant.\n\n' +
//                     'Please choose from options below:\n' +
//                     '1. Baraat Swagat\n' +
//                     '2. Lunch Area\n' +
//                     '3. Carnival\n' +
//                     '4. Sangeet\n' +
//                     '5. Phera\n' +
//                     '6. Mahera\n' +
//                     '7. Hi-Tea\n' +
//                     '8. Varmala';

//     await client.sendMessage(phoneNumber, message, {
//         buttons: buttonArray,
//         headerType: 1 // This will display a header (you can change it to 0 for no header)
//     });
// }

// // Path to the image you want to send
// const imagePath = path.join(__dirname, 'patrika.jpg'); // Replace with the actual image path

// // Event when QR code is generated (for login)
// client.on('qr', qr => {
//     qrcode.generate(qr, { small: true });
//     console.log('Scan the QR code to login.');
// });

// // Event when client is ready
// client.on('ready', () => {
//     console.log('Client is ready!');
// });

// // Event when a message is received
// client.on('message', async message => {
//     console.log('Message received:', message.body);

//     const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

//     // Check for specific keywords in the message and respond accordingly
//     if (message.body.toLowerCase().includes('hii') || message.body.toLowerCase().includes('hi')) {
//         await sleep(5000); // 5 seconds delay
//         await sendMessage(message.from, 'Hello! Welcome to Akanksha and Aman\'s wedding!! I am your wedding assistant.');
//         await sendOptionsWithButtons(message.from);
//     }
//     // Add more conditions here if needed for other text responses
// });

// // Handle button click interactions
// client.on('interaction', async interaction => {
//     const selectedButtonId = interaction.selectedButtonId;
//     const phoneNumber = interaction.from; // Get the phone number of the user who clicked

//     if (selectedButtonId === '1') {
//         await sendMessage(phoneNumber, 'Baraat swagat is scheduled at 11:00am on 21st January at Daisy Hall. Theme for the event is white and red. Don\'t miss the grand entry of bride and groom! See you there!! :)');
//     } else if (selectedButtonId === '2') {
//         await sendMessage(phoneNumber, 'Lunch for both the days is arranged at Banquet area next to Daisy Hall. Padhaaro sa!');
//     } else if (selectedButtonId === '3') {
//         await sendMessage(phoneNumber, 'Carnival is scheduled at 3:00pm sharp on 21st January near Lotus lobby area! Theme for the event is Pastel colors. Keep your energy high. See you soon!!:)');
//     } else if (selectedButtonId === '4') {
//         await sendMessage(phoneNumber, 'Sangeet is scheduled at 7:00pm sharp on 21st January at Aster lawn. Theme for the event is Indo-western style. Come and groove to evergreen hits as we celebrate Akanksha and Aman\'s forever! See you there!:)');
//     } else if (selectedButtonId === '5') {
//         await sendMessage(phoneNumber, 'Phera is scheduled at 11:00am on 22nd January at Lotus. Theme for the event is Ghagra and Kurta. Bring on your traditional game and let\'s cheer for the new couple in town! See you there!! :)   ');
//     } else if (selectedButtonId === '6') {
//         await sendMessage(phoneNumber, 'Mahera is scheduled at 3:00pm on 22nd January at Tulip Hall. Theme for the event is Pink Lehriya. Do not miss this, as the celebration continues in style. See you there!! :)');
//     } else if (selectedButtonId === '7') {
//         await sendMessage(phoneNumber, 'Hi-tea is arranged at Lotus lobby area. See you there!!:)');
//     } else if (selectedButtonId === '8') {
//         await sendMessage(phoneNumber, .'Varmala is scheduled at 7:00pm on 22nd January at Aster Lawn. Let\'s come together for one final time to celebrate our newly wed couple. See you there!! :)');
//     } else {
//         await sendMessage(phoneNumber, 'Invalid option. Please choose a valid option from the list.');
//     }
// });

// // Function to send text messages
// async function sendMessage(phoneNumber, messageText) {
//     try {
//         console.log(`Sending message to ${phoneNumber}: ${messageText}`);
//         await client.sendMessage(phoneNumber, messageText);
//         console.log(`Message sent to ${phoneNumber}`);
//     } catch (error) {
//         console.log(`Error sending message to ${phoneNumber}:`, error);
//     }
// }

// // Initialize the client
// client.initialize();

