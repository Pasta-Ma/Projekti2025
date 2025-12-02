--
-- PostgreSQL database cluster dump
--

-- Started on 2025-12-02 23:10:00

\restrict aXiIUXoq1zSE8UKMTLApim319N5p6JFjSWyoY1ZsauyVjwVe9g7vr3HZIamEo1e

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Roles
--

CREATE ROLE postgres;
ALTER ROLE postgres WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS PASSWORD 'SCRAM-SHA-256$4096:CHoqihS2AAVYVbbq7vZ7xg==$8vTiimfZqbrDMtVxCOSZmRL6oMQTXbdWpCtIWco6ccs=:7scepEKaMlz7coQWopPUFoAJWVvINmiKmBu8VDt9Wz4=';

--
-- User Configurations
--








\unrestrict aXiIUXoq1zSE8UKMTLApim319N5p6JFjSWyoY1ZsauyVjwVe9g7vr3HZIamEo1e

--
-- Databases
--

--
-- Database "template1" dump
--

\connect template1

--
-- PostgreSQL database dump
--

\restrict jqDo7XucaBnfFm7Txl2RZRhlvTULoZd0mroKXNa0DW03vxpdQxbWMtwVR9a5Bpa

-- Dumped from database version 18.1
-- Dumped by pg_dump version 18.1

-- Started on 2025-12-02 23:10:01

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

-- Completed on 2025-12-02 23:10:01

--
-- PostgreSQL database dump complete
--

\unrestrict jqDo7XucaBnfFm7Txl2RZRhlvTULoZd0mroKXNa0DW03vxpdQxbWMtwVR9a5Bpa

--
-- Database "meetme" dump
--

--
-- PostgreSQL database dump
--

\restrict KbJtoO5QdoRGHfraP1N7pDzqvVmqLWFOTyzRnmeB9zfuWH545Qy6D9MeQuWYZS8

-- Dumped from database version 18.1
-- Dumped by pg_dump version 18.1

-- Started on 2025-12-02 23:10:01

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 5028 (class 1262 OID 16388)
-- Name: meetme; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE meetme WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United Kingdom.1252';


ALTER DATABASE meetme OWNER TO postgres;

\unrestrict KbJtoO5QdoRGHfraP1N7pDzqvVmqLWFOTyzRnmeB9zfuWH545Qy6D9MeQuWYZS8
\connect meetme
\restrict KbJtoO5QdoRGHfraP1N7pDzqvVmqLWFOTyzRnmeB9zfuWH545Qy6D9MeQuWYZS8

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 5029 (class 0 OID 0)
-- Dependencies: 5028
-- Name: DATABASE meetme; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON DATABASE meetme IS 'kouluprojekti';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 222 (class 1259 OID 16442)
-- Name: messages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.messages (
    id integer NOT NULL,
    user_id integer,
    content text NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.messages OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16441)
-- Name: messages_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.messages_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.messages_id_seq OWNER TO postgres;

--
-- TOC entry 5030 (class 0 OID 0)
-- Dependencies: 221
-- Name: messages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.messages_id_seq OWNED BY public.messages.id;


--
-- TOC entry 220 (class 1259 OID 16427)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(50) NOT NULL,
    email character varying(100) NOT NULL,
    password character varying(200) NOT NULL,
    bio text,
    is_admin boolean DEFAULT false
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16426)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 5031 (class 0 OID 0)
-- Dependencies: 219
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 4863 (class 2604 OID 16445)
-- Name: messages id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages ALTER COLUMN id SET DEFAULT nextval('public.messages_id_seq'::regclass);


--
-- TOC entry 4861 (class 2604 OID 16430)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 5022 (class 0 OID 16442)
-- Dependencies: 222
-- Data for Name: messages; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.messages (id, user_id, content, created_at) FROM stdin;
96	4	Testi admin 123	2025-12-02 22:55:36.662206
97	4	wow	2025-12-02 22:55:40.983452
98	15	hehe	2025-12-02 22:56:15.248804
99	15	testi 123	2025-12-02 22:56:17.309061
100	4	admin testi 321	2025-12-02 22:59:48.508458
101	16	Hei!	2025-12-02 23:06:02.04786
102	17	HUHUU?!	2025-12-02 23:06:33.697214
103	17	Mitäs ?	2025-12-02 23:06:46.495768
104	4	juupas	2025-12-02 23:07:42.931357
\.


