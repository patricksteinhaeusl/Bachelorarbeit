let conn = new Mongo('localhost:27017');
db = conn.getDB('admin');
db.shutdownServer();
