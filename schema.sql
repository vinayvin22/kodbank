CREATE TABLE KodUser (
    uuid VARCHAR(36) PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    balance DECIMAL(15, 2) DEFAULT 100000.00,
    phone VARCHAR(20),
    role ENUM('customer', 'manager', 'admin') DEFAULT 'customer'
);

CREATE TABLE UserToken (
    tid INT AUTO_INCREMENT PRIMARY KEY,
    token TEXT NOT NULL,
    uid VARCHAR(36),
    expiry DATETIME,
    FOREIGN KEY (uid) REFERENCES KodUser(uuid) ON DELETE CASCADE
);
