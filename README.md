# Car Rental Application Frontend

This repository contains the frontend code for the Car Rental web application, built using React and TypeScript. The application provides an intuitive user interface for browsing, reserving, and managing rental cars.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
- [API Integration](#api-integration)

## Features
- Browse available cars with filters.
- User authentication and authorization with JWT.
- Reserve cars for specific time periods.
- Admin panel for managing the fleet.
- Responsive design for mobile and desktop devices.

## Technologies Used
- **React**
- **TypeScript**
- **Fetch API**

## Setup and Installation

The following instructions have been proved to be working on a Windows machine. It should also work on a Linux/Mac machine, though it has not been checked.

### Steps
1. Check if you have git installed
   ```bash
   git --version
   ```
   If it's not installed visit https://git-scm.com/book/en/v2/Getting-Started-Installing-Git and follow the steps to installing git on your machine 

2. Clone the repository:
   ```bash
   git clone https://github.com/dominikdlubala/wypozyczalnia_samochodow-front
   ```
3. Navigate to the project directory:
   ```bash
   cd wypozyczalnia_samochodow-front/clientapp
   ```
4. Check if you have Node.js and npm installed
   ```bash
   node -v
   npm -v
   ```
   If they're not installed visit https://nodejs.org/en/download/ and follow the steps to installing them on your machine
   
5. Install dependencies:
   ```bash
   npm install
   ```
6. Start the development server:
   ```bash
   npm start
   ```

The application will be available at `http://localhost:3000`.

## API Integration
This frontend interacts with a backend API built with ASP.NET. 
Available at https://github.com/dominikdlubala/wypozyczalnia_samochodow-back. 
Ensure the backend is running.
