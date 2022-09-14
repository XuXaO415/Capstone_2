//create a table for the new user

CREATE TABLE users (
	id serial PRIMARY KEY,
	username VARCHAR(50),
	password VARCHAR(50),
	first_name VARCHAR(50),
	last_name VARCHAR(50),
  	email TEXT NOT NULL
    CHECK (position('@' IN email) > 1),
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


//user can chose to be a guide or a tourist
CREATE TABLE user_type (
	id serial PRIMARY KEY,
	user_id INTEGER REFERENCES users(id),
	user_type VARCHAR(50)
);

//create a table for the guide
CREATE TABLE guides (
	id serial PRIMARY KEY,
	user_id INTEGER REFERENCES users(id),
	guide_type VARCHAR(50)
);
//create a table for the tourist
CREATE TABLE tourists (
	id serial PRIMARY KEY,
	user_id INTEGER REFERENCES users(id),
	tourist_type VARCHAR(50)
);

//table for liking a guide
CREATE TABLE likes (
	id serial PRIMARY KEY,
	user_id INTEGER REFERENCES users(id),
	guide_id INTEGER REFERENCES guides(id)
);
// table for disliking a guide
CREATE TABLE dislikes (
	id serial PRIMARY KEY,
	user_id INTEGER REFERENCES users(id),
	guide_id INTEGER REFERENCES guides(id)
);

//table for liking a tourist
CREATE TABLE likes_tourists (
	id serial PRIMARY KEY,
	user_id INTEGER REFERENCES users(id),
	tourist_id INTEGER REFERENCES tourists(id)
);

//table for disliking a tourist
CREATE TABLE dislikes_tourists (
	id serial PRIMARY KEY,
	user_id INTEGER REFERENCES users(id),
	tourist_id INTEGER REFERENCES tourists(id)
);

//matching table for guide and tourist based on likes 
CREATE TABLE guide_tourist_match (
	id serial PRIMARY KEY,
	guide_id INTEGER REFERENCES guides(id),
	tourist_id INTEGER REFERENCES tourists(id)
);









