--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2
-- Dumped by pg_dump version 16.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: ingredients; Type: TABLE; Schema: public; Owner: andre
--

CREATE TABLE public.ingredients (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    recipe_id uuid,
    name character varying(255) NOT NULL
);


ALTER TABLE public.ingredients OWNER TO andre;

--
-- Name: instructions; Type: TABLE; Schema: public; Owner: andre
--

CREATE TABLE public.instructions (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    recipe_id uuid,
    index smallint NOT NULL,
    name character varying(1000) NOT NULL
);


ALTER TABLE public.instructions OWNER TO andre;

--
-- Name: recipes; Type: TABLE; Schema: public; Owner: andre
--

CREATE TABLE public.recipes (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying(255) NOT NULL,
    name_url character varying(255) NOT NULL,
    category character varying(63) NOT NULL,
    description character varying(255) NOT NULL,
    keywords character varying(255),
    notes character varying(255),
    cook_time smallint,
    prep_time smallint
);


ALTER TABLE public.recipes OWNER TO andre;

--
-- Name: selectors; Type: TABLE; Schema: public; Owner: andre
--

CREATE TABLE public.selectors (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    domain character varying(63) NOT NULL,
    name character varying(255) NOT NULL,
    description character varying(255),
    ingredients character varying(255) NOT NULL,
    instructions character varying(255) NOT NULL,
    notes character varying(255),
    image character varying(255)
);


ALTER TABLE public.selectors OWNER TO andre;

--
-- Data for Name: ingredients; Type: TABLE DATA; Schema: public; Owner: andre
--

