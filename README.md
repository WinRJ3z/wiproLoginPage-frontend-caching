# wiproLoginPage-frontendcaching-and-sso
# Django-React Front-End Caching with IndexedDB

This is a Django-React application that demonstrates front-end caching using IndexedDB. It allows users to sign up, log in, and access protected resources via RESTful API endpoints. The front-end caching is implemented using IndexedDB, which stores data on the client-side for faster retrieval.

## Technologies Used

- Django: A Python web framework for building the back end.
- Django Rest Framework (DRF): A powerful and flexible toolkit for building Web APIs in Django.
- SimpleJWT: A package for adding JSON Web Token (JWT) authentication to Django applications.
- Corsheaders: A Django application for handling Cross-Origin Resource Sharing (CORS).

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

        cd backend
        python manage.py migrate
        python manage.py createsuperuser  # Create an admin user
        python manage.py runserver

   
