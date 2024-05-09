# Musichat
## Description
Musichat is an advanced web application inspired by Spotify, which is used to provide a comprehensive music streaming service and enrich the user experience. Users can enjoy various features such as playing music, searching tracks, managing playlists, and interacting with community features. The application leverages the MERN stack (MongoDB, Express, React, Node.js) for a robust and scalable architecture.

## Features
### 1. Log In
- Log in with your spotify account and enjoy the webapp features (Premium membership required)
<img src="/demonstration/Log%20in.GIF" width="600" height="400" alt="Description">

### 2. Homepage
- The home page feature will show the album cover carousel of the recommended songs and your playlist
<img src="/demonstration/Show%20homepage.GIF" width="600" height="400" alt="Description">

### 3. Random ArtistPage
- This page will randomly recommend you a group of artists, if you are interested, you can click on their home page to see their songs.
<img src="/demonstration/Random%20artist%20page.GIF" width="600" height="400" alt="Description">

### 4. New Release Albums
- This page shows the latest albums
<img src="/demonstration/latest%20album.GIF" width="600" height="400" alt="Description">

### 5. Search Function
- The search bar can search for track, artist and album
<img src="/demonstration/search%20function.GIF" width="600" height="400" alt="Description">

### 6. Comment Function
- This is an additional feature of the project, creating a better space for discussion and support of songs. After logging in, users will be allowed to comment on songs, and the comment content will be stored in the database for a long time. Users can also choose to delete their comments
<img src="/demonstration/Comment%20page.GIF" width="600" height="400" alt="Description">

### 7. Robot Recommendation Song Function
- This is an additional function of the project, here the use of openai assistant api, users can tell the AI their mood, want to listen to the type of song, etc., AI will recommend a song, and then use spotify to search out this, users can listen directly
<img src="/demonstration/Group.GIF" width="600" height="400" alt="Description">

### 8. Group Chat Function
- This is a special function, different users can share and discuss about music in a group chat, all the data is stored in the cloud database, can be viewed in real time
<img src="/demonstration/Robot%20Chat.GIF" width="600" height="400" alt="Description">

### 9. Other Function
- More features look forward to your further exploration
<img src="/demonstration/another.GIF" width="600" height="400" alt="Description">

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
   VITE_APP_API_URL=<Backen_URL>
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
   npm start
   ```

   #### Setting Up Environment Variables for BackEnd
   Create a `.env` file in the `server` directory and include the following variables:
   ```
   VITE_OPENAI_ASSISTANT_ID=<Your_OpenAI_Assistant_ID>
   VITE_OPENAI_API_KEY=<Your_OpenAI_API_Key>
   MONGO_URI=<Your_MongoDB_URI>
   PORT=<Your_Port_Number>
   ```
## Technologies Used

This project is built using the MERN stack, complemented by additional powerful technologies to create a comprehensive full-stack application:

- **Frontend:** [React.js](https://reactjs.org/)
  - A JavaScript library for building user interfaces, particularly single-page applications where you need a fast, interactive user experience.

- **Backend:** [Node.js](https://nodejs.org/)
  - A runtime environment that allows you to run JavaScript on the server side, enabling the development of scalable and efficient web applications.

- **Database:** [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
  - A fully-managed cloud database developed by MongoDB, which provides an elastic and scalable database as a service integrated with advanced features.

- **API Integration:**
  - [Spotify Web API](https://developer.spotify.com/documentation/web-api/)
    - Provides programmatic access to Spotify's data, such as tracks, albums, artists, and playlists, allowing you to build rich experiences with Spotify's vast music library.
  - [OpenAI API](https://beta.openai.com/)
    - Enables the application to utilize advanced AI models for natural language processing and machine learning tasks, enhancing the app’s capabilities with powerful AI features.

- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
  - A utility-first CSS framework for rapidly building custom designs, providing low-level utility classes that help you build completely custom designs without ever leaving your HTML.

- **Deployment:** [AWS (Amazon Web Services)](https://aws.amazon.com/)
  - A secure cloud services platform offering compute power, database storage, content delivery, and other functionalities to help businesses scale and grow.


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

