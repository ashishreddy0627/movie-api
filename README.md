# Movie API Service

This project provides an API that fetches movies for a given year, sorted by descending popularity. It also retrieves the list of editors for each movie. The service uses the TMDB (The Movie Database) APIs.

---

## **Features**

- Fetches movies for a given year.
- Sorted by descending popularity.
- Retrieves optional editors for each movie (graceful fallback if the credits API fails).
- Supports pagination.

---

## **Technologies Used**

- **Node.js**: JavaScript runtime.
- **Express.js**: Web framework for building APIs.
- **TypeScript**: Strongly-typed JavaScript.
- **Axios**: HTTP client for making API calls.
- **dotenv**: For managing environment variables.

---

## **Prerequisites**

Ensure the following are installed on your machine:

1. **Node.js** (v21+): [Download Node.js](https://nodejs.org/)
2. **npm** (comes with Node.js)
 


## **Steps to Set Up and Run**

### **Step 1: Clone the Repository**


git clone <your-repository-url>
cd movie-api

### **Step 2: Install Dependencies**
npm install

### **Step 3: Configure Environment Variables**
Update configuration at src/.env file 
TMDB_API_BASE=https://api.themoviedb.org/3
TMDB_BEARER_TOKEN=your_tmdb_bearer_token
PORT=3000

### **Step 4: Run the Application**
npm run dev

### **Step 5: Test an API**
http://localhost:3000/api/movies?year=2019&page=1

### **Step 6: Run Test Cases**

npm test