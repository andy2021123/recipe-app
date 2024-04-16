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
  name_url VARCHAR(255) NOT NULL,
  category VARCHAR(63) NOT NULL,
  description VARCHAR(255) NOT NULL,
  keywords VARCHAR(255),
  notes VARCHAR(255),
  cook_time smallint,
  prep_time smallint
);

CREATE TABLE public.ingredients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  recipe_id UUID,
  name VARCHAR(255) NOT NULL,
  FOREIGN KEY (recipe_id) REFERENCES recipes(id)
);

CREATE TABLE public.instructions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  recipe_id UUID,
  index smallint NOT NULL,
  name VARCHAR(255) NOT NULL,
  FOREIGN KEY (recipe_id) REFERENCES recipes(id)
);

-- example values
INSERT INTO public.recipes (id, name, name_url, category, description) VALUES
(uuid_generate_v4(), 'The Perfect Burger', 'the-perfect-burger', 'Entree', 'Yummy burger'),
(uuid_generate_v4(), 'The Big Burger', 'the-big-burger', 'Entree', 'burger'),
(uuid_generate_v4(), 'The Worcestershire Burger', 'the-worcestershire-burger', 'Entree', 'Yummy');

INSERT INTO public.recipes