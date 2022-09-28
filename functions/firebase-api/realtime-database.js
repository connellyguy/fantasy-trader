const admin = require('firebase-admin');
admin.initializeApp();

async function updateTable(tableName, jsonData) {
    const db = admin.database();
    console.log('pushing to table: ', tableName);
    const ref = db.ref(tableName);
    ref.set(jsonData);
}

async function readTable(tableName) {
    const db = admin.database();
    console.log('reading from table: ', tableName);
    const ref = db.ref(tableName);
    return ref.once('value').then((snapshot) => snapshot.val());
}

module.exports = {
    updateTable,
    readTable,
};
