

create table users(-- For details.....
    user_id UUID PRIMARY KEY NOT NULL,
    username  VARCHAR(255) NOT NULL,
    email VARCHAR(225) UNIQUE NOT NULL, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--    subscription_id  INT
    profile_pic_url VARCHAR(255),
    last_login TIMESTAMP,
    status VARCHAR(50) DEFAULT 'Active',
    last_updated_password TIMESTAMP
);
create table users(
    --for the authentication Service 
    user_id UUID PRIMARY KEY NOT NULL,
    email VARCHAR(255) NOT NULL,
    hashed_password VARCHAR(255) NOT NULL,
);

create table roles(
    role_id INT PRIMARY KEY,
    role VARCHAR(50) NOT NULL
);

create table user_roles(
    user_id UUID,
    role_id INT,
    PRIMARY KEY(user_id, role_id),
    FOREIGN KEY(user_id) REFERENCES users(user_id),
    FOREIGN KEY(role_id) REFERENCES roles(role_id)
);

create table channels();

create table subscriptions(

)

create table videos()

create table comments()

create table genre()

create table 