COPY public.ingredients (id, recipe_id, name) FROM stdin;
479c91b6-3c71-4b76-8d3a-9d746ece0935	5a6267de-de4a-4121-a422-d16b69164b4c	1 1/2 pounds 80% lean 20% fat ground beef or ground chuck
98dd2f9e-5e70-4d7e-bfe7-8a0fc290011c	5a6267de-de4a-4121-a422-d16b69164b4c	1 tablespoon Worcestershire sauce
63ac0ebc-f4a9-4f11-956e-ae55ab39f3b5	5a6267de-de4a-4121-a422-d16b69164b4c	1 1/2 teaspoons seasoning salt
a19e9b72-53fc-4abc-bd99-4d56d94b7419	5a6267de-de4a-4121-a422-d16b69164b4c	1 teaspoon garlic powder
d20b9ee5-fbd3-499b-82ec-e71e13caff8a	5a6267de-de4a-4121-a422-d16b69164b4c	1/2 teaspoon ground black pepper
3cd90492-e91d-4c7e-89f6-5f62e187b5da	5a6267de-de4a-4121-a422-d16b69164b4c	Optional: 4 slices of cheese
5b8d26bd-11b6-441d-8fb7-e4114ea7c3be	5a6267de-de4a-4121-a422-d16b69164b4c	4 hamburger buns
70188d10-d1b9-4b2f-93d8-651b776743d7	5a6267de-de4a-4121-a422-d16b69164b4c	Optional: hamburger toppings - lettuce tomato, onion, pickles, ketchup, mustard, mayo, etc.
6f7c50d8-8d9d-440c-93b8-4901865ff005	1d7ad142-993a-4c4b-aece-32bbd6e63f6a	1 1/2 cups salted butter, softened
e7f4c8e2-c422-4f30-a938-bcfca80cdde5	1d7ad142-993a-4c4b-aece-32bbd6e63f6a	3/4 cup granulated sugar
3e492ef4-6476-46fc-8c2e-0914bdc6d9f2	1d7ad142-993a-4c4b-aece-32bbd6e63f6a	1 1/2 cups packed brown sugar
fe73b5cc-8ec4-4b8b-b94f-d64768af63bb	1d7ad142-993a-4c4b-aece-32bbd6e63f6a	2 eggs
db314026-7590-44dd-82e2-29058ff64af0	1d7ad142-993a-4c4b-aece-32bbd6e63f6a	1 tbsp vanilla
6e53b8f9-de1d-4f2a-be80-736dafe90fae	1d7ad142-993a-4c4b-aece-32bbd6e63f6a	3 3/4 cups all purpose flour
5f5f7a71-237e-44d8-8b4b-2128b1eeb0ca	1d7ad142-993a-4c4b-aece-32bbd6e63f6a	2 pkg graham crackers, crushed, appprox 2 1/2 cups of crumbs
cc16d06d-c580-4ff7-bde6-13cd3081a351	1d7ad142-993a-4c4b-aece-32bbd6e63f6a	2 tsp baking soda
2da4f758-337c-409a-acda-1d9ed873ecf8	1d7ad142-993a-4c4b-aece-32bbd6e63f6a	1 tsp baking powder
9fb22c4f-5aa3-4e14-b04a-cff2426811e3	1d7ad142-993a-4c4b-aece-32bbd6e63f6a	1 tsp salt
111df58b-7b11-4ea7-a40f-23d209a7ad7d	1d7ad142-993a-4c4b-aece-32bbd6e63f6a	16 oz cream cheese, room temperature
0fa44155-9928-44ad-8f2c-24648909a78f	1d7ad142-993a-4c4b-aece-32bbd6e63f6a	7 oz marshmallow creme
fbfec186-929d-4bdf-b69d-7fc722164fa7	1d7ad142-993a-4c4b-aece-32bbd6e63f6a	2 cups powdered sugar
d526fd24-056c-44ae-8695-f8ed8cb36004	1d7ad142-993a-4c4b-aece-32bbd6e63f6a	1/3 cup raspberry preserves
f5849b86-afc2-4074-8f70-06925bba0a56	cad499e7-4139-493d-831c-49e49cd489b4	1 lb. 80% lean ground beef
ea34dad4-d4d3-425d-bdbe-44318279bf00	cad499e7-4139-493d-831c-49e49cd489b4	1/2 lb. sweet Italian sausage
567eccd4-65af-4c41-bfda-7eacbc10a0af	cad499e7-4139-493d-831c-49e49cd489b4	1 medium onion -chopped
c686d72f-36d4-4421-b90c-c0b1688566a9	cad499e7-4139-493d-831c-49e49cd489b4	2 garlic cloves -minced
db5458f4-7d2c-4fb9-9efe-c730a394f28d	cad499e7-4139-493d-831c-49e49cd489b4	2 Tablespoons sugar
2c04c7f3-947b-4d16-9141-861ffd29aa81	cad499e7-4139-493d-831c-49e49cd489b4	1 Tablespoon Italian seasoning
7032d363-36c8-4626-87d7-1526763a239f	cad499e7-4139-493d-831c-49e49cd489b4	2 teaspoons salt
5153bc19-9166-4232-a15b-05b038f9fb68	cad499e7-4139-493d-831c-49e49cd489b4	1 teaspoon dried basil leaves
03dd65dd-e17f-445a-8167-8124de6a1947	cad499e7-4139-493d-831c-49e49cd489b4	1/4 teaspoon ground black pepper
eda0ed02-0e64-4f99-bdb0-0a35cc10e3fc	cad499e7-4139-493d-831c-49e49cd489b4	2 (6 oz.) cans tomato paste
b5104bd6-bed4-4182-8389-e28789bf1281	cad499e7-4139-493d-831c-49e49cd489b4	1 (15 oz.) can tomato sauce
b53d5b42-df02-4ac2-93c3-8d8a289beaa2	cad499e7-4139-493d-831c-49e49cd489b4	1 (15 oz.) can crushed tomatoes
a71ea81c-9d6b-476a-9a3e-fdbb5216137c	cad499e7-4139-493d-831c-49e49cd489b4	1/2 cup water
a5dbd77b-c2fa-47db-b7d3-1bfac5b16e77	cad499e7-4139-493d-831c-49e49cd489b4	3 Tablespoons minced fresh flat-leaf parsley
73b374e6-dcf4-4689-9f3f-c30daa0ac83f	cad499e7-4139-493d-831c-49e49cd489b4	1 lb. dried spaghetti pasta
4b5a8b3b-4b3b-4800-9a1e-6f252583024b	cad499e7-4139-493d-831c-49e49cd489b4	2 Tablespoons grated parmesan cheese
d811eb27-d7e0-4970-baca-10d1357585b7	9488e1a8-8c74-4e13-a42d-2c179bc45bc8	¼ cup brown sugar, packed
24999f0d-2b0f-48a4-908a-81b1f203ce04	9488e1a8-8c74-4e13-a42d-2c179bc45bc8	¼ cup reduced sodium soy sauce
926da7ee-a14e-49fa-89a3-1af345975ba0	9488e1a8-8c74-4e13-a42d-2c179bc45bc8	2 teaspoons sesame oil
3f095865-bc8a-43b7-9306-eea9631b07c0	9488e1a8-8c74-4e13-a42d-2c179bc45bc8	½ teaspoon crushed red-pepper flakes, or more to taste
c27a0b9e-6ced-4934-ac52-9f2823090e94	9488e1a8-8c74-4e13-a42d-2c179bc45bc8	¼ teaspoon ground ginger
a9ff90f4-12b1-4086-9988-7695e38ff8ae	9488e1a8-8c74-4e13-a42d-2c179bc45bc8	1 tablespoon vegetable oil
caa8ce7b-7960-4d86-93dd-653c0a02110f	9488e1a8-8c74-4e13-a42d-2c179bc45bc8	3 cloves garlic, minced
9bb74695-462c-44fb-829a-e6226c28b510	9488e1a8-8c74-4e13-a42d-2c179bc45bc8	1 pound ground beef
a0bba68a-123b-448f-99a3-3449f4e627db	9488e1a8-8c74-4e13-a42d-2c179bc45bc8	2 green onions, thinly sliced
26cea602-5573-4f19-a73a-b304f3938446	9488e1a8-8c74-4e13-a42d-2c179bc45bc8	¼ teaspoon sesame seeds
\.


