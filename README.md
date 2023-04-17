# NOEX-CLI v1.2.3

Noex-CLI is a powerful command-line tool for creating and managing Noex applications, which are built on top of Node.js and Express. It provides a streamlined workflow for developers to create robust and scalable web applications, with built-in features for security and database management.

## Installation

To install Noex-CLI globally on your system, you can run the following command:

```bash
npm install -g noex-cli

```

Once installed, you can access Noex-CLI from any directory in your system.

## Key Features

### Create Noex Applications

Noex-CLI makes it easy to create new Noex applications with just one command. Simply run:

```bash
noex new my-app
```

This will generate a new Noex application directory with a predefined project structure, including an Express server, a sample database configuration, and security middleware.

### Security Features

Noex-CLI includes built-in security features to help developers create secure web applications. It includes best practices for securing Express applications, such as helmet middleware for setting secure HTTP headers, csrf protection, and XSS prevention.

### Database Management

Noex-CLI simplifies database management in Noex applications. It includes pre-configured options for popular databases like MongoDB and MySQL making it easy to set up and configure database connections.

### Scalability

Noex-CLI is designed with scalability in mind, allowing developers to easily create scalable web applications. It provides a modular architecture, making it easy to add and configure components like routers, controllers, and services.

### Customizable Templates

Noex-CLI includes customizable templates for generating different types of applications, such as REST APIs, web applications, and more. These templates can be easily extended or modified to suit the specific requirements of your project.

## Example Commands

Create a new Noex application:

```bash
noex new my-app

noex new Blog
```

Create new module in MongoDB or MYSQL

```bash
noex generate module-name

noex generate post
```

Setup NOEX Application

```bash
noex init

cd Blog
noex init
```

To access the help documentation for Noex-CLI, you can use the following command:

```bash
noex -h
```

## Conclusion

Noex-CLI is a powerful and versatile command-line tool for creating and managing Noex applications. With its rich features and customizable templates, it provides developers with a seamless workflow for building secure, scalable, and efficient web applications. Give it a try and experience the power of Noex-CLI in your Noex projects today!

#### Contact me

Linkedin: https://bit.ly/3GQJ7mB
Website: https://abhijithpsubash.com/
