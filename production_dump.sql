

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


CREATE EXTENSION IF NOT EXISTS "pgsodium";






COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";





SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."User" (
    "id" integer NOT NULL,
    "username" "text" NOT NULL,
    "password" "text" NOT NULL,
    "organizacion" "text" NOT NULL,
    "nombre" "text" NOT NULL,
    "apellido" "text" NOT NULL
);


ALTER TABLE "public"."User" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."User_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."User_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."User_id_seq" OWNED BY "public"."User"."id";



CREATE TABLE IF NOT EXISTS "public"."actionA1" (
    "id" integer NOT NULL,
    "nombre" "text" NOT NULL,
    "type" "text" NOT NULL,
    "fecha_inicio" timestamp(3) without time zone NOT NULL,
    "fecha_final" timestamp(3) without time zone NOT NULL,
    "localidad" "text" NOT NULL,
    "nro_participantes" integer NOT NULL,
    "nro_mujeres" integer NOT NULL,
    "nro_noid" integer NOT NULL,
    "nro_pob_ind" integer,
    "nro_pob_lgbtiq" integer NOT NULL,
    "nro_pob_rural" integer,
    "nro_pob_16_29" integer,
    "nro_lid_pob_16_29" integer NOT NULL,
    "organizacion" "text" NOT NULL,
    "tipo_localidad" "text" NOT NULL,
    "descripcion" "text" NOT NULL,
    "nombre_real" "text" NOT NULL,
    "imgUrl" "text"
);


ALTER TABLE "public"."actionA1" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."actionA1_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."actionA1_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."actionA1_id_seq" OWNED BY "public"."actionA1"."id";



ALTER TABLE ONLY "public"."User" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."User_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."actionA1" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."actionA1_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."actionA1"
    ADD CONSTRAINT "actionA1_pkey" PRIMARY KEY ("id");



CREATE UNIQUE INDEX "User_username_key" ON "public"."User" USING "btree" ("username");



ALTER TABLE "public"."User" ENABLE ROW LEVEL SECURITY;




ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";


GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";
GRANT ALL ON SCHEMA "public" TO "prisma";



































































































































































































GRANT ALL ON TABLE "public"."User" TO "anon";
GRANT ALL ON TABLE "public"."User" TO "authenticated";
GRANT ALL ON TABLE "public"."User" TO "service_role";
GRANT ALL ON TABLE "public"."User" TO "prisma";



GRANT ALL ON SEQUENCE "public"."User_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."User_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."User_id_seq" TO "service_role";
GRANT ALL ON SEQUENCE "public"."User_id_seq" TO "prisma";



GRANT ALL ON TABLE "public"."actionA1" TO "anon";
GRANT ALL ON TABLE "public"."actionA1" TO "authenticated";
GRANT ALL ON TABLE "public"."actionA1" TO "service_role";
GRANT ALL ON TABLE "public"."actionA1" TO "prisma";



GRANT ALL ON SEQUENCE "public"."actionA1_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."actionA1_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."actionA1_id_seq" TO "service_role";
GRANT ALL ON SEQUENCE "public"."actionA1_id_seq" TO "prisma";



ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "prisma";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "prisma";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "prisma";






























RESET ALL;
