--
-- PostgreSQL database dump
--

-- Dumped from database version 13.4
-- Dumped by pg_dump version 14.6 (Homebrew)

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

DROP DATABASE urguide;
--
-- Name: urguide; Type: DATABASE; Schema: -; Owner: -
--

CREATE DATABASE urguide WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.UTF-8';


\connect urguide

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
-- Name: dislikes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.dislikes (
    id integer NOT NULL,
    user_id integer,
    disliked_user integer,
    disliked_user_id integer
);


--
-- Name: dislikes_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.dislikes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: dislikes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.dislikes_id_seq OWNED BY public.dislikes.id;


--
-- Name: likes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.likes (
    id integer NOT NULL,
    user_id integer,
    liked_user integer NOT NULL,
    liked_username text
);


--
-- Name: likes_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.likes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: likes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.likes_id_seq OWNED BY public.likes.id;


--
-- Name: matches; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.matches (
    id integer NOT NULL,
    user_id integer,
    matched_user integer
);


--
-- Name: matches_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.matches_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: matches_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.matches_id_seq OWNED BY public.matches.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    first_name text NOT NULL,
    last_name text NOT NULL,
    username text NOT NULL,
    password text NOT NULL,
    email character varying(50) NOT NULL,
    city text NOT NULL,
    state text NOT NULL,
    country text NOT NULL,
    zip_code integer,
    latitude numeric,
    longitude numeric,
    image_url text,
    hobbies text,
    interests text,
    is_admin boolean DEFAULT false NOT NULL
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: dislikes id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.dislikes ALTER COLUMN id SET DEFAULT nextval('public.dislikes_id_seq'::regclass);


--
-- Name: likes id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.likes ALTER COLUMN id SET DEFAULT nextval('public.likes_id_seq'::regclass);


