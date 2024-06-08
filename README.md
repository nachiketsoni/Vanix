# Steps to Run this Project
### Requirements
1. **Node.js and npm**: Download from [Node.js website](https://nodejs.org/).
2. **Git**: Download from [Git website](https://git-scm.com/).

### Steps

1. **Clone the Repository**
   - Open your terminal.
   - Run these commands:
     ```sh
     git clone https://github.com/your-username/your-repository.git
     cd your-repository
     ```

2. **Install Dependencies**
   - In the project directory, run:
     ```sh
     npm install
     ```

3. **Set Up Environment Variables**
   - Create a `.env` file in the project directory and add the following lines:
     ```
     HOST=http://localhost:8080/
     PORT=8080
     MONGODB_URI=mongodb://127.0.0.1/vanix
     JWT_EXPIRE=5d
     JWT_SECRET=MIICWwIBAAKBgHgnvr7O2tiApjJfid1orFnIGm6980fZp+Lpbjo+NC/0whMFga2Biw5b1G2Q/B2u0tpO1Fs/E8z7Lv1nYfr5jx2S8x6BdA4TS2kB9Kf0wn0+7wSlyikHoKhbtzwXHZl17GsyEi6wHnsqNBSauyIWhpha8i+Y+3GyaOY536H47qyXAgMBAAECgYAOphnVPXbk6lpYzdkLC1Xn5EOEuNfOLLURLxBnPWozZo26r/Mtahu/9mYhrYlvPP8r6mxta3VIil8iOdZyOLa/4d1LPd+UehgEXIJEiYXLtn7RS5eUnoPuQxssfs1kOWjdN8p6SzppleegFTvGRX4K
4. **Start the Project**
   - Run:
     ```sh
     npm start
     ```
   - For development mode:
     ```sh
     npx nodemon
     ```

5. **Access the Application**
   - Open your browser and go to `http://localhost:8080` (or the configured port).

