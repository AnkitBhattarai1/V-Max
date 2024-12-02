create table users(
    user_id VARCHAR(36) NOT NULL UNIQUE,
    user_name VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    profile_pic_url VARCHAR(255), 
    last_login TIMESTAMP,
    status VARCHAR(50) DEFAULT 'ACTIVE',
    last_updated_password TIMESTAMP
);

 create table registration_user(
    id VARCHAR(36) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    is_verified TINYINT(1) NOT NULL,
    verification_code VARCHAR(255) NOT NULL,
    verification_code_expiry TIMESTAMP NOT NULL
);