--
-- TOC entry 5020 (class 0 OID 16427)
-- Dependencies: 220
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, username, email, password, bio, is_admin) FROM stdin;
1	123123	asdasda@outlook.com	$2b$10$g.U/fdDkrPqVfppSZLN7gexlzKoIsMmBUt61vBFG5NUaAZxMoSFUK	\N	f
2	seppo	Seppo@outlook.com	$2b$10$tOKnjD1dh8s.P6km1AqCye.Ua.YbRHkvnhu5.eZKm4SbGOzkVrY6i	\N	f
3	helikkä	apuva@outlook.com	$2b$10$UUf5CsV64WXuOcyTANwUae4wtq3XH5QNpsJKMWyqJzJbsxYaqKuYy	\N	f
5	testi123	testi123@outlook.com	$2b$10$/cixZKzpni/paDwmJ8DWG.v5hMV/B0Qo.feGQpvKZERkR9pjc.jfK	\N	f
6	123123231123	12312312123@outlook.com	$2b$10$vng4UyTpcEONAiK6SQ349O8R2IPdzqxuIKVakqJ39JugP3n0AkKci	\N	f
7	aalisa	aalisa@outlook.com	$2b$10$U49U2OXiXU0/aP/TPcNnZe8XzL4eA5onl3tYkZ2bXEUz5Xu4Dr7VO	\N	f
8	testi321	testi321@outlook.com	$2b$10$eUlqE4QAhcpVkL4D0c04w.3e7wB2F9tY69AaTJhrStboKHSui/1hO	\N	f
9	adsdasdsa	asdasddas@asdasd.com	$2b$10$O9u8y6XT3JdlzR8IZ8zli.kzfrUT8SwW.n7/.8oy4ElAIDhfZq9Nq	\N	f
13	Karitsa	karitsa123@outlook.com	$2b$10$YK2HeXWL2p1J.sYeVgiveOrKoQ9toB80geJdy3yqOBmSPI8/4J76O	Mites menee ?	f
14	testimies	testimies@outlook.com	$2b$10$SyR/g99T2qFYaVkvA4xSFuq5P7lMKKsUSHTK77Tm0TpL/AQ/KNV0S	Apuva	f
15	botti	botti@outlook.com	$2b$10$FEueGc5xq5Vw6WqsyXxlEu2lTu/KDWI0n7HKuk0kB2EifXTAF79U2	Mörkö	f
4	Pasta/Admin	Pasi.TMaatta@outlook.com	$2b$10$PM1GOkB.mH6Y4pOl3Uzghuqnk9xZdCvAu2sBXmIo.aoCwLvSsf5WC	Ehkä kait	t
16	Siiri	Siiri123@123.com	$2b$10$p3648DqA1fZlCgOgxcwOVutgqzWh5xDHv/qRkxUX/07bMoDNZNNlq	\N	f
17	Mies	Mies@hotmail.com	$2b$10$Q5NxwzLPXbdCqOs5YqjjW.k46y3cno1K1SgUvGeQg3enyu5fri4n2	\N	f
11	123123	fedfsdfsa@outlook.com	$2b$10$E9BZNty9V3Jji6TvWH/34e9ftfooL7g3Db/vKXu9VHJbittQ2MrIC	\N	f
12	2312312213321321	dsasaddsadsaas@adsdsadsa	$2b$10$OL3yuW91wXVwVF8p8sA2luFYLRWx1R/JQZXhR4Juocduk0FUZiZIe	\N	f
\.


--
-- TOC entry 5032 (class 0 OID 0)
-- Dependencies: 221
-- Name: messages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.messages_id_seq', 104, true);


--
-- TOC entry 5033 (class 0 OID 0)
-- Dependencies: 219
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 17, true);


--
-- TOC entry 4870 (class 2606 OID 16452)
-- Name: messages messages_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (id);


--
-- TOC entry 4866 (class 2606 OID 16438)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 4868 (class 2606 OID 16436)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 4871 (class 2606 OID 16453)
-- Name: messages messages_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


-- Completed on 2025-12-02 23:10:01

--
-- PostgreSQL database dump complete
--

\unrestrict KbJtoO5QdoRGHfraP1N7pDzqvVmqLWFOTyzRnmeB9zfuWH545Qy6D9MeQuWYZS8

--
-- Database "postgres" dump
--

\connect postgres

--
-- PostgreSQL database dump
--

\restrict DZV5rSrmWLhEDyNAe2NUoWI7JLjB1sEErffgidnoVPzRk3PdncRInTtOMIro0uL

-- Dumped from database version 18.1
-- Dumped by pg_dump version 18.1

-- Started on 2025-12-02 23:10:01

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

-- Completed on 2025-12-02 23:10:01

--
-- PostgreSQL database dump complete
--

\unrestrict DZV5rSrmWLhEDyNAe2NUoWI7JLjB1sEErffgidnoVPzRk3PdncRInTtOMIro0uL

-- Completed on 2025-12-02 23:10:01

--
-- PostgreSQL database cluster dump complete
--

