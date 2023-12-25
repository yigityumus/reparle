from Database import Database

db = Database("./chat_app.db")

db.create_users_table()
db.create_messages_table()
print(db.get_table_names())