--
-- Name: matches id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.matches ALTER COLUMN id SET DEFAULT nextval('public.matches_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: dislikes; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.dislikes (id, user_id, disliked_user, disliked_user_id) FROM stdin;
\.


--
-- Data for Name: likes; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.likes (id, user_id, liked_user, liked_username) FROM stdin;
1	17	27	xuxa
\.


--
-- Data for Name: matches; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.matches (id, user_id, matched_user) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users (id, first_name, last_name, username, password, email, city, state, country, zip_code, latitude, longitude, image_url, hobbies, interests, is_admin) FROM stdin;
1	test	user	testuser	123123123	testuser@email.com	testcity	teststate	testcountry	12345	12345	12345	https://randomuser.me/api/portraits/men/63.jpg	{traveling,shopping}	{art,sightseeing}	f
2	Izm	Mad	Channel2live	testPassword	bombBeatz@gmail.com	testcity	test	testcountry	12345	12345	12345	https://randomuser.me/api/portraits/women/44.jpg	{testhobbies,"rock climbing"}	{"pleasssse work"}	t
3	Lorenza	Barnardo	lbarnardo2	OzM28cthZbM	lbarnardo2@ebay.com	Luzon	Tagbina	Philippines	8308	8.417766	126.207415	https://randomuser.me/api/portraits/men/4.jpg	{"facilitate wireless infrastructures"}	{"Function-based client-server internet solution"}	f
4	Carolin	Brodeur	cbrodeur3	vlMpXR	cbrodeur3@diigo.com	Seoul	Namyang-dong	South Korea	\N	41.45785	128.833333	https://randomuser.me/api/portraits/women/27.jpg	{"transform magnetic content"}	{"Distributed solution-oriented neural-net"}	f
5	Raeanna	Labbet	rlabbet4	JAA6M4o2WL	rlabbet4@discovery.com	Jõhvi	Estonia	Estonia	\N	59.3573116	27.4136645	https://randomuser.me/api/portraits/women/20.jpg	iterate vertical infomediaries	Quality-focused homogeneous help-desk	f
6	Anni	Jarvimen	lazybutterfly288	eagle	anni.jarvinen@example.com	Kinnula	Southern Ostrobothnia	Finland	63706	-28.2686	140.6429	https://randomuser.me/api/portraits/med/women/5.jpg	singing, danging	traveling, sightseeing	f
7	Tom	Williams	tomwilliams	password123	tomwilliams@example.com	Sydney	NSW	Australia	2000	-33.8651	151.2094	https://randomuser.me/api/portraits/men/86.jpg	{surfing,climbing}	{history,science}	f
8	Samantha	Jones	samanthajones	password123	samanthajones@example.com	Melbourne	VIC	Australia	3000	-37.8136	144.9631	https://randomuser.me/api/portraits/women/13.jpg	{yoga,hiking}	{art,music}	f
9	Aurelea	Cucuzza	acucuzza0	IQYfo7z	acucuzza0@latimes.com	Mihara	Tokyo	Japan	905264	26.5584469	128.07496	https://randomuser.me/api/portraits/men/55.jpg	Sports	Konklab	f
10	Phoebe	Lowings	plowings1	GOVoGwNrrn6	plowings1@parallels.com	Höshööt	Mongolia	Mongolia	\N	48.94776	89.14358	https://randomuser.me/api/portraits/men/11.jpg	Automotive	Pannier	f
11	Melisse	Barnett	mbarnett3	JmyxAg	mbarnett3@surveymonkey.com	Ramaram	Indonesia	Indonesia	\N	-6.8982	113.1705	https://randomuser.me/api/portraits/men/51.jpg	Grocery	Y-Solowarm	f
12	Lilah	Ebbin	lebbin4	5Aydykl	lebbin4@hud.gov	Jingling	China	China	\N	30.96187	113.378132	https://randomuser.me/api/portraits/men/16.jpg	Clothing	Cardguard	f
13	Erinn	Derby	ederby5	zQu3Z6sv8	ederby5@spotify.com	Vimmerby	Kalmar	Sweden	59893	57.6152326	16.0320901	https://randomuser.me/api/portraits/women/50.jpg	Grocery	Bitwolf	f
14	Reggy	Milier	rmilier7	3noXnJ	rmilier7@theguardian.com	Kazo	Japan	Japan	3650023	36.065787	139.5560067	https://randomuser.me/api/portraits/men/90.jpg	Beauty	Bigtax	f
15	Shelli	Kinrade	skinrade8	j9zHSXr7fx	skinrade8@pagesperso-orange.fr	Barqueiro	Leiria	Portugal	2430604	39.8699419	-8.9175063	https://randomuser.me/api/portraits/women/33.jpg	Toys	It	f
16	Gino	Wigfall	gwigfalla	LxG37zl	gwigfalla@si.edu	Morada Nova	Brazil	Brazil	62940000	-5.0662102	-38.3587174	https://randomuser.me/api/portraits/women/2.jpg	Sports	Ceratotherium simum	f
17	Marcus	Elham	melhame	V1wxpItw	melhame@behance.net	Abashiri	Japan	Japan	4080021	41.9585475	-88.0725041	https://randomuser.me/api/portraits/women/16.jpg	Movies	Lotstring	f
18	Ailbert	Kitchinghan	akitchinghanf	5g36ndQT0	akitchinghanf@skype.com	Luti	Luti	Indonesia	\N	1.12808	104.0301606	https://randomuser.me/api/portraits/men/65.jpg	Outdoors	Veribet	f
19	Stefano	Conrath	sconrathg	FxH0a5W7j	sconrathg@wikia.com	Ventspils	Latavia	Latvia	\N	57.3937216	21.5647066	https://randomuser.me/api/portraits/men/32.jpg	Shoes	Bitwolf	f
20	Joseph	Ruben	jrubenh	qaCmXLh0z1xE	jrubenh@wikia.com	Puerto Alto	Honduras	Honduras	6078204	15.5847347	-86.3503495	https://randomuser.me/api/portraits/women/7.jpg	Beauty	Bamity	f
21	Garv	Darrigone	gdarrigonei	j3LaxUJiP3b	gdarrigonei@amazon.co.uk	Xinxikou	China	China	\N	29.772645	118.703307	https://randomuser.me/api/portraits/men/63.jpg	Beauty	Mat Lam Tam	f
22	Fenelia	Claque	fclaquej	tuWHmmN7C	fclaquej@delicious.com	Lecheng	China	China	\N	23.35329	112.339444	https://randomuser.me/api/portraits/women/28.jpg	Clothing	Keylex	f
23	Gene	Cuttings	gcuttingsk	KEdjG8	gcuttingsk@moonfruit.com	Obernai	Alsace	France	67214	48.4621258	7.4888434	https://randomuser.me/api/portraits/women/37.jpg	Grocery	Treeflex	f
24	Filberto	Tewkesbury.	ftewkesburyl	vRTqhpnh0wFb	ftewkesburyl@tonline.de	Gīdolē	Gīdolē	Ethiopia	\N	5.6497493	37.3693679	https://randomuser.me/api/portraits/women/89.jpg	Sports	Flowdesk	f
25	Jobie	Cloughton	jcloughtonm	IRuumJuq4n	jcloughtonm@yale.edu	Joubb Jannîne	Lebanon	Lebanon	2514	33.6328198	35.7819158	https://randomuser.me/api/portraits/men/89.jpg	Sports	Latlux	f
26	Cozmo	Carter	ccartern	xhJ3SrjaguDh	ccartern@w3.org	Yabluniv	Ukraine	Ukraine	2425823	48.4018664	24.9415656	https://randomuser.me/api/portraits/women/35.jpg	Outdoors	Holdlamis	f
27	Xuxa	Larosa	xuxa	$2b$12$B7o9a5ILOPeEM13Gua9bkOg1PsEhKGGVyE3Cp.iPgepfyMsCkbQPO	test@mail.com	San Francisco	CA	US	94110	\N	\N	\N	2	11	f
\.


--
-- Name: dislikes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.dislikes_id_seq', 1, false);


--
-- Name: likes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.likes_id_seq', 4, true);


--
-- Name: matches_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.matches_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 27, true);


