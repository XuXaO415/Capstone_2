CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	first_name TEXT NOT NULL,
	last_name TEXT NOT NULL,
	username TEXT NOT NULL,
	password TEXT NOT NULL,
	email VARCHAR(50) NOT NULL,
	phone VARCHAR(15) NOT NULL,
	city TEXT NOT NULL,
	country TEXT NOT NULL,
	zipCode INTEGER,
	latitude DECIMAL,
	longitude DECIMAL,
	image_url TEXT, 
	hobbies TEXT,
	interests TEXT,
	is_admin BOOLEAN NOT NULL DEFAULT FALSE,
	is_guide BOOLEAN NOT NULL DEFAULT FALSE,
	is_tourist BOOLEAN NOT NULL DEFAULT FALSE
);



CREATE TABLE user_interests (
	id SERIAL PRIMARY KEY,
	user_id INTEGER REFERENCES users(id),
	interest TEXT NOT NULL
);


CREATE TABLE user_languages (
	id SERIAL PRIMARY KEY,
	user_id INTEGER REFERENCES users(id),
	language TEXT NOT NULL
);


CREATE TABLE user_locations (
	id SERIAL PRIMARY KEY,
	user_id INTEGER REFERENCES users(id),
	city TEXT NOT NULL,
	country TEXT ,
	zipCode INTEGER
);


CREATE TABLE user_likes (
	id SERIAL PRIMARY KEY,
	user_id INTEGER REFERENCES users(id),
	liked_user_id INTEGER REFERENCES users(id)
);


CREATE TABLE user_dislikes (
	id SERIAL PRIMARY KEY,
	user_id INTEGER REFERENCES users(id),
	disliked_user_id INTEGER REFERENCES users(id)
);


CREATE TABLE user_distance (
	id SERIAL PRIMARY KEY,
	user_id INTEGER REFERENCES users(id),
	distance INTEGER NOT NULL
);


CREATE TABLE user_rating (
	id SERIAL PRIMARY KEY,
	user_id INTEGER REFERENCES users(id),
	rating INTEGER NOT NULL
);


-- CREATE TABLE guide_tourist (
-- 	id SERIAL PRIMARY KEY,
-- 	tourist_id INTEGER REFERENCES users(id),
-- 	guide_id INTEGER REFERENCES users(id),
-- 	tourist_rating INTEGER NOT NULL,
-- 	guide_rating INTEGER NOT NULL
-- );


CREATE TABLE guide_tourist_match (
	id SERIAL PRIMARY KEY,
	tourist_id INTEGER REFERENCES users(id),
	guide_id INTEGER REFERENCES users(id),
	tourist_rating INTEGER NOT NULL,
	guide_rating INTEGER NOT NULL
);
