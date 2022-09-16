// new user registers and is added to the database
CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	first_name TEXT NOT NULL,
	last_name TEXT NOT NULL,
	username TEXT NOT NULL,
	password TEXT NOT NULL,
	email TEXT NOT NULL,
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

// coverts user to guide 
CREATE TABLE guide (
	id SERIAL PRIMARY KEY,
	user_id INTEGER REFERENCES users(id),
	is_guide BOOLEAN NOT NULL
);

// coverts user to tourist
CREATE TABLE tourist (
	id SERIAL PRIMARY KEY,
	user_id INTEGER REFERENCES users(id),
	is_tourist BOOLEAN NOT NULL
);

//  table that stores user guide 
CREATE TABLE user_guide (
	id SERIAL PRIMARY KEY,
	user_id INTEGER REFERENCES users(id),
	guide_id INTEGER REFERENCES guide(id)
);

// table that stores user tourist
CREATE TABLE user_tourist (
	id SERIAL PRIMARY KEY,
	user_id INTEGER REFERENCES users(id),
	tourist_id INTEGER REFERENCES tourist(id)
);



// user chooses to be a guide or tourist
CREATE TABLE user_type (
	id SERIAL PRIMARY KEY,
	user_id INTEGER REFERENCES users(id),
	type TEXT NOT NULL
); 

//table that matches users with their interests
CREATE TABLE user_interests (
	id SERIAL PRIMARY KEY,
	user_id INTEGER REFERENCES users(id),
	interest TEXT NOT NULL
);

//table that matches users with their hobbies
CREATE TABLE user_hobbies (
	id SERIAL PRIMARY KEY,
	user_id INTEGER REFERENCES users(id),
	hobby TEXT NOT NULL
);


// table that matches users with their languages
CREATE TABLE user_languages (
	id SERIAL PRIMARY KEY,
	user_id INTEGER REFERENCES users(id),
	language TEXT NOT NULL
);

//table that matches users based on their locations 
CREATE TABLE user_locations (
	id SERIAL PRIMARY KEY,
	user_id INTEGER REFERENCES users(id),
	city TEXT NOT NULL,
	country TEXT NOT NULL,
	zipCode INTEGER
);

// user like table
CREATE TABLE user_likes (
	id SERIAL PRIMARY KEY,
	user_id INTEGER REFERENCES users(id),
	liked_user_id INTEGER REFERENCES users(id)
);

// user dislike table
CREATE TABLE user_dislikes (
	id SERIAL PRIMARY KEY,
	user_id INTEGER REFERENCES users(id),
	disliked_user_id INTEGER REFERENCES users(id)
);



// distance between two users is calculated
CREATE TABLE user_distance (
	id SERIAL PRIMARY KEY,
	user_id INTEGER REFERENCES users(id),
	distance INTEGER NOT NULL
);

// create a table where user tourist can rate a guide
CREATE TABLE user_rating (
	id SERIAL PRIMARY KEY,
	user_id INTEGER REFERENCES users(id),
	rating INTEGER NOT NULL
);

// tourist rate a guide
CREATE TABLE ratings (
	id SERIAL PRIMARY KEY,
	tourist_id INTEGER REFERENCES users(id),
	guide_id INTEGER REFERENCES users(id),
	rating INTEGER NOT NULL
);

// guide can rate a tourist
CREATE TABLE guide_ratings (
	id SERIAL PRIMARY KEY,
	tourist_id INTEGER REFERENCES users(id),
	guide_id INTEGER REFERENCES users(id),
	rating INTEGER NOT NULL
);


// user can leave a review for a guide
CREATE TABLE reviews (
	id SERIAL PRIMARY KEY,
	user_id INTEGER REFERENCES users(id),
	guide_id INTEGER REFERENCES users(id),
	rating INTEGER NOT NULL,
); 




















