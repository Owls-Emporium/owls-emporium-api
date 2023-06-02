DROP TABLE IF EXISTS roles CASCADE;
CREATE TABLE roles(
id BIGSERIAL PRIMARY KEY,
name VARCHAR(180) NOT NULL UNIQUE,
image VARCHAR(255) NULL,
created_at TIMESTAMP(0) NOT NULL,
update_at TIMESTAMP(0) NOT NULL 
);

DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users(
id BIGSERIAL PRIMARY KEY,
email VARCHAR(255) NOT NULL UNIQUE,
name VARCHAR(120) NOT NULL,
lastname VARCHAR(120) NOT NULL,
phone VARCHAR(80) NOT NULL,
image VARCHAR(255) NULL,
password VARCHAR(255) NOT NULL,
session_token VARCHAR(255) NULL,
created_at TIMESTAMP(0) NOT NULL,
update_at TIMESTAMP(0) NOT NULL 
);

DROP TABLE IF EXISTS user_has_roles CASCADE;
CREATE TABLE user_has_roles(
id_user BIGSERIAL NOT NULL,
id_rol BIGSERIAL NOT NULL,
created_at TIMESTAMP(0) NOT NULL,
update_at TIMESTAMP(0) NOT NULL ,
FOREIGN KEY (id_user) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
FOREIGN KEY (id_rol) REFERENCES roles(id) ON UPDATE CASCADE ON DELETE CASCADE,
PRIMARY KEY(id_user,id_rol)
)

INSERT INTO roles(
name,
image,
created_at,
update_at
)
VALUES(
'CLIENTE',
'https://pluspng.com/img-png/png-user-icon-person-icon-png-people-person-user-icon-2240.png',
'2023-05-10',
'2023-05-10'
);

INSERT INTO roles(
name,
image,
created_at,
update_at
)
VALUES(
'ADMINISTRADOR',
'https://vectorified.com/images/admin-logo-icon-35.png',
'2023-05-10',
'2023-05-10'
);