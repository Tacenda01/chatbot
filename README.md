# Chatbot (React + Django + WebSockets)

## Features

- Real-time messaging using WebSockets   
- React frontend  
- Django backend  
- WebSocket server powered by Django Channels   
- Press Enter to send messages  

---

## 🛠 Tech Stack

| Layer | Technology |
|------|-----------|
| Frontend | React.js |
| Backend | Django |
| WebSockets | Django Channels |
| ASGI Server | Daphne |
| Languages | JavaScript, Python |

---

## Project Structure

```

chatbot/
├── backend/
│   ├── manage.py
│   ├── backend/
│   │   ├── settings.py
│   │   ├── asgi.py
│   │   └── urls.py
│   └── chat/
│       ├── consumers.py
│       └── routing.py
└── frontend/
├── src/
│   ├── App.js
│   └── Chat.js
└── package.json

````

---

## How to Run This Project

Follow these steps to run the chatbot on your own system.

---

### 1️ Clone the Repository

```bash
git clone https://github.com/Tacenda01/chatbot.git
cd chatbot
````

---

### 2️ Backend Setup (Django)

```bash
cd backend
python -m venv venv
```

Activate the virtual environment:

**Windows**

```bash
venv\Scripts\activate
```

**Mac/Linux**

```bash
source venv/bin/activate
```

Install dependencies:

```bash
pip install django channels daphne
```

Run database migrations:

```bash
python manage.py migrate
```

Start the Django WebSocket server:

```bash
daphne backend.asgi:application
```

The backend will start at:

```
http://127.0.0.1:8000
```

---

### 3️ Frontend Setup (React)

Open a new terminal window and go to the frontend folder:

```bash
cd frontend
npm install
npm start
```

The React app will open at:

```
http://localhost:3000
```

---

## How to Use

1. Open `http://localhost:3000` in two different browser tabs
2. Type a message in one tab
3. The message will instantly appear in the other tab

This confirms that WebSockets are working.

---

## How It Works

* React connects to Django using WebSockets
* Messages are sent to Django Channels
* Django broadcasts messages to all connected users
* Every connected browser receives messages in real time

