
CREATE TABLE users (
	id serial PRIMARY KEY,
	first_name VARCHAR(50),
	last_name VARCHAR(50),
	username VARCHAR(50),
	password VARCHAR(50),
	email TEXT NOT NULL,
	phone VARCHAR(50),
	city VARCHAR(50),
	county VARCHAR(50),
	zipCode VARCHAR(50),
	latitude VARCHAR(50),
	longitude VARCHAR(50),
	image_url TEXT, 
	hobbies TEXT,
	interests TEXT
);



CREATE TABLE user_type (
	id serial PRIMARY KEY,
	user_id INTEGER REFERENCES users(id),
	user_type VARCHAR(50)
);


CREATE TABLE guides (
	id serial PRIMARY KEY,
	user_id INTEGER REFERENCES users(id),
	guide_type VARCHAR(50)
);


CREATE TABLE tourists (
	id serial PRIMARY KEY,
	user_id INTEGER REFERENCES users(id),
	tourist_type VARCHAR(50)
);


CREATE TABLE likes (
	id serial PRIMARY KEY,
	user_id INTEGER REFERENCES users(id),
	guide_id INTEGER REFERENCES guides(id)
);


CREATE TABLE dislikes (
	id serial PRIMARY KEY,
	user_id INTEGER REFERENCES users(id),
	guide_id INTEGER REFERENCES guides(id)
);


CREATE TABLE likes_tourists (
	id serial PRIMARY KEY,
	user_id INTEGER REFERENCES users(id),
	tourist_id INTEGER REFERENCES tourists(id)
);


CREATE TABLE dislikes_tourists (
	id serial PRIMARY KEY,
	user_id INTEGER REFERENCES users(id),
	tourist_id INTEGER REFERENCES tourists(id)
);


CREATE TABLE guide_tourist_match (
	id serial PRIMARY KEY,
	guide_id INTEGER REFERENCES guides(id),
	tourist_id INTEGER REFERENCES tourists(id)
);









