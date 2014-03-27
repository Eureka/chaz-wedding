--
-- PostgreSQL database dump
--

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: guests; Type: TABLE; Schema: public; Owner: root; Tablespace: 
--

CREATE TABLE guests (
    id integer NOT NULL,
    invitation_id integer,
    title character varying(8),
    name character varying(64),
    email character varying(128),
    is_attending boolean,
    is_plusone boolean DEFAULT false NOT NULL,
    password character varying(16),
    groups character varying(256),
    invite_key character varying(8),
    allergies character varying(256),
    food_pref character varying(256),
    total_attending character varying(256),
    attending_names character varying(256),
    meal character varying(32),
    is_attending_brunch boolean DEFAULT true NOT NULL,
    CONSTRAINT meal CHECK (((meal)::text = ANY ((ARRAY['vegan'::character varying, 'vegetarian'::character varying, 'none'::character varying])::text[])))
);


ALTER TABLE public.guests OWNER TO root;

--
-- Name: guests_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE guests_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.guests_id_seq OWNER TO root;

--
-- Name: guests_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE guests_id_seq OWNED BY guests.id;


--
-- Name: invitations; Type: TABLE; Schema: public; Owner: root; Tablespace: 
--

CREATE TABLE invitations (
    id integer NOT NULL,
    address text,
    rsvpd boolean DEFAULT false NOT NULL,
    allow_plusone boolean DEFAULT false NOT NULL,
    has_children boolean DEFAULT false NOT NULL
);


ALTER TABLE public.invitations OWNER TO root;

--
-- Name: invitations_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE invitations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.invitations_id_seq OWNER TO root;

--
-- Name: invitations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE invitations_id_seq OWNED BY invitations.id;


--
-- Name: migrations; Type: TABLE; Schema: public; Owner: root; Tablespace: 
--

CREATE TABLE migrations (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    run_on timestamp without time zone NOT NULL
);


ALTER TABLE public.migrations OWNER TO root;

--
-- Name: migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE migrations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.migrations_id_seq OWNER TO root;

