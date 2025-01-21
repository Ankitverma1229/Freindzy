# Friendzy

Welcome to **Friendzy** — a full-stack web application built using the MERN stack with TypeScript. Friendzy enables users to search for friends, manage friend lists, and receive personalized friend recommendations. It combines a clean, intuitive frontend with an optimized backend for seamless performance and scalability.

## Overview

Friendzy is designed to help users build connections effortlessly. Users can search for others, send and manage friend requests, and explore recommendations based on mutual connections.

## Core Functionalities

### 👤 User Authentication

- **Sign Up**: Create an account with a unique username and secure password.
- **Login**: Securely log in using JWT-based authentication.
- **Session Management**: Ensure user sessions remain secure and authenticated.

### 🏠 Home Page

- **User List**: Display a list of users.
- **Search Bar**: Search for users by name or username.
- **Friends List**: View friends with the ability to unfriend them.

### 🤝 Add Friend Feature

- **Search Users**: Find other registered users in the app.
- **Send Requests**: Send and manage friend requests.
- **Request Management**: Accept or reject incoming friend requests.

### 🔗 Friend Recommendation System

- **Mutual Friends**: Suggest users based on the number of mutual connections.
- **Display Recommendations**: Show recommended friends on the user’s dashboard.

## Technical Details

### Frontend

- **Framework**: React.js with TypeScript for type safety and scalability.
- **UI/UX**: Designed for simplicity and responsiveness across all devices.
- **State Management**: Utilizes Redux Toolkit for efficient state handling.

### Backend

- **Framework**: Node.js with Express.js.
- **API Design**: RESTful APIs for authentication, user management, and recommendations.
- **Authentication**: Secured with JSON Web Tokens (JWT).
- **Performance**: Optimized database queries and API responses.

### Database

- **Database**: MongoDB with schemas for users, friend requests, and connections.
- **Data Management**: Efficient handling of friend relationships and recommendations.

## Getting Started

To set up the Friendzy application locally, follow these steps:

### Prerequisites

Ensure you have the following installed:

- Node.js
- npm
- MongoDB

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Ankitverma1229/friendzy
```

2. Install dependencies:

```bash
npm install
```

3. Start the backend application:

```bash
npm run dev
```

4. Start the frontend application

```bash
npm run dev
```

## Technology Stack

- **Frontend Framework**: React.js(Typescript)
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB

## Future Enhancements

- Add common interests for more accurate friend recommendations.
- Introduce real-time notifications for friend requests.
- Implement analytics for tracking user interactions.

## Contact

For inquiries and support, please reach out to [ankitkumar040722@gmail.com](mailto:ankitkumar040722@gmail.com).
