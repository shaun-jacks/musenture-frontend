## Project Links

- Project URL: [https://musenture-fcc94.firebaseapp.com/](https://musenture-fcc94.firebaseapp.com/)
- Github URL Frontend: [https://github.com/shaun-jacks/musenture-frontend](https://github.com/shaun-jacks/musenture-frontend)
- Github URL Backend: [https://github.com/shaun-jacks/musenture-backend](https://github.com/shaun-jacks/musenture-backend)

## Technologies Used

This is an ongoing full stack application.

The frontend stack consists of:

- [React](https://reactjs.org)
- [Redux](https://redux.js.org/)
- [styled components](https://www.styled-components.com/)

The backend is developed with:

- [Node JS](https://nodejs.org/en/)
- [MongoDB](https://www.mongodb.com/)

The project is being hosted with three cloud services:

- [Google Firebase](https://firebase.google.com/) for the frontend
- [Heroku](https://www.heroku.com/) for the backend
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for the database

## Brief description

This is a music social media application where a user can

- create their own account
- follow/unfollow users
- create a jam session where other users can join
- Edit their own account

The data is stored in a MongoDb Atlas cloud database. All actions and frontend asynchronous calls are handled by Redux for state management.

The website is fully responsive via css media queries, the use of css grid to change navbar locations, and css flexbox for flex-wrapping jam sessions and users.

## Features

### Register for an account

- Local login strategy used that requires email and password
- password hashed before stored in database

![png](https://github.com/shaun-jacks/musenture-frontend/blob/master/readme_media/register.PNG =100px)

### Login

- When a user logs in, email and password searched in database, if match, JSON Web Token generated and sent to client's localStorage
- Authorized calls verify JSON webtoken via middleware on backend.

![png](https://github.com/shaun-jacks/musenture-frontend/blob/master/readme_media/log-in.PNG)

### Follow / Unfollow other users

- User can follow other users

![png](https://github.com/shaun-jacks/musenture-frontend/blob/master/readme_media/user-page.PNG)

### Create a Jam!

- User can create a jam session via modal form

![png](https://github.com/shaun-jacks/musenture-frontend/blob/master/readme_media/create-jam.PNG)

### Edit profile

- User can further edit their profile providing additional details such as display name, bio, and instrument played.

![png](https://github.com/shaun-jacks/musenture-frontend/blob/master/readme_media/edit-profile.PNG)

### Explore other jams

- User gets a view of other jams in application

![png](https://github.com/shaun-jacks/musenture-frontend/blob/master/readme_media/jams-list.PNG)

### Explore other users

- User gets a view of other users in application

![png](https://github.com/shaun-jacks/musenture-frontend/blob/master/readme_media/users-list.PNG)

### Join other jam sessions

- User can join other jam sessions posted by other users

### User Actions require login

The following actions require user login:

- Joining a jam
- Creating a jam
- Editing a profile
- Following a user

If user is not logged in, a modal warning will be displayed.

## Motivation and Conclusion

I wanted to combine my passion for music with my technical skills.

This project taught me how to build an application from scratch with create-react-app and node.js, and how to tackle and prioritize TODOs.

It was another great experience seeing a project from beginning to end. It combines topics from user login and registration, social media applications, while handling data in the backend and creating a responsive frontend interface.
