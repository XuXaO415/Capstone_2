
CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	first_name TEXT NOT NULL,
	last_name TEXT NOT NULL,
	username TEXT NOT NULL,
	password TEXT NOT NULL,
	email TEXT NOT NULL
	  CHECK (position('@' IN email) > 1),
	phone INTEGER NOT NULL,
	city TEXT NOT NULL,
	country TEXT NOT NULL,
	zipCode INTEGER,
	latitude INTEGER,
	longitude INTEGER,
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









