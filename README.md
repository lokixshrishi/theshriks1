# The Shriks Agreement Signature System

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Server
```bash
npm start
```

The server will run on `http://localhost:3000`

### 3. Open the Document
Open `team.html` in your browser at `http://localhost:3000/team.html`

## How It Works

1. **Sign**: Click on any signature line to draw your signature
2. **Save**: Click "Save Signature" button to store it in MongoDB
3. **Submit**: Once both Founder and Co-Founder have signed, click "Save & Submit"

## API Endpoints

- `GET /api/signatures` - Get all signatures
- `POST /api/signatures` - Save a new signature
- `POST /api/submit` - Submit the document (requires 2 signatures)
- `DELETE /api/signatures/clear` - Clear all signatures (testing only)

## Features

- ✍️ Draw signatures with mouse or touch
- 💾 Signatures stored in MongoDB
- 🔒 Prevents duplicate signatures
- ✅ Validates all required signatures before submission
- 📱 Mobile-friendly touch support

## Environment Variables

Create a `.env` file with:
```
MONGODB_URI=your_mongodb_connection_string
PORT=3000
```
