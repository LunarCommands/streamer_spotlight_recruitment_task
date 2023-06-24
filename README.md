# Streamer Spotlight Application

This project is a simple streamer spotlight application where users can add their favorite streamers and interact with them by upvoting or downvoting. The application consists of a frontend and a backend component that work together to provide a seamless user experience.

## Technologies Used

- React.js
- Node.js
- Express
- SQLite3
- Sequelize

### Frontend

The frontend is responsible for providing a user interface where users can submit streamers and view the list of streamers along with their upvote/downvote counts.

#### Page 1: Streamer Submission Form

This page contains a form where users can submit their favorite streamers. The form includes the following fields:

- Streamer's name
- Streaming platform dropdown (Twitch/YouTube/TikTok/Kick/Rumble)
- Description of the streamer

### Backend

The backend handles data storage and retrieval for the streamer submissions.

#### POST /streamers

This endpoint receives new streamer submissions from the frontend and stores them in a database.

#### GET /streamers

This endpoint returns all stored streamer submissions in response to a request from the frontend.

#### GET /streamer/[streamerId]

This endpoint returns data about a specific streamer identified by `[streamerId]`.

#### PUT /streamers/[streamerId]/vote

This endpoint receives an upvote for a specific streamer and updates their current upvote/downvote count.

## Getting Started

To run the project locally, follow these steps:

1. Clone the repository.
2. Run `npm install` to install the backend dependencies.
3. Run `npm start` to start both the frontend and the backend servers.
4. Access the application in your web browser.

## Conclusion

This streamer spotlight application provides an easy way for users to submit their favorite streamers and interact with them through upvoting and downvoting. The frontend and backend components work together to ensure a smooth user experience.
