
# messageApp

**messageApp** is a messaging platform that allows users to create, schedule, and send messages to all registered members via WhatsApp. It features user authentication, message scheduling, and Twilio API integration for sending WhatsApp messages.

## Features

1. **User Registration**: Users can sign up with their details to create an account in the application.
2. **User Login**: Registered users can log in securely using their credentials.
3. **Create Message for All Users**: Any registered user can create and send a message to all members in the database via WhatsApp using Twilio's API.
4. **Schedule Messages**: Users can schedule messages:
   - Send a message to a specific WhatsApp number at a scheduled time.
   - Schedule a message to be sent to all database members at a future date/time.
5. **Logout**: Securely log out from the application.
6. **Error Handling**: Robust error handling mechanisms to ensure a smooth user experience, with descriptive messages for invalid input or failed operations.

## Tech Stack

- **Backend**: 
  - **Node.js**: Runtime environment.
  - **Express.js**: Web framework for building the API.
  - **MongoDB**: NoSQL database for storing user and message data.
  
- **Message Handling**:
  - **Twilio WhatsApp API**: Used for sending WhatsApp messages to users.

- **Scheduling**:
  - **Node-cron**: For scheduling messages to be sent at specific times.

## Installation

### Prerequisites

Make sure you have the following installed:

- Node.js
- MongoDB (or access to MongoDB Atlas)
- Twilio Account (with WhatsApp API enabled)

### Steps

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Sachin-kumar-jha/messageApp.git
   cd messageApp
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables**:

   Create a `.env` file in the root directory and fill in the following:

   ```bash
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   TWILIO_ACCOUNT_SID=your_twilio_account_sid
   TWILIO_AUTH_TOKEN=your_twilio_auth_token
   TWILIO_WHATSAPP_NUMBER=your_twilio_whatsapp_number
   ```

4. **Run the application**:

   ```bash
   npm start
   ```

   The application will run on `http://localhost:3000/auth/`.

## Usage

- **User Registration & Login**: 
  - Sign up and log in to your account.
  
- **Send WhatsApp Message**:
  - Create a message that will be sent to all users in the database via WhatsApp using Twilio.

- **Schedule WhatsApp Messages**:
  - Schedule a message to be sent to a specific WhatsApp number or all members at a specific date and time using the message scheduling feature.

## Error Handling

- The application handles various types of errors such as:
  - Twilio messaging errors.
  - Database connection failures.
  - Scheduled job failures.

Errors are logged and appropriate error messages are sent to the user for better debugging and handling.

## Contributing

Contributions are welcome! Please open a pull request or issue for discussion.

