# Taskinator – Backend Setup Guide

This guide walks you through setting up the Taskinator project backend, including MySQL database configuration and environment variable setup.


## Project Overview

Taskinator is a full-stack task management application built with React, Node.js, and MySQL. This guide focuses on setting up the **backend** environment locally for development or testing purposes.


## Required Files

Ensure the following files exist inside the `/backend` directory before beginning:

`schema.sql` – Defines the database tables and structure
`seed.sql` – Inserts sample data to populate the database
`.env.example` – Shows how to set up your own `.env` file


## Prerequisites

Node.js installed
MySQL installed and running
Access to the `mysql` CLI (`mysql -u root -p`)
Git (if cloning the repo)


## Step-by-Step Setup Instructions:


### Step 1: Clone the Repo and Navigate to Backend
git clone https://github.com/your-username/taskinator.git
cd taskinator/backend

### Step 2: Create the MySQL Database
mysql -u root -p

CREATE DATABASE taskinator;
EXIT;


### Step 3: Run the Schema Script
mysql -u root -p taskinator < schema.sql


### Step 4: Run the Seed Script
mysql -u root -p taskinator < seed.sql

### Step 5: Set Up the .env File, see env.example for template
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=       # leave blank or use your MySQL pass
DB_NAME=taskinator
JWT_SECRET=superSecretKey

### Step 6: Install Dependencies and Start the Server
npm install
npm start

### Step 7: Login Credentials for user account
Email:    johndoe@gmail.com
Password: password