--
-- Name: dislikes dislikes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.dislikes
    ADD CONSTRAINT dislikes_pkey PRIMARY KEY (id);


--
-- Name: dislikes dislikes_user_id_disliked_user_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.dislikes
    ADD CONSTRAINT dislikes_user_id_disliked_user_key UNIQUE (user_id, disliked_user);


--
-- Name: likes likes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_pkey PRIMARY KEY (id);


--
-- Name: likes likes_user_id_liked_user_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_user_id_liked_user_key UNIQUE (user_id, liked_user);


--
-- Name: matches matches_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.matches
    ADD CONSTRAINT matches_pkey PRIMARY KEY (id);


--
-- Name: users unique_username; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT unique_username UNIQUE (username);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX users_id_idx ON public.users USING btree (id);


--
-- Name: dislikes dislikes_disliked_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.dislikes
    ADD CONSTRAINT dislikes_disliked_user_fkey FOREIGN KEY (disliked_user) REFERENCES public.users(id);


--
-- Name: dislikes dislikes_disliked_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.dislikes
    ADD CONSTRAINT dislikes_disliked_user_id_fkey FOREIGN KEY (disliked_user_id) REFERENCES public.users(id);


--
-- Name: dislikes dislikes_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.dislikes
    ADD CONSTRAINT dislikes_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: likes likes_liked_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_liked_user_fkey FOREIGN KEY (liked_user) REFERENCES public.users(id);


--
-- Name: likes likes_liked_username_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_liked_username_fkey FOREIGN KEY (liked_username) REFERENCES public.users(username);


--
-- Name: likes likes_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: matches matches_matched_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.matches
    ADD CONSTRAINT matches_matched_user_fkey FOREIGN KEY (matched_user) REFERENCES public.users(id);


--
-- Name: matches matches_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.matches
    ADD CONSTRAINT matches_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

