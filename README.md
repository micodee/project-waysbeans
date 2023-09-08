# Waysbeans

Waysbeans is a website a E-Commerce called WaysBeans which provides products in the form of quality coffee powder. 
with WaysBeans, users could explore the collection of high-quality coffee and easily made purchases through the platform. With the use of cutting-edge technology, WaysBeans provided a comfortable and secure shopping experience for users who wanted to enjoy the finest coffee quality.

This website was created using [Bootstrap](https://getbootstrap.com/) and [SCSS](https://sass-lang.com/) for styling, [React JS](https://react.dev/) for the frontend framework, [Redux Toolkit](https://redux-toolkit.js.org/introduction/getting-started) for state management, [GO](https://go.dev/) for the backend with the [Echo](https://echo.labstack.com/) framework, [Gorm](https://gorm.io/) for querying the database, [PostgreSQL](https://postgresql.org/) as the database, and [Cloudinary](https://cloudinary.com/) as as the file storage.

## Frontend :
- React JS
- SCSS
- Bootstrap
- Redux Toolkit

## Backend :
- Golang (echo)
- Postgres (database)
- Gorm
- JWT
- Bcrypt (password hashing)
- Midtrans (payment gateway)
- Cloudinary (save image)


## Deployment :
- Frontend Vercel https://dumbsound-two.vercel.app/
- Backend Railways

## Available Features

- Register and Login.
- Filter login as customer or admin.
- The shopping basket for customers.
- Home page show products base.
- Product detail page that displays product details and also a button to add the product to the customer's shopping cart.
- Customer profile page that displays customer identity and customer transaction history.
- Product list page that displays a list of products and delete and update buttons that can be used by admins to delete and update products.
- Email notification to the admin when there is an order.
- API Endpoint to perform CRUD (Create, Read, Update, Delete) on User data.
- API Endpoint to perform CRUD (Create, Read, Update, Delete) on Product data.
- API Endpoint to perform CRUD (Create, Read, Update, Delete) on each User's Cart data.
- API Endpoint to perform CRUD (Create, Read, Update, Delete) on each User's Transaction data.
- Password Hashing Middleware for each User using [Bcrypt](https://pkg.go.dev/golang.org/x/crypto/bcrypt).
- Middleware Upload File to upload files from user input files.
- Middleware to authenticate by creating a Token from [JWT](https://jwt.io/).
- Payment Gateways using [Midtrans](midtrans.com).