--
-- Name: migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE migrations_id_seq OWNED BY migrations.id;


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY guests ALTER COLUMN id SET DEFAULT nextval('guests_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY invitations ALTER COLUMN id SET DEFAULT nextval('invitations_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY migrations ALTER COLUMN id SET DEFAULT nextval('migrations_id_seq'::regclass);


--
-- Data for Name: guests; Type: TABLE DATA; Schema: public; Owner: root
--

COPY guests (id, invitation_id, title, name, email, is_attending, is_plusone, password, groups, invite_key, allergies, food_pref, total_attending, attending_names, meal, is_attending_brunch) FROM stdin;
1	1	Mr.	Ian & Katya	eureka@hacktheory.com	\N	f	Password1	admin	ianw	\N	\N	\N	\N	\N	t
2	2		Mark & Miff Koltiska	miffmark@rangeweb.net	\N	f	8sl1js	family		\N	\N	\N	\N	\N	t
3	3		Monty Miller & Eugene	Monty@ipsltd.info	\N	f	x811js	family		\N	\N	\N	\N	\N	t
4	4		Jared & Olivia	jkoltis1@uwyo.edu	\N	f	8sk2j	friend		\N	\N	\N	\N	\N	t
5	5		John & Sandy Koltiska	skoltisk@uwyo.edu	\N	f	ksk2j	friend		\N	\N	\N	\N	\N	t
6	6		Doug & Susan Koltiska	susan.koltiska@hotmail.com	\N	f	8jj2j	friend		\N	\N	\N	\N	\N	t
7	7		Kevin Berry	kberry@uwyo.edu	\N	f	8jj772	wedding_party		\N	\N	\N	\N	\N	t
8	8		Ali & Chris	agaley921@gmail.com	\N	f	86gt72	wedding_party		\N	\N	\N	\N	\N	t
9	9		Will & Chrystal Riley	equestrianpsych@hotmail.com	\N	f	869972	friend		\N	\N	\N	\N	\N	t
10	10		Ryan & Ashley Koltiska	ivegotmusic@hotmail.com	\N	f	mys972	friend		\N	\N	\N	\N	\N	t
13	13		Martha & Micheal Nesbit	marthawnesbitt@yahoo.com	\N	f	55s9g2	family		\N	\N	\N	\N	\N	t
14	14		Brett & Brooke Fox	brookesfox@comcast.net	\N	f	5us9g2	family		\N	\N	\N	\N	\N	t
15	15		Skip & Mary Serrell	makserrell@gmail.com	\N	f	57s9g2	family		\N	\N	\N	\N	\N	t
16	16		Grandpop & Gags	lindsaywserrell@gmail.com	\N	f	5aba2	family		\N	\N	\N	\N	\N	t
17	17		Denise & Dennis	dpterven@gmail.com	\N	f	5aaba2	friend		\N	\N	\N	\N	\N	t
18	18		Martha & Jack Roberts	mrmredangus@zianet.com	\N	f	8uaba2	friend		\N	\N	\N	\N	\N	t
19	19		Ed & Michelle Carpenter	ladysurg@aol.com	\N	f	8ubbba2	family		\N	\N	\N	\N	\N	t
20	20		Scott & Darcy	flagfluterifle@gmail.com	\N	f	8uasba2	family		\N	\N	\N	\N	\N	t
21	21		Dave Chen	drc.the.ee@gmail.com	\N	f	8ua22a2	friend		\N	\N	\N	\N	\N	t
22	22		Tom Praderio	tom.praderio@gmail.com	\N	f	8unt2a2	friend		\N	\N	\N	\N	\N	t
23	23		Dan Becker	beckerd42@gmail.com	\N	f	8u222a2	friend		\N	\N	\N	\N	\N	t
24	24		Chris Kanitra	chris.kanitra@gmail.com	\N	f	8uzn2a2	friend		\N	\N	\N	\N	\N	t
25	25		David Cardelli	dcardelli88@gmail.com	\N	f	8um72a2	friend		\N	\N	\N	\N	\N	t
26	26		Marcus & Margo Wilkerson	marcus.wilkerson@gmail.com	\N	f	8u66a2	friend		\N	\N	\N	\N	\N	t
27	27		Sam & Holly Griffin	wrightmiff@yahoo.com	\N	f	8ubba2	family		\N	\N	\N	\N	\N	t
28	28		Jeffory Griffin	jefforya@aol.com	\N	f	8ubba2	family		\N	\N	\N	\N	\N	t
29	29		Frank & Colleen	fgaley@uwyo.edu	\N	f	8ubba2	family		\N	\N	\N	\N	\N	t
30	30		Lindsay Galey	lindsay0704@gmail.com	\N	f	8uZZa2	family		\N	\N	\N	\N	\N	t
31	31		Dustin Williams	tuxbook@gmail.com	\N	f	8u88a2	friend		\N	\N	\N	\N	\N	t
32	32		Phil & Ellen Duran	phed.qed@gmail.com	\N	f	8u00a2	wedding_party		\N	\N	\N	\N	\N	t
33	33		Stormy Knight	stormyk@gmail.com	\N	f	8u00a2	friend		\N	\N	\N	\N	\N	t
34	34		Rob & Sharon Anstead	sanstead@yahoo.com	\N	f	8u00a2	family		\N	\N	\N	\N	\N	t
35	35		James Smith & Family	James.A.Smith@jpl.nasa.gov	\N	f	8LL0a2	friend		\N	\N	\N	\N	\N	t
36	36		Payam Banazadeh	baxter.payam@gmail.com	\N	f	8II0a2	friend		\N	\N	\N	\N	\N	t
37	37		Ernie Diaz	Ernesto.Diaz@jpl.nasa.gov	\N	f	8kma2	friend		\N	\N	\N	\N	\N	t
38	38		Bill & Joanne Sinclair	jowrays@earthlink.net	\N	f	8kjjn2	family		\N	\N	\N	\N	\N	t
39	39		Stacy Kawecki	slekaw@umich.edu	\N	f	8kuun2	friend		\N	\N	\N	\N	\N	t
40	40		Julie Barron	jabarron@mchsi.com	\N	f	8kumic2	friend		\N	\N	\N	\N	\N	t
41	41		Monique McCullum	Macmccullum@yahoo.com	\N	f	8ku88c2	family		\N	\N	\N	\N	\N	t
42	42		Marget Davis	mgtdavis@yahoo.com	\N	f	8ku99c2	family		\N	\N	\N	\N	\N	t
43	43		Sue Bowyer	drsusan@umich.edu	\N	f	8kuuty2	family		\N	\N	\N	\N	\N	t
44	44		Tony Davis	tbone2112@gmail.com	\N	f	8kuuty2	family		\N	\N	\N	\N	\N	t
45	45		Niles & Patricia Seifert	nilesseifert@msn.com	\N	f	8kTuty2	family		\N	\N	\N	\N	\N	t
46	46		Frankie & JT McSeifert	frankiedance@gmail.com	\N	f	8kTtny2	family		\N	\N	\N	\N	\N	t
47	47		Marisa & Lynne Seifert	Jpwestern@yahoo.com	\N	f	8kMtny2	family		\N	\N	\N	\N	\N	t
48	48		Moriarty	winefride1936@gmail.com	\N	f	8kMtny2	family		\N	\N	\N	\N	\N	t
49	49		Raichel & Stewart Hankin	rachelhankin@msn.com	\N	f	8kMtnY	family		\N	\N	\N	\N	\N	t
50	50		Luke Moriarty	luke.moriarty@gmail.com	\N	f	8kM7nY	family		\N	\N	\N	\N	\N	t
51	51		Tracy Ricker	Tracy.r.ricker@gmail.com	\N	f	8ke7nY	wedding_party		\N	\N	\N	\N	\N	t
52	52		Anita Winegar	wwitchy40@gmail.com	\N	f	8k6ynY	family		\N	\N	\N	\N	\N	t
54	54		Lisa Black	lisa.l.black.33@facebook.com	\N	f	9y6y7Y	family		\N	\N	\N	\N	\N	t
56	56		Seneca Lindsey	Crazymathguy@gmail.com	\N	f	9u887Y	friend		\N	\N	\N	\N	\N	t
57	57		Ayoe Buus Hansen	ayoebuus@gmail.com	\N	f	9u88uY	friend		\N	\N	\N	\N	\N	t
58	58		Drew Jones	drewjones1981@gmail.com	\N	f	9u88uY	friend		\N	\N	\N	\N	\N	t
59	59		Jake Wolkenhauer	Cloudforger@yahoo.com	\N	f	9utbuY	friend		\N	\N	\N	\N	\N	t
60	60		Jonathan Nickerson	jsni@umich.edu	\N	f	4NbuY	friend		\N	\N	\N	\N	\N	t
61	61		Juliet McGraw	mcgrawjuliet@gmail.com	\N	f	4Nb6uY	friend		\N	\N	\N	\N	\N	t
62	62		John & Tiffany Braitsch	Jbraitsch@gmail.com	\N	f	4UM6uY	friend		\N	\N	\N	\N	\N	t
63	63		Holly Curatolo	hkcuratolo@gmail.com	\N	f	4U66uY	friend		\N	\N	\N	\N	\N	t
64	64		Kevin Owen	Kjvowen@gmail.com	\N	f	3e66uY	friend		\N	\N	\N	\N	\N	t
65	65		David Sebastian	davidsbn@umich.edu	\N	f	3e66UU	friend		\N	\N	\N	\N	\N	t
66	66		Rachel Kroodsma	rakro@umich.edu	\N	f	3eTgUU	friend		\N	\N	\N	\N	\N	t
67	67		Chris LeDoux	icedancer2@gmail.com	\N	f	3eT66U	friend		\N	\N	\N	\N	\N	t
68	68		JT & Melissa	jatyed@umich.edu	\N	f	3eTybU	friend		\N	\N	\N	\N	\N	t
69	69		Celena Byers	c.jazzz@gmail.com	\N	f	3eTyMM	friend		\N	\N	\N	\N	\N	t
70	70		Jesse Grosinger	jesse.grosinger@gmail.com	\N	f	3eAAmM	friend		\N	\N	\N	\N	\N	t
71	71		Ryan Abell	st.fallen@gmail.com	\N	f	3eUMmM	friend		\N	\N	\N	\N	\N	t
74	72		Joelle Tjahjadi	joelle.tjahjadi@gmail.com	\N	f	3e77mM	friend		\N	\N	\N	\N	\N	t
53	53		Nicole Black	nicolelb1@facebook.com	\N	f	9y6ynY	family		\N	\N	\N	\N	\N	t
55	55		Sasha Carter	sasha.ase.carter@gmail.com	\N	f	9umy7Y	friend		\N	\N	\N	\N	\N	t
12	12		Henry & Holly Wendt	henwendt@mac.com	\N	f	55suy2	family		\N	\N	\N	\N	\N	t
11	11		Nancy Cushing & Bob Evans	ncushing01@gmail.com	\N	f	55s972	family		\N	\N	\N	\N	\N	t
\.


--
-- Name: guests_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('guests_id_seq', 74, true);


--
-- Data for Name: invitations; Type: TABLE DATA; Schema: public; Owner: root
--

COPY invitations (id, address, rsvpd, allow_plusone, has_children) FROM stdin;
1	eureka@hacktheory.com	f	f	f
2	miffmark@rangeweb.net	f	f	f
3	Monty@ipsltd.info	f	f	f
4	jkoltis1@uwyo.edu	f	f	f
5	skoltisk@uwyo.edu	f	f	f
6	susan.koltiska@hotmail.com	f	f	f
7	kberry@uwyo.edu	f	f	f
8	agaley921@gmail.com	f	f	f
9	equestrianpsych@hotmail.com	f	f	f
10	ivegotmusic@hotmail.com	f	f	f
11	ncushing01@gmail.com	f	f	f
12	henwendt@mac.com	f	f	f
13	marthawnesbitt@yahoo.com	f	f	f
14	brookesfox@comcast.net	f	f	f
15	makserrell@gmail.com	f	f	f
16	lindsaywserrell@gmail.com	f	f	f
17	dpterven@gmail.com	f	f	f
18	mrmredangus@zianet.com	f	f	f
19	ladysurg@aol.com	f	f	f
20	flagfluterifle@gmail.com	f	f	f
21	drc.the.ee@gmail.com	f	f	f
22	tom.praderio@gmail.com	f	f	f
23	beckerd42@gmail.com	f	f	f
24	chris.kanitra@gmail.com	f	f	f
25	dcardelli88@gmail.com	f	f	f
26	marcus.wilkerson@gmail.com	f	f	f
27	wrightmiff@yahoo.com	f	f	f
28	jefforya@aol.com	f	f	f
29	fgaley@uwyo.edu	f	f	f
30	lindsay0704@gmail.com	f	f	f
31	tuxbook@gmail.com	f	f	f
32	phed.qed@gmail.com	f	f	f
33	stormyk@gmail.com	f	f	f
34	sanstead@yahoo.com	f	f	f
35	James.A.Smith@jpl.nasa.gov	f	f	f
36	baxter.payam@gmail.com	f	f	f
37	Ernesto.Diaz@jpl.nasa.gov	f	f	f
38	jowrays@earthlink.net	f	f	f
39	slekaw@umich.edu	f	f	f
40	jabarron@mchsi.com	f	f	f
41	Macmccullum@yahoo.com	f	f	f
42	mgtdavis@yahoo.com	f	f	f
43	drsusan@umich.edu	f	f	f
44	tbone2112@gmail.com	f	f	f
45	nilesseifert@msn.com	f	f	f
46	frankiedance@gmail.com	f	f	f
47	Jpwestern@yahoo.com	f	f	f
48	winefride1936@gmail.com	f	f	f
49	rachelhankin@msn.com	f	f	f
50	luke.moriarty@gmail.com	f	f	f
51	Tracy.r.ricker@gmail.com	f	f	f
52	wwitchy40@gmail.com	f	f	f
53	nicolelb1@facebook.com	f	f	f
54	lisa.l.black.33@facebook.com	f	f	f
55	sasha.ase.carter@gmail.com	f	f	f
56	Crazymathguy@gmail.com	f	f	f
57	ayoebuus@gmail.com	f	f	f
58	drewjones1981@gmail.com	f	f	f
59	Cloudforger@yahoo.com	f	f	f
60	jsni@umich.edu	f	f	f
61	mcgrawjuliet@gmail.com	f	f	f
62	Jbraitsch@gmail.com	f	f	f
63	hkcuratolo@gmail.com	f	f	f
64	Kjvowen@gmail.com	f	f	f
65	davidsbn@umich.edu	f	f	f
66	rakro@umich.edu	f	f	f
67	icedancer2@gmail.com	f	f	f
68	jatyed@umich.edu	f	f	f
69	c.jazzz@gmail.com	f	f	f
70	jesse.grosinger@gmail.com	f	f	f
71	st.fallen@gmail.com	f	f	f
72	joelle.tjahjadi@gmail.com	f	f	f
\.


--
-- Name: invitations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('invitations_id_seq', 72, true);


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: root
--

COPY migrations (id, name, run_on) FROM stdin;
1	20130203063826-add-invitations-table	2014-03-24 19:34:35.123
2	20130203075859-add-guests-table	2014-03-24 19:34:35.158
3	20130218030808-alter-tables-non-null-booleans	2014-03-24 19:34:35.171
4	20130504215230-alter-invitations-rename-rsvp-col	2014-03-24 19:34:35.175
5	20130715165319-alter-invitations-remove-send-paper-col	2014-03-24 19:34:35.189
6	20130726221054-alter-guests-add-meal-col	2014-03-24 19:34:35.194
7	20130915195205-alter-guests-add-is-attending-brunch-col	2014-03-24 19:34:35.214
\.


--
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('migrations_id_seq', 7, true);


--
-- Name: guests_pkey; Type: CONSTRAINT; Schema: public; Owner: root; Tablespace: 
--

ALTER TABLE ONLY guests
    ADD CONSTRAINT guests_pkey PRIMARY KEY (id);


--
-- Name: invitations_pkey; Type: CONSTRAINT; Schema: public; Owner: root; Tablespace: 
--

ALTER TABLE ONLY invitations
    ADD CONSTRAINT invitations_pkey PRIMARY KEY (id);


--
-- Name: migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: root; Tablespace: 
--

ALTER TABLE ONLY migrations
    ADD CONSTRAINT migrations_pkey PRIMARY KEY (id);


--
-- Name: guests_invitation_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY guests
    ADD CONSTRAINT guests_invitation_id_fkey FOREIGN KEY (invitation_id) REFERENCES invitations(id);


--
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

