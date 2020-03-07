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
    breed_id text,
    primary_color text,
    secondary_color text,
    photo_url text,
    owner_id integer
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
    name text NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
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

COPY public.dogs (id, name, birthdate, created_at, breed_id, primary_color, secondary_color, photo_url, owner_id) FROM stdin;
\.


--
-- Data for Name: owners; Type: TABLE DATA; Schema: public; Owner: bill
--

COPY public.owners (id, name, created_at) FROM stdin;
\.


--
-- Name: dogs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: bill
--

SELECT pg_catalog.setval('public.dogs_id_seq', 1, false);


--
-- Name: owners_id_seq; Type: SEQUENCE SET; Schema: public; Owner: bill
--

SELECT pg_catalog.setval('public.owners_id_seq', 1, false);


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
-- Name: dogs dogs_owner_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bill
--

ALTER TABLE ONLY public.dogs
    ADD CONSTRAINT dogs_owner_id_fkey FOREIGN KEY (owner_id) REFERENCES public.owners(id);


--
-- PostgreSQL database dump complete
--