--
-- Data for Name: instructions; Type: TABLE DATA; Schema: public; Owner: andre
--

COPY public.instructions (id, recipe_id, index, name) FROM stdin;
b0db2277-fbf0-4897-bed9-15f5537397d7	5a6267de-de4a-4121-a422-d16b69164b4c	0	Preheat the grill to 375 degrees F (medium-high).
280ddc15-3fb0-4595-bcfc-580c4842746c	5a6267de-de4a-4121-a422-d16b69164b4c	1	In a large bowl, add the beef.  Sprinkle evenly with the Worcestershire sauce, seasoning salt, garlic powder, and pepper.  Use your hands to mix the ingredients until they are just combined.
d88324e8-d301-4d8d-91b4-5c9616630a49	5a6267de-de4a-4121-a422-d16b69164b4c	2	Divide the meat mixture into fourths.  Take ¼ of the meat mixture and use your hands to press it into the shape of a hamburger patty that is about ¾ inch thick.  Make an indention in the middle of the patty to prevent bulging in the center of the hamburger as it cooks.  Repeat with the remaining meat mixture, making 4 hamburgers.
9b48bca4-b1e1-417a-8895-fda3a7198749	5a6267de-de4a-4121-a422-d16b69164b4c	3	Place the burgers on the grill.  Cook 4-5 minutes on the first side.  Flip the burgers over and cook an additional 4-5 minutes, until the burgers have reached the desired doneness.*
3082fce3-5bfd-4054-bf9c-5204cc7ed306	5a6267de-de4a-4121-a422-d16b69164b4c	4	If adding cheese, lay a slice of cheese on each burger patty about 1 minute before taking the burgers off the grill, so the cheese has a chance to melt.
9dd72715-ef0f-44b2-ab10-cb9c82f8d847	5a6267de-de4a-4121-a422-d16b69164b4c	5	Serve the burgers on hamburger buns with optional hamburger toppings.
aac63edb-36fa-4c8a-be9c-4bf384b203c3	1d7ad142-993a-4c4b-aece-32bbd6e63f6a	0	Preheat oven to 350°.
160fec1a-b6b1-42b6-bc01-df9d903a98d3	1d7ad142-993a-4c4b-aece-32bbd6e63f6a	1	Cream together the butter, granulated sugar and brown sugar.
d9eba2a7-082f-4f29-8558-f40b33584f3e	1d7ad142-993a-4c4b-aece-32bbd6e63f6a	2	Add the egg and vanilla. Mix until light in color and creamy.
5b94292a-ea9a-4e7c-86af-6b1a8203f3e8	1d7ad142-993a-4c4b-aece-32bbd6e63f6a	3	Add in the dry ingredients (flour, crushed graham crackers, baking soda, baking powder and salt), mix into the dough. Mix until completely combined.
28296a38-4ba7-41ff-9f75-d96be4d5b10f	1d7ad142-993a-4c4b-aece-32bbd6e63f6a	4	Portion out the dough into 1/2 cup portions. Roll into a ball and arrange 6 onto each cookie sheet. Press down slightly on the cookie dough, flattening it until it is abotu 1 inch thick.
c425456d-cf6a-4fac-af05-6ac51f3d4587	1d7ad142-993a-4c4b-aece-32bbd6e63f6a	5	Bake for 10-13 minutes, until the cookies are turning golden brown.
fdd624ce-4b23-40a1-97b9-c4d7ed0c1f3e	1d7ad142-993a-4c4b-aece-32bbd6e63f6a	6	Allow the cookies to cool on the pan for 5 minutes before transfering to ta wire rack.
14c1909d-98ae-4af9-b718-60a25cbd3529	1d7ad142-993a-4c4b-aece-32bbd6e63f6a	7	While the cookies are cooling, make the frosting by whipping the cream cheese until smooth.
eb7d4543-68f4-4b80-8962-10718f83c95c	1d7ad142-993a-4c4b-aece-32bbd6e63f6a	8	Add the powdered sugar 1/2 cup at a time, mixing until completely combined before adding more powdered sugar. Repeat until the full 2 cups of powdered sugar have been added.
03fc489c-cb45-447e-bb61-f2a40bf19266	1d7ad142-993a-4c4b-aece-32bbd6e63f6a	9	Add in the marshmallow cream and mixuntil all of it has been combined thoroughly.
5bfa25c7-3f5d-4f86-96ed-4117ec90ed8f	1d7ad142-993a-4c4b-aece-32bbd6e63f6a	10	Add the frosting to a gallon sized zip top bag, cut the corner of the bag and use it to pipe the frosting onto the warm cookies in a spiral.
f080e729-4083-46de-862c-cbee2b85f426	1d7ad142-993a-4c4b-aece-32bbd6e63f6a	11	Add the raspberry preserves to a small zip top bag and cut the corner and zig zag the raspberry preserves over top of the frosting. Serve and Enjoy!
57dfda47-13e1-4231-91f0-1a14d29f3080	cad499e7-4139-493d-831c-49e49cd489b4	0	Make the meat sauce. Add the beef and sausage to a large skillet over medium-high heat, breaking it apart with a wooden spoon. Add the onion and garlic. Cook until meat is browned, about 6-8 minutes. Drain the fat from the meat.
e0ba0fb3-f37a-4072-9b6e-1f0a14d5efa9	cad499e7-4139-493d-831c-49e49cd489b4	1	Add the sugar, Italian seasoning, salt, basil, and black pepper to the skillet with the cooked meat.  Stir well.
c0611f8d-5cf5-4bab-9ac1-83ecfc84918e	cad499e7-4139-493d-831c-49e49cd489b4	2	Add the tomato paste.  Stir until no large clumps of tomato paste remain.
7a5dc85c-a303-4a30-a9df-61d33d6c1072	cad499e7-4139-493d-831c-49e49cd489b4	3	Add the tomato sauce, crushed tomatoes, and water. Stir until well combined. Cover and reduce the heat to low. Simmer the sauce for 30 minutes. Remove from the heat.  Stir in the minced parsley.
e1729253-f1d4-4fd7-a21f-0f39a66085f2	cad499e7-4139-493d-831c-49e49cd489b4	4	As the sauce is simmering, cook the pasta al dente according to its package directions.  Drain the pasta well, and return it to the large pot used for boiling.
4c1d1924-2619-4e4c-bb05-ac571434781e	cad499e7-4139-493d-831c-49e49cd489b4	5	Pour the meat sauce over the pasta.  Stir well.  Add the parmesan cheese to the pasta.  Stir well.  Let the spaghetti rest in the meat sauce for 5 minutes before serving to let the pasta absorb some of the sauce.
3199386b-fb46-40b8-9123-185bcbd23995	9488e1a8-8c74-4e13-a42d-2c179bc45bc8	0	In a small bowl, whisk together brown sugar, soy sauce, sesame oil, red pepper flakes and ginger.
e0c3209b-8680-47bc-a289-8cb56c2dd9bc	9488e1a8-8c74-4e13-a42d-2c179bc45bc8	1	Heat vegetable oil in a large cast iron skillet over medium high heat. Add garlic and cook, stirring constantly, until fragrant, about 1 minute. Add ground beef and cook until browned, about 3-5 minutes, making sure to crumble the beef as it cooks; drain excess fat.
71c5ff8a-8259-423a-8d21-662f567bf5e1	9488e1a8-8c74-4e13-a42d-2c179bc45bc8	2	Stir in soy sauce mixture and green onions until well combined, allowing to simmer until heated through, about 2 minutes.
3f364908-2c3a-4dc6-bfb6-b4f2e020233f	9488e1a8-8c74-4e13-a42d-2c179bc45bc8	3	Serve immediately, garnished with green onion and sesame seeds, if desired.
\.


