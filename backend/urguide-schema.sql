
CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	first_name TEXT NOT NULL,
	last_name TEXT NOT NULL,
	username TEXT NOT NULL,
	password TEXT NOT NULL,
	email VARCHAR(50) NOT NULL,
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


CREATE TABLE guide (
	id SERIAL PRIMARY KEY,
	user_id INTEGER REFERENCES users(id),
	is_guide BOOLEAN NOT NULL
);


CREATE TABLE tourist (
	id SERIAL PRIMARY KEY,
	user_id INTEGER REFERENCES users(id),
	is_tourist BOOLEAN NOT NULL
);


CREATE TABLE user_guide (
	id SERIAL PRIMARY KEY,
	user_id INTEGER REFERENCES users(id),
	guide_id INTEGER REFERENCES guide(id)
);

CREATE TABLE user_tourist (
	id SERIAL PRIMARY KEY,
	user_id INTEGER REFERENCES users(id),
	tourist_id INTEGER REFERENCES tourist(id)
);

CREATE TABLE guide_tourist (
	id SERIAL PRIMARY KEY,
	guide_id INTEGER REFERENCES guide(id),
	tourist_id INTEGER REFERENCES tourist(id)
);


CREATE TABLE user_type (
	id SERIAL PRIMARY KEY,
	user_id INTEGER REFERENCES users(id),
	type TEXT NOT NULL
); 

CREATE TABLE guide_type (
	id SERIAL PRIMARY KEY,
	guide_id INTEGER REFERENCES guide(id),
	type TEXT NOT NULL
);

CREATE TABLE tourist_type (
	id SERIAL PRIMARY KEY,
	tourist_id INTEGER REFERENCES tourist(id),
	type TEXT NOT NULL
);

CREATE TABLE user_interests (
	id SERIAL PRIMARY KEY,
	user_id INTEGER REFERENCES users(id),
	interest TEXT NOT NULL
);


CREATE TABLE user_hobbies (
	id SERIAL PRIMARY KEY,
	user_id INTEGER REFERENCES users(id),
	hobby TEXT NOT NULL
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
	country TEXT NOT NULL,
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


CREATE TABLE ratings (
	id SERIAL PRIMARY KEY,
	tourist_id INTEGER REFERENCES users(id),
	guide_id INTEGER REFERENCES users(id),
	rating INTEGER NOT NULL
);


CREATE TABLE guide_ratings (
	id SERIAL PRIMARY KEY,
	tourist_id INTEGER REFERENCES users(id),
	guide_id INTEGER REFERENCES users(id),
	rating INTEGER NOT NULL
);


CREATE TABLE tourist_ratings (
	id SERIAL PRIMARY KEY,
	tourist_id INTEGER REFERENCES users(id),
	guide_id INTEGER REFERENCES users(id),
	rating INTEGER NOT NULL
);


CREATE TABLE reviews (
	id SERIAL PRIMARY KEY,
	user_id INTEGER REFERENCES users(id),
	guide_id INTEGER REFERENCES users(id),
	rating INTEGER NOT NULL
); 




















