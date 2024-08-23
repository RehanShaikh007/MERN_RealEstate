# Premium Estate

![Real Estate App Screenshot](https://your-image-link.png)

## Table of Contents

1. [About the Project](#about-the-project)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Installation](#installation)
5. [Usage](#usage)
6. [Contributing](#contributing)
7. [License](#license)
8. [Contact](#contact)

---

## About the Project

The **Premium Estate** is a full-stack web application built with the MERN stack (MongoDB, Express.js, React.js, Node.js). This platform allows users to browse, list, and manage real estate properties, either for sale or for rent. It also includes features like property search, filters, and user authentication.

Experience Live: [Premium Estate](https://mern-realestate-cb9h.onrender.com/)

## Features

- **Property Listings:** Browse, search, and filter properties by sale or rent.
- **Property Details:** View detailed property descriptions, photos, and pricing.
- **User Authentication:** Secure sign-up and login using JWT.
- **Add Listings:** Authenticated users can add their own property listings.
- **Responsive Design:** Fully responsive design for mobile and desktop.
- **Carousel:** Property images displayed using an auto-carousel slider.

## Technologies Used

- **Frontend:**
  - React.js
  - Tailwind CSS for styling
  - Swiper.js for carousels
  - Axios for HTTP requests
- **Backend:**
  - Node.js with Express.js
  - MongoDB with Mongoose for the database
  - JWT for authentication
- **Deployment:**
  - Frontend hosted on Render
  - Backend hosted on Render
  - Firebase for file storage (property images)

## Installation

### Prerequisites

- Node.js
- npm or yarn

### Steps

1. Clone the repository:

 ```bash
 git clone https://github.com/RehanShaikh007/MERN_RealEstate.git
```

2. Navigate to the project folder:

  ```bash
cd MERN_RealEstate
```

3. Install the dependencies for both the frontend and backend:

```bash
 # Install backend dependencies
cd api
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

# Usage
## Running the Project

To start the development server for both frontend and backend:

1. Start the backend server:
   ```bash
   cd api
   npm start

   ```
2. Start the frontend server:
   ```bash
   cd ../frontend
   npm start
   ```
The project should now be running on:

```bash
- Frontend: http://localhost:5173
- Backend: http://localhost:3000
```
Sample Endpoints:

```bash
- Get all listings: GET /api/listing/get
- Add a listing: POST /api/listing/create
```

# Contributing
Contributions are welcome! If you'd like to contribute, please follow these steps:
- Fork the repository
- Create a new branch: git checkout -b feature/your-feature-name
- Commit your changes: git commit -m 'Add some feature'
- Push to the branch: git push origin feature/your-feature-name
- Submit a pull request

# License
Distributed under the MIT License. See LICENSE for more information.

# Contact
Rehan Shaikh -[Linkedin](https://www.linkedin.com/in/rehan-shaikh-900571276/)


Project Link: https://github.com/RehanShaikh007/MERN_RealEstate
