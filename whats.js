const qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js');
const fetch = require('node-fetch');

// Inicializa el cliente de WhatsApp
const client = new Client();

client.on('qr', (qr) => {
    // Genera y escanea el código QR con tu teléfono para iniciar sesión
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Cliente de WhatsApp está listo.');
});

// Función para hacer una consulta a la API de Gemini
async function consultaGemini(apiKey, pregunta) {
    const response = await fetch('https://api.gemini.com/v1/endpoint', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({ query: pregunta })
    });

    const data = await response.json();
    return data;
}

// Función para manejar mensajes entrantes de WhatsApp
client.on('message', async msg => {
    if (msg.body.startsWith('IA:')) {
        const pregunta = msg.body.substring(3).trim();
        const apiKey = 'TU_API_KEY_DE_GEMINI';

        try {
            const respuestaIA = await consultaGemini(apiKey, pregunta);
            msg.reply(`Respuesta de la IA: ${respuestaIA.result}`);
        } catch (error) {
            console.error('Error al consultar la API de Gemini:', error);
            msg.reply('Hubo un error al consultar la API de Gemini.');
        }
    }
});

client.initialize();
