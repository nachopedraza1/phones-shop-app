export const registerQuery = 'INSERT INTO Users (name,email,password) VALUES (?, ?, ?)';

export const searchUserQuery = 'SELECT * FROM Users WHERE email = ?';

export const getProductQuery = `SELECT * FROM Products 
                                LEFT JOIN Installments ON Products.id = Installments.productId
                                LEFT JOIN Rating ON Products.id = Rating.productId
                                WHERE Products.meli_id = ?`;

export const newOrder = `INSERT INTO Orders(userId,total,city,country,zip,isPaid) VALUES(?, ?, ?, ?, ?, ?)`;

export const newOrderProduct = `INSERT INTO OrderProducts(quantity, orderId, productId) VALUES(?, ?, ?)`;

export const newProduct = ` INSERT INTO Products(meli_id, name, price, prod_condition, thumbnail, thumbnail_id, totalSold, brand, category)
                            VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)`;

export const newInstallment = ` INSERT INTO Installments(quantity, amount, rate, productId)
                                VALUES(?, ?, ?, ?)`;

export const newRating = `INSERT INTO Rating(negative, neutral, positive, productId)
                            VALUES(?, ?, ?, ?)`;

export const getOrders = `SELECT Orders.*,
                            JSON_ARRAYAGG(
	                            JSON_OBJECT(
		                            'productId', Products.id,
                                    'meli_id',Products.meli_id,
                                    'name', Products.name,
                                    'price',Products.price,
		                            'quantity',OrderProducts.quantity, 
                                    'image',Products.thumbnail
	                            )
                            ) AS products
                        FROM Users
                        JOIN Orders ON Orders.userId = Users.id
                        JOIN OrderProducts ON Orders.id = OrderProducts.orderId
                        JOIN Products ON Products.id = OrderProducts.ProductId
                        WHERE Users.id = ?
                        GROUP BY Orders.id`;

export const getOrderDetail = `SELECT Orders.*,
                                    JSON_ARRAYAGG(
	                                    JSON_OBJECT(
		                                    'productId', Products.id,
                                            'meli_id',Products.meli_id,
                                            'name', Products.name,
                                            'price',Products.price,
		                                    'quantity',OrderProducts.quantity, 
                                            'image',Products.thumbnail
	                                    )
                                    ) AS products
                                FROM Users
                                JOIN Orders ON Orders.userId = Users.id
                                JOIN OrderProducts ON Orders.id = OrderProducts.orderId
                                JOIN Products ON Products.id = OrderProducts.ProductId
                                WHERE Users.id = ? AND Orders.id = ? AND Users.id = Orders.userId
                                GROUP BY Orders.id`;