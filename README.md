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
### 1. 登录
![1](GIF_20240509160539743.GIF)
<img src="https://example.com/path/to/image.png" width="300" height="200" alt="Description">

### 2. 展示首页
- 首页包括 **轮播** 和 **Playlist**。
- 点击某个 **Playlist**，进入并播放音乐。

### 3. 随机艺人页面
- 点击 **随机视频** 页面。
- 点击页面中的 **刷新符号**，每次操作后重新获取一组艺人。

### 4. 最新专辑
- 点击 **最新专辑** 链接。
- 下滑以展示多组专辑。
- 点击 **more** 进入选定的专辑详情页面。

### 5. 搜索功能
- 搜索关键词 "Taylor Swift"，可选定搜索专辑（Album），艺人（Artist），或音轨（Track）。
- 在音轨搜索结果中，点击一条音轨以触发音乐播放。
- 调整音乐的 **声音大小** 和使用 **暂停** 功能。

## 6. 评论功能
- 访问Taylor Swift音轨搜索结果中的第一首歌曲的评论区。
- 展示现有评论并添加一条评论：“good!”，然后发表。

## 7. 机器人推荐歌曲功能
- 输入 **prompt1**: "I get A+, I’m happy now"。
- 输入 **prompt2**: "Can you recommend a citypop type song to me"。
- 机器人根据输入推荐歌曲。

## 8. 群聊功能
- 使用应用内群聊功能进行交流。

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

