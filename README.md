# Flavor Fusion 🌱

A recipe platform that provides users with cooking guides and a space to discuss their favorite dish

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [License](#license)

## Installation

### Clone the Repository
   ```sh
   git clone https://github.com/Ethan-code-1/launch24-swe-week3-team6.git
   ```

### Front-End Installation

1. **Go to Front-End Folder**
   ```sh
   cd frontend

2. **Install Dependencies**
   ```sh
   npm install

### Back-End Installation

1. **Go to Back-End Folder**
   ```sh
   cd backend
   ```

2. **Install Dependencies**
   ```sh
   npm install

3. **Set Up Environment Variables**
    Create a .env file in the backend directory with the following content, replacing the placeholders with your actual Spotify API credentials:
   ```sh
   APP_ID=your APP ID from Edamam API
   APP_KEY=your APP KEY from Edamam API
   OPENAI_API_KEY=your API KEY from openai API

### Linking Your Project to Firebase with `serviceAccount.js`

#### 1. Set Up Firebase Project

1. **Create a Firebase Project**
   - Go to the [Firebase Console](https://console.firebase.google.com/).
   - Click on "Add project" and follow the prompts to create a new Firebase project.

2. **Generate a Service Account Key**
   - In the Firebase Console, navigate to your project.
   - Click on the gear icon next to "Project Overview" and select "Project settings".
   - Go to the "Service accounts" tab.
   - Click on "Generate new private key" and confirm by clicking "Generate key". This will download a JSON file containing your service account credentials.

#### 2. Create `serviceAccount.json`

1. **Create a New File**
   - In your project directory, create a new file named `serviceAccount.json`.

2. **Add the Service Account Credentials**
   - Copy the content of the downloaded JSON file and paste it into `serviceAccount.json`.
   - Export the credentials as a module. Your `serviceAccount.json` should look like this:

   ```javascript
   const serviceAccount = {
     "type": "service_account",
     "project_id": "your-project-id",
     "private_key_id": "your-private-key-id",
     "private_key": "-----BEGIN PRIVATE KEY-----\nYOUR-PRIVATE-KEY\n-----END PRIVATE KEY-----\n",
     "client_email": "your-client-email@your-project-id.iam.gserviceaccount.com",
     "client_id": "your-client-id",
     "auth_uri": "https://accounts.google.com/o/oauth2/auth",
     "token_uri": "https://oauth2.googleapis.com/token",
   }


## Usage

Once everything is setup `cd` to the project folder. In order to start the frontend server.

```bash
cd frontend
npm run dev
```

Then to start the backend server go back to parent directory and then.

```bash
cd backend
npm start
```
Go to http://localhost:5173/ to access the app.

## Features
 - Explore recipes from Edamam API other user created recipes
- Search a recipe based on its name
- Filter recipes by cuisine type or meal type
- Consult with AI Chatbot
- Create your own recipe
- Rate and leave reviews on other's recipes
- Allow administrator log in to verify or delete recipes

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

- [Kening Zhao](mailto:keningz@umich.edu)
