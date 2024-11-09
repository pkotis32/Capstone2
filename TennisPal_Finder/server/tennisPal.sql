\echo 'Delete and recreate jobly db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE tennis_pal;
CREATE DATABASE tennis_pal;
\connect tennis_pal

\i tennisPal-schema.sql
\i tennisPal-seed.sql

\echo 'Delete and recreate jobly_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE tennis_pal_test;
CREATE DATABASE tennis_pal_test;
\connect tennis_pal_test

\i tennisPal-schema.sql