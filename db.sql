--
-- PostgreSQL database dump
--

-- Dumped from database version 12.2
-- Dumped by pg_dump version 12.2

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: breeds; Type: TABLE; Schema: public; Owner: bill
--

CREATE TABLE public.breeds (
    name text NOT NULL
);


ALTER TABLE public.breeds OWNER TO bill;

--
-- Name: dogs; Type: TABLE; Schema: public; Owner: bill
--

CREATE TABLE public.dogs (
    id integer NOT NULL,
    name text NOT NULL,
    birthdate date,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    primary_color text,
    secondary_color text,
    photo_url text,
    owner_id integer,
    breed text
);


ALTER TABLE public.dogs OWNER TO bill;

--
-- Name: dogs_id_seq; Type: SEQUENCE; Schema: public; Owner: bill
--

CREATE SEQUENCE public.dogs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.dogs_id_seq OWNER TO bill;

--
-- Name: dogs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bill
--

ALTER SEQUENCE public.dogs_id_seq OWNED BY public.dogs.id;


--
-- Name: owners; Type: TABLE; Schema: public; Owner: bill
--

CREATE TABLE public.owners (
    id integer NOT NULL,
    display_name text NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    login text NOT NULL
);


ALTER TABLE public.owners OWNER TO bill;

--
-- Name: owners_id_seq; Type: SEQUENCE; Schema: public; Owner: bill
--

CREATE SEQUENCE public.owners_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.owners_id_seq OWNER TO bill;

--
-- Name: owners_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bill
--

ALTER SEQUENCE public.owners_id_seq OWNED BY public.owners.id;


--
-- Name: dogs id; Type: DEFAULT; Schema: public; Owner: bill
--

ALTER TABLE ONLY public.dogs ALTER COLUMN id SET DEFAULT nextval('public.dogs_id_seq'::regclass);


--
-- Name: owners id; Type: DEFAULT; Schema: public; Owner: bill
--

ALTER TABLE ONLY public.owners ALTER COLUMN id SET DEFAULT nextval('public.owners_id_seq'::regclass);


--
-- Data for Name: breeds; Type: TABLE DATA; Schema: public; Owner: bill
--

COPY public.breeds (name) FROM stdin;
Pomeranian
Pitbull
Chihuahua
Afghan Hound
Akita
American Eskimo
Basenji
Bichon Frisé
English Foxhound
Greyhound
Havanese
Maltese
Papillon
Pug
Samoyed
Whippet
Yorkshire Terrier
\.


--
-- Data for Name: dogs; Type: TABLE DATA; Schema: public; Owner: bill
--

COPY public.dogs (id, name, birthdate, created_at, primary_color, secondary_color, photo_url, owner_id, breed) FROM stdin;
1	Osito	2006-09-13	2020-03-08 18:11:58.235349	Red Sable	\N	https://www.squishable.com/mm5/graphics/00000001/mini_squish_pomeranian_7.jpg	3	Pomeranian
2	Oscuro	2006-09-13	2020-03-08 18:14:07.465324	Red Sable	\N	https://upload.wikimedia.org/wikipedia/en/b/be/Missile_Ghost_Trick.jpg	3	Pomeranian
\.


--
-- Data for Name: owners; Type: TABLE DATA; Schema: public; Owner: bill
--

COPY public.owners (id, display_name, created_at, login) FROM stdin;
3	Bill D	2020-03-08 16:54:58.322663-07	bill
4	Amy	2020-03-08 16:55:49.09451-07	amy-u
\.


--
-- Name: dogs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: bill
--

SELECT pg_catalog.setval('public.dogs_id_seq', 3, true);


--
-- Name: owners_id_seq; Type: SEQUENCE SET; Schema: public; Owner: bill
--

SELECT pg_catalog.setval('public.owners_id_seq', 4, true);


--
-- Name: breeds breeds_pkey; Type: CONSTRAINT; Schema: public; Owner: bill
--

ALTER TABLE ONLY public.breeds
    ADD CONSTRAINT breeds_pkey PRIMARY KEY (name);


--
-- Name: dogs dogs_pkey; Type: CONSTRAINT; Schema: public; Owner: bill
--

ALTER TABLE ONLY public.dogs
    ADD CONSTRAINT dogs_pkey PRIMARY KEY (id);


--
-- Name: owners owners_pkey; Type: CONSTRAINT; Schema: public; Owner: bill
--

ALTER TABLE ONLY public.owners
    ADD CONSTRAINT owners_pkey PRIMARY KEY (id);


--
-- Name: owners_unique_login; Type: INDEX; Schema: public; Owner: bill
--

CREATE UNIQUE INDEX owners_unique_login ON public.owners USING btree (login);


--
-- Name: dogs dogs_owner_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bill
--

ALTER TABLE ONLY public.dogs
    ADD CONSTRAINT dogs_owner_id_fkey FOREIGN KEY (owner_id) REFERENCES public.owners(id);


--
-- PostgreSQL database dump complete
--

