# Charity Donation Platform

This is a full-stack web application for a charity organization. It allows users to learn about the organization's programs, make donations, and stay updated on its impact. The application also includes an admin dashboard for managing content, donations, and users.

## Features

*   **User Authentication:** Secure user registration and login with password hashing and session management.
*   **Donation System:** Users can make one-time, monthly, or sponsorship donations to various programs.
*   **Content Management:** Admins can manage programs, stories, and impact statistics through a dedicated dashboard.
*   **Donor Portal:** Registered users can view their donation history.
*   **Contact Form:** Users can send messages to the organization.

## Tech Stack

*   **Frontend:** React, Vite, TypeScript, Tailwind CSS
*   **Backend:** Node.js, Express, Prisma
*   **Database:** SQLite (default), PostgreSQL, MySQL

## Getting Started

To get the project up and running, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/charity-donation-platform.git
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Set up environment variables:**
    Create a `.env` file in the root directory and add the following variables:
    ```
    DATABASE_URL="file:./dev.db"
    SESSION_SECRET="your-session-secret"
    ```
4.  **Run database migrations:**
    ```bash
    npm run db:migrate
    ```
5.  **Seed the database (optional):**
    ```bash
    npm run seed
    ```
6.  **Start the development server:**
    ```bash
    npm run dev
    ```

The application will be available at `http://localhost:3000`.

## Project Structure

```
.
├── components/     # React components
├── prisma/         # Prisma schema and migrations
├── public/         # Public assets
├── server/         # Backend server code
├── src/            # Frontend source code
├── styles/         # CSS styles
├── .env.example    # Example environment variables
├── package.json    # Project dependencies and scripts
└── README.md       # This file
```

## API Endpoints

A summary of the available API endpoints:

*   `POST /api/auth/register`: Register a new user.
*   `POST /api/auth/login`: Log in a user.
*   `POST /api/auth/logout`: Log out a user.
*   `GET /api/programs`: Get all active programs.
*   `POST /api/donations`: Create a new donation.
*   `GET /api/donations/me`: Get the current user's donations.

For a full list of endpoints, please refer to the `server/routes/` directory.

## Contributing

Contributions are welcome! Please feel free to open an issue or submit a pull request.