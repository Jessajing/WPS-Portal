WPS Portal - Phishing Awareness Simulation

Stack:
- React (Vite)
- Node.js + Express
- MySQL
- phpMyAdmin / Laragon

IMPORTANT:
This is an awareness simulation. The password field is only for the visual/login experience.
The backend deliberately does NOT receive or store the password.

SETUP:
1. Start Laragon and MySQL.
2. In phpMyAdmin, create database `wps_portal`.
3. Run the SQL in database.sql.
4. Open a terminal in backend:
   npm install
   node server.js
5. Open another terminal in frontend:
   npm install
   npm run dev
6. Open the Vite URL shown in the terminal.

Database:
See database.sql.

If you use a real device instead of the same computer, replace
http://localhost:5000 in frontend/src/App.jsx with your computer's LAN IP.
