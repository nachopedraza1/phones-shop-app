export const registerQuery = 'INSERT INTO Users (name,email,password) VALUES (?, ?, ?)';

export const searchUserQuery = 'SELECT * FROM Users WHERE email = ?';

export const getProductQuery = `SELECT * FROM Products 
LEFT JOIN Installments ON Products.id = Installments.productId
LEFT JOIN Rating ON Products.id = Rating.productId
WHERE Products.meli_id = ?`;