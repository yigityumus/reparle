from fastapi import FastAPI, HTTPException

from Database import Database
from models import UserCredentials, Message, Deck


DATABASE_NAME = "../reparle.db"

app = FastAPI(
    title="Chat App API",
    version="0.1",
    description="Our Reparle App"
)

db = Database(DATABASE_NAME)

# Connect to the database when the application starts
@app.on_event("startup")
async def startup():
    db.connect_db()

# Close the database connection when the application shuts down
@app.on_event("shutdown")
async def shutdown():
    db.close_db()

@app.post("/login/")
async def login(user: UserCredentials):
    try:
        return db.check_credentials(user)
    except HTTPException as e:
        raise e

@app.post("/signup/")
async def signup(user: UserCredentials):
    try:
        return db.add_user(user)
    except HTTPException as e:
        raise e

@app.get("/flashcard/")
async def get_flashcard(user: UserCredentials):
    try:
        return db.get_flashcard(user)
    except HTTPException as e:
        raise e
    
@app.get("/daily_question/")
async def get_flashcard(user: UserCredentials):
    try:
        return db.get_daily_question(user)
    except HTTPException as e:
        raise e

@app.get("/deck/")
async def get_deck(deck: Deck):
    try:
        return db.get_deck(deck)
    except HTTPException as e:
        raise e