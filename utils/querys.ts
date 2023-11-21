export const registerQuery = 'INSERT INTO Users (name,email,password) VALUES (?, ?, ?)';

export const searchUserQuery = 'SELECT * FROM Users WHERE email = ?';