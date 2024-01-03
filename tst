CREATE TABLE Installments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    quantity INT NOT NULL,
    amount FLOAT NOT NULL,
    rate FLOAT NOT NULL,
    productId INT NOT NULL,
    FOREIGN KEY (productId) REFERENCES Products(id)
);

CREATE TABLE Rating (
    id INT AUTO_INCREMENT PRIMARY KEY,
    negative FLOAT NOT NULL,
    neutral FLOAT NOT NULL,
    positive FLOAT NOT NULL,
    productId INT NOT NULL,
    FOREIGN KEY (productId) REFERENCES Products(id)
);