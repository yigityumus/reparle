import sqlite3
from fastapi import HTTPException
from models import UserCredentials, Message
from datetime import datetime


class Database:
    def __init__(self, database_name):
        self._db_name = database_name
        self._conn = None
        self._cur = None
        self.connect_db()
    
    def connect_db(self):
        import sqlite3
        try:
            self._conn = sqlite3.connect(self._db_name)
            self._cur = self._conn.cursor()
        except self._conn is None:
            raise HTTPException(status_code=500, detail="Could not connect to database")
        except sqlite3.Error as e:
            print(e)
    
    def commit_db(self):
        self._conn.commit()

    def close_db(self):
        self._conn.close()

    def create_users_table(self):
        create_table_query = '''
        CREATE TABLE IF NOT EXISTS users (
            user_id INTEGER PRIMARY KEY AUTOINCREMENT,\
            username TEXT UNIQUE,
            password TEXT
        )
        '''

        try:
            self._cur.execute(create_table_query)
        except sqlite3.Error as e:
            print(e)
    
    def create_decks_table(self):
        create_table_query = '''
        CREATE TABLE IF NOT EXISTS decks (
            deck_id INTEGER PRIMARY KEY AUTOINCREMENT,\
            username TEXT UNIQUE,
            deck_name TEXT
        )
        '''

        try:
            self._cur.execute(create_table_query)
        except sqlite3.Error as e:
            print(e)

    def create_flashcard_table(self):
        create_table_query = '''
        CREATE TABLE IF NOT EXISTS flashcards (
            question_id INTEGER PRIMARY KEY AUTOINCREMENT,
            deck_id INTEGER
            username TEXT,
            question TEXT,
            timestamp DATETIME
        )
        '''

        try:
            self._cur.execute(create_table_query)
        except sqlite3.Error as e:
            print(e)
    
    def create_daily_question_table(self):
        create_table_query = '''
        CREATE TABLE IF NOT EXISTS dailyQuestions (
            question_id INTEGER PRIMARY KEY AUTOINCREMENT,
            deck_id INTEGER,
            username TEXT,
            question TEXT,
            timestamp DATETIME
        )
        '''

        try:
            self._cur.execute(create_table_query)
        except sqlite3.Error as e:
            print(e)

    def get_table_names(self):
        self.connect_db()

        query = "SELECT name FROM sqlite_master WHERE type='table';"
        self._cur.execute(query)
        tables = self._cur.fetchall()

        self._conn.close()

        if tables:
            table_names = [table[0] for table in tables]
            return table_names
        else:
            return []

    def add_user(self, user: UserCredentials):
        insert_query = '''
        INSERT INTO users (username, password)
        VALUES (?, ?,)
        '''
        try:
            if not self.user_exists(user.username):
                if user.password  == "":
                    raise HTTPException(status_code=401, detail="Password can not be empty")
                self._cur.execute(insert_query, (user.username, user.password))
                self.commit_db()
                return {"message": "Signup successful"}
        except sqlite3.IntegrityError as e:
            print(e)
    
    def user_exists(self, username):
        query = '''
        SELECT * FROM users WHERE username=?
        '''
        self._cur.execute(query, (username,))
        existing_user = self._cur.fetchone()[0]
        return bool(existing_user)
    
    def check_credentials(self, user: UserCredentials):
        query = '''
        SELECT * FROM users WHERE username=? AND password=?
        '''
        self._cur.execute(query, (user.username, user.password))
        result =  self._cur.fetchone()

        if result is None:
            raise HTTPException(status_code=401, detail="Invalid username or password")
        
        return {"message": "Login Successful"}
    
    def get_messages(self, user: UserCredentials, mode):
        if mode == 'sender':
            method = 'sender_name'
        elif mode == 'receiver':
            method = 'receiver_name'
        else:
            KeyError(f"{mode} is not right")
        
        try:
            self.connect_db()
            user_query = "SELECT username FROM users WHERE username=?"
            self._cur.execute(user_query, (user.username,))
            user_row = self._cur.fetchone()

            if user_row:
                username = user_row[0]
                messages_query = f"SELECT * FROM messages WHERE {method}=? ORDER BY message_id DESC LIMIT 5"
                self._cur.execute(messages_query, (username,))
                messages = self._cur.fetchall()
                return {"messages": messages}
            else:
                raise HTTPException(status_code=401, detail="Invalid username")
        except HTTPException as e:
            raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")
    
    def send_message(self, message: Message):
        try:
            self.connect_db()
            if self.user_exists(message.receiver):
                insert_query = "INSERT INTO messages (sender_name, receiver_name, message, timestamp) VALUES (?, ?, ?, ?)"
                timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                self._cur.execute(insert_query, (message.sender, message.receiver, message.message, timestamp))
                self.commit_db()

                return {"message": "Message sent successfully"}
            else:
                raise HTTPException(status_code=401, detail=f"No such username {message.receiver}")
        except sqlite3.Error as e:
            raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")
    
    def get_deck(self):
        pass

    def get_daily_question(self):
        pass

    def get_flashcard(self):
        pass
