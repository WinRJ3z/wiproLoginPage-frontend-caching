# wiproLoginPage-frontendcaching
# Django-React Front-End Caching with IndexedDB
Transformium 

![image](https://github.com/WinRJ3z/wiproLoginPage-frontendcaching/assets/97877584/ce6f658a-7cfa-40fa-84f1-c793786ff84e)
Sign In page
![image](https://github.com/WinRJ3z/wiproLoginPage-frontendcaching/assets/97877584/b87bf4a7-1313-4713-b557-50ac5a6badb1)
Sign Up page
![image](https://github.com/WinRJ3z/wiproLoginPage-frontendcaching/assets/97877584/fc4f1610-2031-448b-83a2-b1263e80a5bf)
HomePage
![image](https://github.com/WinRJ3z/wiproLoginPage-frontendcaching/assets/97877584/2202f950-9c01-4ee3-aae6-aaeb3de722dc)
Indexeddb



This is a Django-React application that demonstrates front-end caching using IndexedDB. It allows users to sign up, log in, and access protected resources via RESTful API endpoints. The front-end caching is implemented using IndexedDB, which stores data on the client-side for faster retrieval.

## Technologies Used

- Django: A Python web framework for building the back end.
- Django Rest Framework (DRF): A powerful and flexible toolkit for building Web APIs in Django.
- SimpleJWT: A package for adding JSON Web Token (JWT) authentication to Django applications.
- Corsheaders: A Django application for handling Cross-Origin Resource Sharing (CORS).
- Reactjs
- IndexwdDB

## Features

- User Registration: Users can sign up for an account by providing a username, email, name, and password.
- User Authentication: Registered users can log in to access protected resources.
- Front-End Caching: The application uses IndexedDB to cache data on the client side, reducing server requests and improving performance.
- API Endpoints: Exposes RESTful API endpoints for user registration, authentication, and data retrieval.
- Error Handling: Provides error messages and validation for user input.

## Getting Started

### Prerequisites

- Python (3.7+)
- Node.js
- npm
- Django
- Django Rest Framework
- SimpleJWT
- Corsheaders
- reactjs

### Installation

1. Clone the repository:

   ```shell
   git clone https://github.com//wiproLoginPage-frontendcaching-and-sso.git
Set up the django Backend 
Add the correct address of the databases Bus.db and END.db in the settings.py of databases 

        cd backend
        python manage.py migrate
        python manage.py createsuperuser  # Create an admin user
        python manage.py runserver
Set up the React front end:

         cd frontend
         npm install
         npm start
Open your web browser and go to http://localhost:3000 to access the application.

### Usage
-Register a new user account by clicking "Sign Up."
-Log in with your newly registered account.
-Access protected resources and observe the front-end caching in action.
-Explore the API endpoints by referring to the API documentation.
___________________________________________________________________________________________________________________________________________________________________________________________--
### Additional(read only if you want to use sso)
Before you can use SSO with Microsoft Azure, make sure you have the following:

- A Microsoft Azure account.
- An Azure Active Directory (Azure AD) tenant set up.
- Azure AD Application Registration with appropriate permissions.

### Configuration

1. Create an Azure AD Application Registration:
   - Log in to your Azure portal.
   - Navigate to Azure Active Directory > App registrations.
   - Create a new application registration for your project.
   - Note down the Application ID (Client ID) and Directory (Tenant) ID.

2. Configure Redirect URIs:
   - Add the appropriate redirect URIs in your Azure AD application settings to allow authentication from your local development environment (e.g., `http://localhost:8000/auth/azuread/callback`).

3. Configure Environment Variables:
   - In your project, configure environment variables to store Azure AD-related information (Client ID, Client Secret, Tenant ID, etc.). These variables should be securely stored and accessed in your project settings.

4. Update Authentication Views:
   - Customize your Django views in authentiction/`views.py` to integrate Azure AD authentication.
   - run only the localhost:8000 server with the html templates to access the login page with SSO

