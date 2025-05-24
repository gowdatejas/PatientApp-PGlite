# 🏥 Patient Registration App

A frontend-only **React application** that allows users to register patients, execute raw SQL queries, and persist data using **Pglite** (SQLite in the browser). It supports **cross-tab synchronization** using the `BroadcastChannel` API and maintains persistence across browser refreshes.

------------------------------

## 🚀 Features

- ✅ **Register New Patients**  
  Users can fill out a form to add new patients to the database.

- ✅ **View All Records**  
  Displays all patient entries in a clean table layout.

- ✅ **Run Raw SQL Queries**  
  A panel allows users to write and execute custom SQL queries (e.g. `SELECT * FROM patients`).

- ✅ **Data Persistence**  
  Patient data is stored via IndexedDB, ensuring persistence across browser reloads.

- ✅ **Cross-Tab Synchronization**  
  Uses the `BroadcastChannel` API to keep all open tabs in sync in real time.

- ✅ **Responsive & Styled UI**  
  Built with **MUI** components and custom styles using `@emotion/styled`.
  
-------------------------------

## 🧪 Tech Stack

- **React**
- **JavaScript**
- **Pglite** – WebAssembly SQLite
- **BroadcastChannel API**
- **Vercel** for deployment
- **Netlify** for deployment

------------------------------

## STRUCTURE OF THE PROJECT

patient-registration-app/

├── public/

│   ├── index.html

│   ├── styles.cs

│   └── favicon.ico

├── src/

│   ├── components/

│   │   ├── PatientForm.js

│   │   ├── PatientList.js

│   │   ├── SqlQuery.js

│   │   ├── Dashboard.js

│   │   ├── LoadingSpinner.js

│   ├── db/

│   │   ├── DatabaseContext.js

│   │   └── Pglite.js

│   ├── pages/

│   │   ├── HomePage.js

│   │   ├── PatientsPage.js

│   │   ├── QueryPage.js

│   ├── App.js

│   ├── index.js

│   └── wasmLoader.js

├── vercel.json

├── package.json

└── netify.toml

-----------------------------------

## 🛠️ Setup

### Prerequisites
  - Node.js v18+ 
  - npm v9+
    
## 📦 Getting Started

### 1. Clone the Repository & Install all the dependencies

bash:

  ---//creating project.
   * ✅ npx create-react-app patient-registration-app
     
     ---//changing directory.                   
   * ✅ cd patient-registration-app
     
     ---//installing pglite for datastorage.                                
   * ✅ npm install @electric-sql/pglite
     
     ---//installing router for rendering.                 
   * ✅ npm install react-router-dom
     
     ---//provides prebuilt, responsive & respnsive UI.                    
   * ✅ npm install @mui/material
     
     ---//package is part of popular css-in-JS library.   
   * ✅ npm install @emotion/react
     
     ---//use to create styled components using a syntax.                       
   * ✅ npm install @emotion/styled
     
     ---//create custom styles on both native & MIUI component.     
   * ✅ npm install @mui/icons-material                   

------------------------------------

## 2. Write the code

VsCode:

 -- in vscode write all the code which has shown in structure .
 -- After writing the code go to src -> right click -> Integrated terminal -> npm install ( to install all the dependencies ) -> check every dependencies is installed properly
 -- After installing -> in the same terminal -> npm start (to start the project)

-----------------------------------------

💻 Development

  bash
   # Start development server
   npm run dev
    
   # Run tests
   npm test
    
   # Build for production
   npm run build                  // same command for both vercel and netlify

🌐 Deployment
 
  --Netlify

  install netlify 
  
   * ✅ npm install -g netlify-cli
     
  Login to Netlify
  
  * ✅ netlify login
    
  Commit the code 
  
  * ✅ git add netlify.toml
         git commit -m "Add Netlify config"
         
  Deploy to Netlify

  * ✅ netlify deploy --prod
     
  Follow the prompts:

  "Create & configure a new site" → Select your team (or personal account).
  
  "Site name" (optional): Press Enter to let Netlify auto-generate one.
  
  Wait for the build to complete.

