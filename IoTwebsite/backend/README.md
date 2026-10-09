# IoT Website Backend Setup 🚀

Welcome to the backend of the KMITL IoT Information Engineering curriculum website! This guide will help you set up your local database quickly so you can start developing.

## Prerequisites

1. **Node.js** (v18+ recommended)
2. **MySQL** (v8.0+ recommended)
3. Ensure the MySQL server is running on your machine.

---

## 🛠️ Step 1: Create the Database

First, log into your local MySQL server as `root` (or a user with create database privileges):

```bash
mysql -u root -p
```

Inside the MySQL prompt, create the database:

```sql
CREATE DATABASE iotwebsite CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
exit;
```

---

## 📥 Step 2: Initialize Database Data

We have an NPM script that will automatically populate your database with the EXACT data from the live environment (Professors, Subjects, Metadata, etc.).

Inside this `backend/` folder, run:

```bash
npm run db:setup
```

*(You will be prompted to enter your MySQL `root` password again).*

---

## 🏃 Step 3: Start the Server

Install all dependencies and start the local development server:

```bash
npm install
node server.js
```

The server will start on `http://localhost:3001`! 🎉

---

## 💡 Pro-tips for Coworkers

If you make significant changes to the curriculum data or professors via the Admin UI and want to save those changes for everyone else, run:

```bash
npm run db:dump
```

This will overwrite the `database_setup.sql` file with your current local database state. You can then commit and push that file to Git!