--
-- Data for Name: recipes; Type: TABLE DATA; Schema: public; Owner: andre
--

COPY public.recipes (id, name, name_url, category, description, keywords, notes, cook_time, prep_time) FROM stdin;
5a6267de-de4a-4121-a422-d16b69164b4c	The Best Classic Burger	the-best-classic-burger	Entrees	The Best Classic Burger Recipe - Perfectly seasoned juicy homemade hamburgers.  This easy recipe only needs a few ingredients.	burger, ground beef, sandwich	Cook 4 minutes per side for medium well.	8	10
cad499e7-4139-493d-831c-49e49cd489b4	Spaghetti	spaghetti	Entrees	The flying sghetti	spaghetti		40	15
1d7ad142-993a-4c4b-aece-32bbd6e63f6a	Copycat Crumbl Raspberry Cheesecake Cookies	copycat-crumbl-raspberry-cheesecake-cookies	Desserts	Crumbl's Raspberry Cheesecake Cookies are a Graham Cracker flavored Cookie base topped with a Cheesecake Frosting and a Raspberry Preserves Drizzle. This is my recipe, inspired by Crumbl's Cookie. 	cookie		\N	\N
9488e1a8-8c74-4e13-a42d-2c179bc45bc8	Korean Beef Bowl	korean-beef-bowl	Entrees	Tastes like Korean BBQ and is on your dinner table in just 15 min from start to finish! Seriously. It doesn't get any easier than this!	ground beef, Asian		10	5
\.


