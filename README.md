# Project 4 - Learning Portal

## Introduction
The Learning Portal is a comprehensive full-stack application that enables users to sign up and log in, allowing them to explore a diverse range of learning programs. Users can easily browse various educational offerings, and add their preferred programs to their profiles for quick access. This project was developed in just one week, showcasing a streamlined process that involved both frontend and backend development. 


> [!NOTE] 
> This repo contains code for the front end. For back end, please refer to the repo [HERE](https://github.com/normanKL/LMS-Project-4-Backend)


## Installation

* You can check out the live application [HERE]()
  You can use your own login credentials, or try a demo one using:
    + username:
    + password:


## Licensing Portal Walkthrough 

   ### Home, Signup and Login Pages


  ### User's Profile Page


   ### Learning Programs Pages


   ### Author Pages



 ## Tech Stack

  ### Front End
  * React Framework (Single Page Application)
  * API Handling: Axios
  * Bulma and CSS
  * React-Router-Dom
    
  ### Back End
  * Server: Django & Django Rest Framework
  * Database: PostgreSQL
  * Authentication: JSON Web Token (pyJWT)
    
  ### Collaboration & Development
  * Git, GitHub
  * Postman for API testing
  * Excalidraw for wireframing
  * npm & pipenv
    
  ### Deployment:
  * Front End: Netlify
  * Back End: Heroku

    
## Features

* Profile Display and Navigation: View your own profile, educational offerings, and all authors, with the ability to navigate to program pages and authors' profiles for more detailed information.
* Restricted Profile Editing: Only admins can edit program details and author information.
* Authentication: Log-in and sign-up functionality is available for users.
* IT Support Access: A dedicated button allows users to email IT support directly for assistance.

## Post Login Capabilities:

* Welcome Banner: Upon login, a personalized banner greets the user by name, along with the local date and time.
* Add Preferred Programs to Profile: Users can add their preferred programs to their profiles and start their learning whenever they like. They can also remove programs from their profiles as needed.
* Browse Programs Created by Each Author: Users can explore educational offerings by their preferred authors.
* Comment on Educational Programs: Users can provide feedback via the comment section on the learning programs.


## Architecture

### Front End:
* React Components to compartmentalise code
* React Hooks for state management and handling side effects
* Single Page Application (react-router-dom) using Link, useNavigate, useLocation and useParams

### Back End:
* All security checks (user access credentials) done in the back end:
* 1) Email validation (correct format and uniqueness)
* 2) Password validation 
* 3) Obscuring the password response in the database and from the client side
* 4) Login credentials expire after 1 day
* Data seeding of 20 programs, 10 authors and 5 users.
* 5 tables/models in PostgreSQL, many-to-many relationships


## Future Improvements & Bugs
* While this is a basic portal that can be developed in just over a week, several enhancements and additional features are necessary to transform it into a fully functional and valuable tool:
* 1) Integration with a Learning Platform: The app should be connected to a comprehensive learning platform that offers actual learning materials, assessments, certification options, and program completion status categorized by level.
* 2) Enhanced Data and Search Functionality: Currently, the data is limited. It would be beneficial to expand the dataset and implement a feature that allows users to search for educational offerings by topics and industries. 
* 3) Payment/Donation Functionality: If this is intended to be a paid learning portal, a payment or donation function should be incorporated to facilitate transactions.

* After several rounds of testing, no bugs have been identified in this version of the portal.
