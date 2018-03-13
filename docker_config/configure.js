const roleEditor = {
    role: 'webshopEditor',
    privileges: [
        { resource: { db: 'webshop', collection: 'accounts' }, actions: [ 'find', 'update', 'insert', 'remove'] }
    ],
    roles: [ "readWrite"]
};

const userEditor = {
    user: 'webshopEditor',
    pwd: '1234',
    roles: [
        { role: 'webshopEditor', db: 'webshop' }
    ]
};

const conn = new Mongo();
db = conn.getDB('webshop');
db.createRole(roleEditor);
db.createUser(userEditor);
