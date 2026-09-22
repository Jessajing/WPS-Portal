WPS Portal - Phishing Awareness Simulation

Stack:
- React (Vite)
- Supabase

IMPORTANT:
This is an awareness simulation. The password field is only for the visual/login experience.
The backend deliberately does NOT receive or store the password.

SETUP:
1. Create a Supabase project.
2. In the Supabase SQL Editor, run database.sql.
3. Copy frontend/.env.example to frontend/.env and fill in the project URL and anon key.
4. Open a terminal in frontend:
   npm install
   npm run dev
5. Open the Vite URL shown in the terminal.

Database:
See database.sql. Supabase Auth stores passwords securely in auth.users. The application stores account email, name, and phone number in user_profiles.

If you use a real device instead of the same computer, replace
http://localhost:5000 in frontend/src/App.jsx with your computer's LAN IP.
