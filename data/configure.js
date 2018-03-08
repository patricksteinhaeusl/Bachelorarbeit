const roleAdmin = {
    role: 'webshopAdmin',
    privileges: [
        { resource: { db: 'webshop', collection: 'accounts' }, actions: [ 'find', 'update', 'insert', 'remove'] }
    ],
    roles: [ "dbAdmin" ]
};

const roleEditor = {
    role: 'webshopEditor',
    privileges: [
        { resource: { db: 'webshop', collection: 'accounts' }, actions: [ 'find', 'update', 'insert', 'remove'] }
    ],
    roles: [ "readWrite"]
};

const userAdmin = {
    user: 'webshopAdmin',
    pwd: '1234567',
    roles: [
        { role: 'webshopAdmin', db: 'webshop' }
    ]
};

const userEditor = {
    user: 'webshopEditor',
    pwd: '1234',
    roles: [
        { role: 'webshopEditor', db: 'webshop' }
    ]
};

let conn = new Mongo('localhost:27017');
db = conn.getDB('webshop');
db.dropDatabase();
db.dropAllRoles();
db.dropAllUsers();
db.createRole(roleAdmin);
db.createRole(roleEditor);
db.createUser(userAdmin);
db.createUser(userEditor);
