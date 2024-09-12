 
const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;


///////////////////


module.exports = { session: process.env.SESSION_ID || 'Byte;;;eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYUlhR1hXMzJ0d2laUE5wQzFqTngzTE9hbFlDamdFNFRyS1ExZ3gxRU8wST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiL0JSdVRYaXc1c0JEdUdrVCs5SmVGeEpqODd4dk85REh0Y3NaWitxY3NoWT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJvTXlhUVNnNjc0ZEtrdThNZGtCaGZDT3duanVzb21mamJpT0psc1pETlZBPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJQbVZXdFRkelkreXhSRml5dTc1THdtQWx5WllIWmFzcTBFUVhiZ0xPWFU4PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNMeGRwOUNOekpqR3dleWFUdGlhWUhuNkxsb2szZjk2RkdQL1lFdWwyWDg9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImRJV1BZNnA1di9lWUpBZDZ1cHQ2RFAzSnRHMzNJYWhlNHFqam1BQnZIUVE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiME1pd3ZlQzU2dVVVQ2laZG5EZkd2dWNWcmFFWjJDOFZvNk5aVVFyTjlIdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQTdLUkNCdU83ZGpSUVJIam9qcXdYdi9QMGtEZlJXWnZVKy9sb2R0VEtHWT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjJEMVFIWUdidFZJbHR5Q3E0VWkybkw4UWFNem4zMVNOdUhIYUFOejhPZ1FFMmpGUVFsbklZY0N6TnhyOFdxamsrNWNpNjJaYzNtQ1c5WFdXV282M0FBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NzEsImFkdlNlY3JldEtleSI6IkdGbkFab2RUaEFpd29lN0pMR2VucklVUkhLcW94K2poaVB5Q0d5SXlLNkE9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMTY0Nzc5NTQzNjBAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiNjVGNTc2MjZBMTI1RDFGRjgwMzI5M0Q5QTg5ODM5QzEifSwibWVzc2FnZVRpbWVzdGFtcCI6MTcyNjE2NDAyOX0seyJrZXkiOnsicmVtb3RlSmlkIjoiMTY0Nzc5NTQzNjBAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiQkU2MUEzNjFDNUE1MDlERkQ4MTk3REQ5NzI4RTVEMkYifSwibWVzc2FnZVRpbWVzdGFtcCI6MTcyNjE2NDAyOX0seyJrZXkiOnsicmVtb3RlSmlkIjoiMTY0Nzc5NTQzNjBAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiQzYxRDMxRDE1MjYzREVDRjkwMzdERDBGOTI5NjNBOEMifSwibWVzc2FnZVRpbWVzdGFtcCI6MTcyNjE2NDAzMn0seyJrZXkiOnsicmVtb3RlSmlkIjoiMTY0Nzc5NTQzNjBAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiMkExNDM3N0ZFQzg3NDc0MzgxQ0MzNjc0QzQ3MjkwOTMifSwibWVzc2FnZVRpbWVzdGFtcCI6MTcyNjE2NDAzMn1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoibGNRMmlxNzJSUW1BRnpNdHRlNjNMQSIsInBob25lSWQiOiIwNmI0ZWM3Ni02NzI1LTRhNmItYTVlNy1hMGJhNWYyYWQ3N2UiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieGl4bkZBa1c1d0dRVzdDRkJ4dVpPbTRnNFNnPSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IklNdEdHQmhRaUg4dG9uWHIvdU05L3NtVWdVZz0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiJYWVlTODNQWiIsIm1lIjp7ImlkIjoiMTY0Nzc5NTQzNjA6NUBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJJYmFkIHVsbGFoIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNJQ2g4dW9CRUt2WWpMY0dHQUlnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJmY0pQOCsvUkl0SEZDOFgyemhBTnowUHc4dUozUmg5ZFR0eHRmTzhVV1VrPSIsImFjY291bnRTaWduYXR1cmUiOiJCK1g2aThYd2FhcnpoQmswU1dNYkJvZHRjN2xhRXVyallhYXJDWG5hTkhDcWpEbVRMdFJmblRwMVd2OExNU00zSE1NTmF3UUF4VDZEaWtod0FXWExDZz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiMVV5R0ZnRGtjYU9JdEtxZWxpL1BwZFZoK0djaWFKYk1DYlYwUHVoa2tzaXdsWU1sRjRxbWd6MVFxQjAyWUJ5RmIrOFBCMzRVYTVjaUNFSmJDN0s5REE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIxNjQ3Nzk1NDM2MDo1QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlgzQ1QvUHYwU0xSeFF2RjlzNFFEYzlEOFBMaWQwWWZYVTdjYlh6dkZGbEoifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjYxNjQwMjQsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBT1MwIn0=',

////////////////////////////////



    PREFIXE: process.env.PREFIX || ".",



///////////////////////////
    A_REACT : process.env.AUTO_REACTION || 'on',
    CHATBOT: process.env.CHAT_BOT || "off",
    OWNER_NAME: process.env.OWNER_NAME || "𝄟≛⃝🖤𝐀𝐘𝐘𝐀𝐍 𝒐𝑶 𝑲𝒉𝒂𝑵♥️✨੍᭄͜͡°•𓆩🖤𓆪",
    NUMERO_OWNER : process.env.OWNER_NUMBER || "923072380380",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'BYTE-MD',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || 'https://raw.githubusercontent.com/HyHamza/HyHamza/main/Images/BYTE-MD-LITE.jpeg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`Update ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
