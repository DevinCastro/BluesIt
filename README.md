<div align="center">
<img src="./client/src/logo.png" alt="Kitten"
    title="BluesIt" width="150" height="150" />
</div>

> ## **Group project by:**
> Devin Castro
> Danielle Hillman
> Brian Ratunil
> Kenny Yang

This application is deployed at: https://desolate-sands-65866.herokuapp.com/
GitHub Repo: https://github.com/DevinCastro/BluesIt

## Description:
This application is a music oriented social media platform.  While most social platforms are littered with advertising, specific display algorithms, and sell your data, **BluesIt** provides a clean and intuitive interface for musicians and music lovers to share their thoughts and interests with each other.  Log in and start checking out some of the threads that might interest you, and then post and share your thoughts!  When you see a post you're interested in, give it a like and or comment on that thread and share your thoughts with the user who made that post!

## Technologies Used:
This is a full stack MERN application.  Utilizing MongoDB and Mongoose to handle the database.  Express.js to create the server.  React.js to handle all the front end routing and rendering.  Lastly, using Node.js to create and link up the back end.  This application uses fully functional and legitimate **user authentication** with passport, passport-jwt,passport-local, passport-local-mongoose.  This application also uses jsonwebtoken to put user tokers into the local storage upon logging in.  Along with user authentication, we use the token to verify permission to access certain functionality throughout the application.  This application and uses fully functional image uploading.  Using multer, dotenv, and body parser, a user can upload a photo from their local device into our database.  Then we are using js-base64 to grab that image and render the photo on the front end.  

For the front end, we are using bootstrap and reactstrap to handle all of the front end styling.  We are using moment to render out time stamps in a readable date format.  We are using the react-router-dom to handle our front end routing.  The application uses react to modularize our components and pages.  We are using react-toastify to alreat a user when they have incorrect credentials upon logging in.  The tab search widget is using a 3rd party API from Songsterr to get the data for a specific tab a user searches for.  This app uses react-icons to render some of our icons.  This application is deployed on heroku using mongo atlas to handle our database.  

## Usage:
If you just want to view posts on BluesIt, you do not need an account.  If you want to access any functionality, you will need to make an account! To start using BluesIt, first you are going to head over to the login/signup page.  Enter in all of your information: name, email, username, and password!  Then select a profile picture and upload it!  After you click register, you are ready to log in!  When you enter in your username and password INCORRECTLY, you will get a toast telling you that you have the wrong credentials.  If you log in successfully, you will be taken to the homepage and your profile picture will render in the upper right corner of the screen.  Now you can use all the functionality of this app including: liking/unliking posts, making posts, and commenting on posts.  To make a post, click "make a post" and enter in the title of your post, the body of the post, and you can add an optional link that you want to share or reference.  To like any post, simply click the thumbs up button on the post that you like.  To view the full thread of a post you're interested in, click "view thread".  On this page you can see the full post and all the comments from all users made on this post.  You will also be able to add a comment of your own here.  Simply click "add comment" and write what you would like to say.  Back on the homepage, you can sort all the posts based on, most liked, most recent, and most comments.  You can also use the tab serach widget at any time simply by typing in the name of a song that you want.  

## Screenshots:
![Screenshot](https://user-images.githubusercontent.com/65981639/94970039-a4c80e80-04b8-11eb-93fa-76592b62facc.png)
![Screenshot](https://user-images.githubusercontent.com/65981639/94967171-6aa83e00-04b3-11eb-9d37-dc07c5ba3dae.png)
![Screenshot](https://user-images.githubusercontent.com/65981639/94967354-bfe44f80-04b3-11eb-8295-17b95a4acd56.png)
