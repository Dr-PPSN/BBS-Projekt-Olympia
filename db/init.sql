CREATE TABLE IF NOT EXISTS public.nutzer
(
    uuid uuid NOT NULL DEFAULT uuid_generate_v4(),
    vorname character varying COLLATE pg_catalog."default" NOT NULL,
    nachname character varying COLLATE pg_catalog."default" NOT NULL,
    email character varying COLLATE pg_catalog."default" NOT NULL,
    passwort character varying COLLATE pg_catalog."default",
    salt character varying COLLATE pg_catalog."default",
    "istAdmin" boolean NOT NULL DEFAULT false,
    CONSTRAINT "PK_cb1413b490302c8b9a18d0640b0" PRIMARY KEY (uuid),
    CONSTRAINT nutzer_unique_contraint UNIQUE (email)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.nutzer
    OWNER to olympia;