--
-- Data for Name: selectors; Type: TABLE DATA; Schema: public; Owner: andre
--

COPY public.selectors (id, domain, name, description, ingredients, instructions, notes, image) FROM stdin;
36c5ab1a-2fd7-4733-b2d0-281d0ffdbd82	food	.svelte-1muv3s8	\N	li[style*="display: contents"]:not(:has(.ingredient-heading))	.direction	\N	\N
dbdf3bc4-a11f-4c4d-afb0-1a1fe30a1473	thewholesomedish	.entry-title	.wprm-recipe-summary	.wprm-recipe-ingredient	.wprm-recipe-instruction-text	\N	\N
55a2633a-e6e3-43dd-8424-5e37adf7ab42	cookingwithkarli	.entry-title	.wprm-recipe-summary	.wprm-recipe-ingredient	.wprm-recipe-instruction-text	\N	\N
ff816c65-48cc-4e6c-ada3-3e3cea58a11f	damndelicious	.wprm-recipe-name	.wprm-recipe-summary	.wprm-recipe-ingredient	.wprm-recipe-instruction-text	\N	\N
\.


--
-- Name: ingredients ingredients_pkey; Type: CONSTRAINT; Schema: public; Owner: andre
--

ALTER TABLE ONLY public.ingredients
    ADD CONSTRAINT ingredients_pkey PRIMARY KEY (id);


--
-- Name: instructions instructions_pkey; Type: CONSTRAINT; Schema: public; Owner: andre
--

ALTER TABLE ONLY public.instructions
    ADD CONSTRAINT instructions_pkey PRIMARY KEY (id);


--
-- Name: recipes recipes_name_url_key; Type: CONSTRAINT; Schema: public; Owner: andre
--

ALTER TABLE ONLY public.recipes
    ADD CONSTRAINT recipes_name_url_key UNIQUE (name_url);


--
-- Name: recipes recipes_pkey; Type: CONSTRAINT; Schema: public; Owner: andre
--

ALTER TABLE ONLY public.recipes
    ADD CONSTRAINT recipes_pkey PRIMARY KEY (id);


--
-- Name: selectors selectors_pkey; Type: CONSTRAINT; Schema: public; Owner: andre
--

ALTER TABLE ONLY public.selectors
    ADD CONSTRAINT selectors_pkey PRIMARY KEY (id);


--
-- Name: ingredients ingredients_recipe_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: andre
--

ALTER TABLE ONLY public.ingredients
    ADD CONSTRAINT ingredients_recipe_id_fkey FOREIGN KEY (recipe_id) REFERENCES public.recipes(id);


--
-- Name: instructions instructions_recipe_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: andre
--

ALTER TABLE ONLY public.instructions
    ADD CONSTRAINT instructions_recipe_id_fkey FOREIGN KEY (recipe_id) REFERENCES public.recipes(id);


--
-- PostgreSQL database dump complete
--

