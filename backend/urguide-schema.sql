CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	first_name TEXT NOT NULL,
	last_name TEXT NOT NULL,
	username TEXT NOT NULL,
	password TEXT NOT NULL,
	email VARCHAR(50) NOT NULL,
	city TEXT NOT NULL,
	state TEXT NOT NULL,
	country TEXT NOT NULL,
	zip_code INTEGER,
	latitude DECIMAL,
	longitude DECIMAL,
	image_url TEXT, 
	hobbies TEXT,
	interests TEXT,
	is_admin BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE UNIQUE INDEX users_id_idx ON users (id);

ALTER TABLE likes ADD CONSTRAINT fk_likes_user_id FOREIGN KEY (user_id) REFERENCES users(id);
ALTER TABLE likes ADD CONSTRAINT fk_likes_liked_user FOREIGN KEY (liked_user) REFERENCES users(id);

ALTER TABLE users ADD CONSTRAINT unique_username UNIQUE (username);


CREATE TABLE likes (
	id SERIAL PRIMARY KEY,
	user_id INTEGER REFERENCES users(id),
	liked_user INTEGER  NOT NULL REFERENCES users(id),
	liked_username TEXT REFERENCES users(username), 
	UNIQUE (user_id, liked_user)
);


ALTER TABLE likes ADD COLUMN liked_city TEXT REFERENCES users(city);
ALTER TABLE likes ADD COLUMN liked_state TEXT REFERENCES users(state);
ALTER TABLE likes ADD COLUMN liked_country TEXT REFERENCES users(country);
ALTER TABLE likes ADD COLUMN liked_zip_code INTEGER REFERENCES users(zip_code);
ALTER TABLE likes ADD COLUMN liked_hobbies TEXT REFERENCES users(hobbies);
ALTER TABLE likes ADD COLUMN liked_interests TEXT REFERENCES users(interests);
ALTER TABLE likes ADD COLUMN liked_image_url TEXT REFERENCES users(image_url);




-- CREATE TABLE dislikes (
-- 	id SERIAL PRIMARY KEY,
-- 	user_id INTEGER REFERENCES users(id),
-- 	disliked_user INTEGER NOT NULL REFERENCES users(id),
-- 	disliked_username TEXT REFERENCES users(username), 
-- 	UNIQUE (user_id, disliked_user)
-- );


CREATE TABLE dislikes (
	id SERIAL PRIMARY KEY,
	user_id INTEGER REFERENCES users(id),
	disliked_user INTEGER REFERENCES users(id)
);

CREATE TABLE matches (
	id SERIAL PRIMARY KEY,
	user_id INTEGER REFERENCES users(id),
	matched_user INTEGER REFERENCES users(id)
);




-- CREATE TABLE users (
-- 	id SERIAL PRIMARY KEY,
-- 	first_name TEXT NOT NULL,
-- 	last_name TEXT NOT NULL,
-- 	username TEXT NOT NULL,
-- 	password TEXT NOT NULL,
-- 	email VARCHAR(50) NOT NULL,
-- 	city TEXT NOT NULL,
-- 	state TEXT NOT NULL,
-- 	country TEXT NOT NULL,
-- 	zip_code INTEGER,
-- 	latitude DECIMAL,
-- 	longitude DECIMAL,
-- 	image_url TEXT, 
-- 	hobbies TEXT,
-- 	interests TEXT,
-- 	is_admin BOOLEAN NOT NULL DEFAULT FALSE
-- );


-- CREATE TABLE user_likes (
-- 	id SERIAL PRIMARY KEY,
-- 	user_id INTEGER REFERENCES users(id),
-- 	liked_user_id INTEGER REFERENCES users(id)
-- );


-- CREATE TABLE user_dislikes (
-- 	id SERIAL PRIMARY KEY,
-- 	user_id INTEGER REFERENCES users(id),
-- 	disliked_user_id INTEGER REFERENCES users(id)
-- );


-- CREATE TABLE user_matches (
-- 	id SERIAL PRIMARY KEY,
-- 	user_id INTEGER REFERENCES users(id),
-- 	matched_user_id INTEGER REFERENCES users(id)
-- );






-- CREATE TABLE user_interests (
-- 	id SERIAL PRIMARY KEY,
-- 	user_id INTEGER REFERENCES users(id),
-- 	interest TEXT NOT NULL
-- );


-- CREATE TABLE user_languages (
-- 	id SERIAL PRIMARY KEY,
-- 	user_id INTEGER REFERENCES users(id),
-- 	language TEXT NOT NULL
-- );


-- CREATE TABLE user_locations (
-- 	id SERIAL PRIMARY KEY,
-- 	user_id INTEGER REFERENCES users(id),
-- 	city TEXT NOT NULL,
-- 	country TEXT ,
-- 	zip_code INTEGER
-- );


-- CREATE TABLE user_likes (
-- 	id SERIAL PRIMARY KEY,
-- 	user_id INTEGER REFERENCES users(id),
-- 	liked_user_id INTEGER REFERENCES users(id)
-- );


-- CREATE TABLE user_dislikes (
-- 	id SERIAL PRIMARY KEY,
-- 	user_id INTEGER REFERENCES users(id),
-- 	disliked_user_id INTEGER REFERENCES users(id)
-- );


-- CREATE TABLE user_distance (
-- 	id SERIAL PRIMARY KEY,
-- 	user_id INTEGER REFERENCES users(id),
-- 	distance INTEGER NOT NULL
-- );


-- CREATE TABLE user_rating (
-- 	id SERIAL PRIMARY KEY,
-- 	user_id INTEGER REFERENCES users(id),
-- 	rating INTEGER NOT NULL
-- );


-- CREATE TABLE guide_tourist (
-- 	id SERIAL PRIMARY KEY,
-- 	tourist_id INTEGER REFERENCES users(id),
-- 	guide_id INTEGER REFERENCES users(id),
-- 	tourist_rating INTEGER NOT NULL,
-- 	guide_rating INTEGER NOT NULL
-- );


-- CREATE TABLE guide_tourist_match (
-- 	id SERIAL PRIMARY KEY,
-- 	tourist_id INTEGER REFERENCES users(id),
-- 	guide_id INTEGER REFERENCES users(id),
-- 	tourist_rating INTEGER NOT NULL,
-- 	guide_rating INTEGER NOT NULL
-- );
