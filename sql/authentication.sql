
create table users(

    user_id VARCHAR(36) PRIMARY KEY NOT NULL,
    user_name VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) NOT NULL,
    hashed_password VARCHAR(255) NOT NULL
);

create table authority(
    authority_id INT PRIMARY KEY NOT NULL,
    authority_name VARCHAR(50) NOT NULL
);

create table user_authority(
    user_id VARCHAR(36) NOT NULL,
    authority_id INT NOT NULL,
    PRIMARY KEY(user_id, authority_id),
    FOREIGN KEY(user_id) REFERENCES users(user_id),
    FOREIGN KEY(authority_id) REFERENCES authority(authority_id)
);
