\echo 'Do you want to delete and recreate the database?'
\prompt 'Press return for y or control-c to cancel > ' foo 

DROP DATABASE urguide;
\echo "Dropping database..."
\echo "Successfully dropped db"


CREATE DATABASE urguide;
\echo "Creating database..."
\connect urguide

\echo "Almost done..."

\i urguide-schema.sql
\i urguide-seed.sql

\echo "Done."

\echo 'Delete & recreate urguide_test db?'
\prompt 'Press return for y or control-c to cancel > ' foo

DROP DATABASE urguide_test;
\echo "Dropping database..."
\echo "Successfully dropped db"

CREATE DATABASE urguide_test;
\echo "Creating database..."
\connect urguide_test

\i urguide-schema.sql










