# Node.js Express Server with EJS

A simple Node.js Express server using ES6 modules and EJS templating engine.

## Features

- ✅ ES6 Modules support (`"type": "module"` in package.json)
- ✅ Express.js web framework
- ✅ EJS templating engine
- ✅ Static file serving (CSS, JavaScript, images)
- ✅ JSON API endpoints
- ✅ Error handling and 404 pages
- ✅ Hot reload support with Node.js `--watch` flag
- ✅ Responsive design with modern CSS

## Project Structure

```
node-ejs-client-server/
├── package.json          # Project configuration with ES modules
├── server.js            # Main server file using ES6 imports
├── views/               # EJS templates
│   ├── index.ejs       # Homepage template
│   └── 404.ejs         # 404 error page template
├── public/             # Static files
│   ├── styles.css      # CSS styles
│   └── script.js       # Client-side JavaScript
└── README.md           # This file
```

## Installation

1. Install dependencies:
   ```bash
   npm install
   ```

## Running the Server

### Development (with hot reload)

```bash
npm run dev
```

### Production

```bash
npm start
```

The server will start on `http://localhost:3000`

## Available Routes

- `GET /` - Homepage with feature overview
- `GET /api/status` - JSON API endpoint returning server status
- `404` - Custom 404 page for unmatched routes

## API Endpoints

### GET /api/status

Returns server status information in JSON format:

```json
{
  "status": "success",
  "message": "Server is running!",
  "timestamp": "2025-08-13T10:30:00.000Z"
}
```

## ES6 Modules Features Used

- `import`/`export` statements instead of `require()`/`module.exports`
- `import.meta.url` for getting current module URL
- `fileURLToPath()` to convert file URL to path
- Modern async/await syntax

## Technologies Used

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **EJS** - Embedded JavaScript templating
- **ES6 Modules** - Modern JavaScript module system

## Development Notes

- The `"type": "module"` in package.json enables ES6 modules
- `__dirname` equivalent is created using `fileURLToPath(import.meta.url)`
- Hot reload is achieved using Node.js built-in `--watch` flag
- Static files are served from the `public/` directory
- EJS templates are in the `views/` directory

## Customization

- Modify `views/*.ejs` files to change the HTML structure
- Edit `public/styles.css` for styling changes
- Update `public/script.js` for client-side functionality
- Add new routes in `server.js`
