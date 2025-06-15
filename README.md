# Simple File Management Tool

A basic file management tool built with Node.js core modules that allows you to create, read, and delete files through a web interface.

## Features

- Create new files with custom content
- Read file contents
- Delete files
- List all files in the directory
- Simple and intuitive web interface

## Prerequisites

- Node.js installed on your system

## Installation

1. Clone or download this repository
2. Navigate to the project directory
3. No additional dependencies required as it uses Node.js core modules

## Usage

1. Start the server:
   ```bash
   node server.js
   ```

2. Open `index.html` in your web browser

3. Use the web interface to:
   - Create new files by entering a filename and content
   - View the list of files
   - Click on a file name to read its contents
   - Delete files using the delete button

## API Endpoints

The server provides the following REST API endpoints:

- `GET /` - List all files
- `GET /:filename` - Read a specific file
- `POST /:filename` - Create a new file
- `DELETE /:filename` - Delete a file

## Security Notes

- The server includes basic path traversal protection
- Files are stored in a dedicated `files` directory
- CORS is enabled for local development

## License

MIT 