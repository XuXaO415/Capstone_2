//backup db 
//pg_dump -C -c -O urguide > backup.sql
//pg_dump -t users urguide > users.sql 
//createdb urguide_test 
//psql urguide_test < users.sql
//psql urguide_test < backup.sql
//psql urguide_test
-- CREATE TABLE users (
--   id SERIAL PRIMARY KEY,
--   first_name TEXT NOT NULL,
--   last_name TEXT NOT NULL,
--   username TEXT NOT NULL UNIQUE,
--   password TEXT NOT NULL,
--   email TEXT NOT NULL UNIQUE,
--   city TEXT NOT NULL,
--   state TEXT NOT NULL,
--   country TEXT NOT NULL,
--   zip_code TEXT NOT NULL,
--   latitude FLOAT NOT NULL,
--   longitude FLOAT NOT NULL,
--   image_url TEXT,
--   hobbies TEXT[],
--   interests TEXT[],
--   is_admin BOOLEAN NOT NULL DEFAULT FALSE
-- );
//psql urguide_test < urguide.sql
//that doesn't work then, do this command
//ALTER TABLE users ALTER COLUMN zip_code DROP NOT NULL;
//then run the command again 
//psql urguide_test < urguide.sql
//or you can do this
//ALTER TABLE users ALTER COLUMN zip_code TYPE TEXT;
//then manually insert a couple of test users
-- INSERT INTO users (first_name, last_name, username, password, email, city, state, country, zip_code, latitude, longitude, image_url, hobbies, interests, is_admin)
-- VALUES ('test', 'user', 'testuser', '123123123', 'testuser@email.com', 'testcity', 'teststate', 'testcountry', 12345, 12345, 12345, 'https://randomuser.me/api/portraits/men/63.jpg',  ARRAY['traveling', 'shopping'],  ARRAY['art', 'sightseeing'], FALSE),
-- ('Izm', 'Mad', 'Channel2live', 'testPassword', 'bombBeatz@gmail.com', 'testcity', 'test', 'testcountry', 12345, 12345, 12345, 'https://randomuser.me/api/portraits/women/44.jpg', ARRAY['testhobbies', 'rock climbing'], ARRAY['pleasssse work'], TRUE),
-- ('Lorenza', 'Barnardo', 'lbarnardo2', 'OzM28cthZbM', 'lbarnardo2@ebay.com', 'Luzon', 'Tagbina', 'Philippines', '8308', 8.417766, 126.207415, 'https://randomuser.me/api/portraits/men/4.jpg', ARRAY['facilitate wireless infrastructures'], ARRAY['Function-based client-server internet solution'], FALSE),
-- ('Carolin', 'Brodeur', 'cbrodeur3', 'vlMpXR', 'cbrodeur3@diigo.com', 'Seoul', 'Namyang-dong', 'South Korea', NULL, 41.45785, 128.833333, 'https://randomuser.me/api/portraits/women/27.jpg', ARRAY['transform magnetic content'], ARRAY['Distributed solution-oriented neural-net'], FALSE);