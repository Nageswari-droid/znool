# 📚 Znool - Library Management System

Znool is a full-stack library management system that allows users to add, update, and delete books. This application was built using **React** for the frontend and **Node.js** for the backend.

## 🚀 Getting Started

### 🔄 Clone the Repository

```bash
git clone git@github.com:Nageswari-droid/znool.git
cd znool
```

### 🖥️ Frontend Setup

```bash
cd UI
npm install
npm run dev
```

### 🛠️ Backend Setup

```bash
cd Server
npm install
npm start
```

## 🗃️ Backend API

The server uses a JSON file as an in-memory database. It is located at:

```
server/src/books/data/books.json
```

Each book has the following required fields:

- `title` (string)
- `author` (string)
- `year` (string)
- `genre` (string)
- `description` (optional string)

### 📌 API Endpoints

- **GET /books** - List all books  
- **POST /books** - Add a new book  
  Example body:
  ```json
  {
    "title": "Book Name",
    "author": "Author Name",
    "year": "2024",
    "genre": "Science Fiction",
    "description": "Optional description"
  }
  ```
  Response:
  ```json
  {
    "id": "1",
    "title": "...",
    ...
  }
  ```

- **PUT /books/:id** - Update a book  
  Example body:
  ```json
  {
    "title": "Book Name",
    "author": "Author Name",
    "year": "2024",
    "genre": "Science Fiction",
    "description": "Optional description"
  }
  ```
  Response:
  ```json
  { "data": "Book updated!" }
  ```

- **DELETE /books/:id** - Delete a book  
  Response:
  ```json
  { "data": "Book deleted!" }
  ```

### ✅ Backend Tests

Test files are located inside:

```
server/src/tests/
```


## 💻 Frontend Application

The React application contains 5 major sections:

1. **Landing Page**  
   Entry point to the application with a CTA interface.

2. **Display All Books** (`/get-all-books`)  
   - Search box to search books by title  
   - Sort and group radio buttons (by title, author, or genre)  
   - Book cards showing all book details with edit and delete actions  
   - Delete confirmation modal on delete

3. **Add New Book** (`/add-new-book`)  
   - Form to add a new book with validations  
   - Submit and Cancel buttons

4. **Edit Book** (`/edit-book/:id`)  
   - Pre-filled form to update book details  
   - Submit and Cancel buttons

5. **Error Page** (`/error/:code`)  
   - Displayed when the server returns errors like 400, 404, 500, or other response codes

### ✅ Frontend Tests

Unit tests are colocated inside component folders using React Testing Library and Jest.


<div align="center">
<p align="center">
<video width="400" alt="login" src="https://github.com/user-attachments/assets/c296b780-e321-4e21-834c-3f917ac5b1fa" style="text-align:center;" />
</p>
</div>





