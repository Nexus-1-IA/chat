const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, '../pagos.json');

function readDB() {
    if (!fs.existsSync(DB_PATH)) return [];
    const data = fs.readFileSync(DB_PATH);
    return JSON.parse(data);
}

function writeDB(data) {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

function getUserByEmail(email) {
    const db = readDB();
    return db.find(user => user.email === email);
}

function addPremiumUser(user) {
    const db = readDB();
    const existing = db.find(u => u.email === user.email);
    if (!existing) {
        db.push(user);
        writeDB(db);
    }
}

module.exports = {
    getUserByEmail,
    addPremiumUser
};
