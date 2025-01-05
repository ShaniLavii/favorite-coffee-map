# Coffee Shops Map

This is an open-source React application that displays coffee shop locations on an interactive map. The app uses **Leaflet** for map rendering and dynamic functionality, such as toggling between light and dark modes, displaying markers, and zooming into specific locations. The frontend is hosted on **Vercel**, while the backend (not part of this repository) is built using **Flask** and also hosted on Vercel.

---

## Features

- Interactive map with customizable tile layers (light/dark mode).
- Dynamic markers for coffee shops, complete with hover tooltips and popups.
- Smooth zooming to markers on click.
- Mobile-friendly and responsive design.

---

## Technologies Used

### Frontend

- **React** (with hooks)
- **React-Leaflet** for map rendering
- **Leaflet** for map interaction
- **Axios** for API communication
- **Vercel** for deployment

### Backend (not included in this repository)

- **Flask** (API for fetching coffee shop data and submitting requests)

---

## Installation and Setup

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Clone the Repository

```bash
git clone https://github.com/ShaniLavii/favorite-coffee-map.git
cd favorite-coffee-map
```

### Install Dependencies

Using npm:

```bash
npm install
```

Or using yarn:

```bash
yarn install
```

### Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
SKIP_PREFLIGHT_CHECK=true
REACT_APP_BE_HOST=https://your-coffee-map-backend.vercel.app
```

### Start the Development Server

Run the following command to start the local development server:

```bash
npm start
```

Or:

```bash
yarn start
```

The app will be available at `http://localhost:3000`.

---

## Deployment

### Vercel

1. Create a Vercel account if you don't already have one.
2. Connect the repository to your Vercel project.
3. Add the environment variables from your `.env` file to the Vercel dashboard.
4. Deploy the app with a single click.

---

## Folder Structure

```
.
├── public
│   ├── static
│   │   |── images
│   │   |   ├── apple
│   │   |   ├── coffeeshops
│   │   |   └── icons
│   │   └── styles
│   ├── index.html
├── src
│   ├── components
│   ├── api.js
│   ├── App.js
│   ├── index.js
│   └── styles
│       |── styles.css
│       └── sidebar.css
├── .env
├── package.json
└── README.md
```

---

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

---

## Issues and Feedback

If you encounter any issues or have suggestions, please feel free to open an [issue](https://github.com/ShaniLavii/coffee-shops-map/issues) in the repository.
