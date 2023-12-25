from pydantic import BaseModel

class UserCredentials(BaseModel):
    username: str
    password: str

class Message(BaseModel):
    sender: str
    receiver: str
    message: str

class Deck(BaseModel):
    deck_id: str
    deck_name: str