--------------------------------------------------------------

  🌐 Deployment
  
  --Vercel
  
  install vercel 
  
   * ✅ npm install -g vercel
      
  Login to vercel
  
  * ✅ vercel login
     
  Commit the code 
  
  * ✅ git add vercel.json
         git commit -m "Add vercel config"
         
  Deploy to Netlify
  
  * ✅ vercel deploy --prod
     
Follow the prompts:

  "Set up and deploy" → Press Enter for current directory
  
  "Link to existing project?" → Type N for new project
  
  "What's your project's name?" → Press Enter for default
  
  "Which scope do you want to deploy to?" → Select your account
  
  "Override settings?" → Type N

---------------------------------------------    

📝 Usage Instructions

🏥 Dashboard :

   -- Shows average age of total patient.
    
   -- shows count of number of patients.
    
   -- shows the count of male patients and female pateints.


➕ Register Patient :

   -- Fill out the form with Name, Age, Gender, and Contact.
    
   -- Click Register to save the record.

🔍 Query with SQL :

   -- Navigate to the SQL Query section.
    
   -- Type raw SQL like:
    
    ex: Select * from patents
    
   -- Results are displayed.

🔄 Multiple Tabs :

   -- Open multiple tabs of the app.
    
   -- Register or delete patients in one tab.
    
   -- All tabs will automatically refresh and reflect changes instantly.

-----------------------------------------------

🧠 How It Works

  - ✅ Database: Uses pglite to run SQLite in the browser, stored via IndexedDB. Pglite provides a WebAssembly-based SQLite engine that stores the data using IndexedDB under the hood.
  
  - ✅ Cross-tab sync: BroadcastChannel broadcasts a refresh message on insert. BroadcastChannel API sends a sync event between tabs whenever an insert/query happens.
  
  - ✅ Persistence: IndexedDB ensures data survives page reloads and tab switches. MUI + Emotion ensures the interface is modern, responsive, and customizable.

---------------------------------------------------

🐛 Challenges Faced

  -- WebAssembly Initialization Errors:
      Initial attempts to load Pglite more than once across components caused race conditions. 
      Fixed by centralizing DB logic in a pglite.js and connection db file and reusing one instance.
  
  -- Cross-Tab Sync Not Triggering Consistently:
      Ensured that broadcast messages were correctly structured and listener logic updated 
      state properly after receiving the signal.
  
  -- SQL Error Handling:
      SQL syntax errors caused app crashes initially. Added try/catch handling and user- 
      friendly error messages.
  
  -- Deployment Issues on Vercel & netlify:
      Needed to ensure that vercel.json had correct base paths and that only frontend assets 
      were bundled. and for netlify i Added _redirects file and Netlify configuration in netlify.toml that is 
       [[redirects]]
        from = "/*"
        to = "/index.html"
        status = 200
        
 -- Performance Optimization
      it was too Slow rendering with 1000+ records.
      so the Solution Added was windowing and query caching.

-------------------------------------------------

Commit History :

   * - feat: Add patient registration form with validation. 
   * - feat: Implement patient list view with pagination. 
   * - feat: Add SQL query interface.
   * - feat: Create analytics dashboard.
   * - fix: Resolve 404 errors with Netlify redirects.
   * - chore: Configure PGLite initialization.
   * - docs: Add README and deployment instructions.

--------------------------------------------------       
    
 🌐 Live Demo
 
 🟢 Deployed on Vercel:
 
  Link: 
   🔗 https://patient-registration-app-one.vercel.app/
 
 🟢 Deployed on Netlify:

  Link: 
   🔗 https://patient-reg-app.netlify.app/

---------------------------------------------------

  📬 Contact
   
   Made by Tejas C M
   
  🔗 GitHub: https://github.com/gowdatejas
      
  📧 Email: tejasmgowda28@gmail.com


      
