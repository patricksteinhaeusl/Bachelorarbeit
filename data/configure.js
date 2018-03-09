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

let conn = new Mongo();
db = conn.getDB('webshop');
db.dropDatabase();
db.dropAllRoles();
db.dropAllUsers();
db.createRole(roleEditor);
db.createUser(userEditor);
