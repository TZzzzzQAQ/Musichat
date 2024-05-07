# Musichat

## Description
The Spotify Clone project is a web application that mimics the functionality of the Spotify music streaming service. It allows users to play music, search for songs, artists, and albums, login to their accounts, view their favorite and saved songs, and control playback features such as shuffle, repeat, volume adjustment, and skip functionality. The application is built using React for the frontend, Node.js for the backend, and MongoDB Atlas as the cloud database.

## Features
- **Music Playback:** Users can play, pause, skip to the next or previous track, and control playback features.
- **Search Functionality:** Users can search for songs, artists, and albums.
- **User Authentication:** Users can create accounts, login, and logout securely.
- **View Saved Songs:** Users can view their saved songs and albums.
- **Favorite Songs:** Users can view their favorite songs and albums.
- **Playback Controls:** Users can control playback features such as shuffle, repeat, and volume adjustment.
- **Responsive Design:** The application is designed to be responsive and accessible across various devices.

## Technologies Used
- **Frontend:** React.js
- **Backend:** Node.js
- **Database:** MongoDB Atlas
- **API Integration:** Spotify Web API
- **Styling:** Tailwind
- **Deployment:** AWS

## Project Setup Instructions

### FrontEnd Setup
Follow these steps to set up the frontend part of the project:

1. **Navigate to the Client Directory**
   ```bash
   cd client
   ```

2. **Install Dependencies**
   Install all the necessary dependencies for the frontend.
   ```bash
   npm install
   ```

3. **Start the Development Server**
   Launch the development server to enable real-time site or application testing.
   ```bash
   npm run dev
   ```

   #### Setting Up Environment Variables for FrontEnd
   Create a `.env` file in the `client` directory and include the following variables:
   ```
   VITE_CLIENT_ID=<Your_Client_ID>
   VITE_CLIENT_SECRET=<Your_Client_Secret>
   ```

### BackEnd Setup
Follow these steps to set up the backend part of the project:

1. **Navigate to the Server Directory**
   ```bash
   cd server
   ```

2. **Install Dependencies**
   Install all the necessary dependencies required for the backend to function.
   ```bash
   npm install
   ```

3. **Launch the Backend Application**
   Start the backend application by executing the `index.js` file with Node.js.
   ```bash
   node index.js
   ```

   #### Setting Up Environment Variables for BackEnd
   Create a `.env` file in the `server` directory and include the following variables:
   ```
   VITE_OPENAI_ASSISTANT_ID=<Your_OpenAI_Assistant_ID>
   VITE_OPENAI_API_KEY=<Your_OpenAI_API_Key>
   MONGO_URI=<Your_MongoDB_URI>
   PORT=<Your_Port_Number>
   ```


## Deployment
1. Set up hosting platforms for frontend (Vercel, Netlify, etc.) and backend (Heroku, AWS, etc.).
2. Configure deployment settings and environment variables on the hosting platforms.
3. Deploy the frontend and backend applications using respective commands or through CI/CD pipelines.

## Usage
1. Navigate to the deployed application URL.
2. Register for a new account or log in with existing credentials.
3. Search for songs, artists, or albums using the search bar.
4. Play, pause, and control playback features.
5. View saved and favorite songs in the user profile section.
6. Adjust playback settings such as shuffle, repeat, and volume.
7. Enjoy streaming music seamlessly!

## Contributing
- Fork the repository.
- Create a new branch: `git checkout -b feature/new-feature`
- Make your changes and commit them: `git commit -m 'Add new feature'`
- Push to the branch: `git push origin feature/new-feature`
- Submit a pull request detailing your changes.

## License
This project is licensed under the [MIT License](LICENSE).

## Acknowledgements
- Spotify for providing access to their API.
- React, Node.js, MongoDB, and other open-source technologies used in this project.
- Contributors and open-source community for their valuable contributions and support.
