SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

SET search_path = public, pg_catalog;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp"; -- Ensure uuid-ossp extension is available

CREATE TABLE public.recipes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  category VARCHAR(63) NOT NULL,
  description VARCHAR(255) NOT NULL,
  keywords VARCHAR(255),
  notes VARCHAR(255),
  image VARCHAR(255),
  cook_time smallint,
  prep_time smallint
);

CREATE TABLE public.ingredients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  recipe_id UUID,
  name VARCHAR(255) NOT NULL,
  FOREIGN KEY (recipe_id) REFERENCES recipes(id)
);

CREATE TABLE public.ingredients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  recipe_id UUID,
  index smallint NOT NULL,
  name VARCHAR(255) NOT NULL,
  FOREIGN KEY (recipe_id) REFERENCES recipes(id)
);

-- example values
INSERT INTO public.recipes (id, name, category, description) VALUES
(uuid_generate_v4(), 'The Perfect Burger', 'user1@example.com');