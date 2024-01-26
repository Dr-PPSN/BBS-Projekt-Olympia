-- PROCEDURE: public.insert_example_data()
-- DROP PROCEDURE IF EXISTS public.insert_example_data();
CREATE
OR REPLACE PROCEDURE public.insert_example_data() LANGUAGE 'plpgsql' AS $BODY$
DECLARE
  weitsprung_uuid uuid := '58e8f5b5-2385-4adb-a26a-ac596ad5e8eb';
  springreiten_uuid uuid := '4fb34cdc-d18c-4cf4-923c-bea8e154388b';
  lauf100m_uuid uuid := '10710a47-f1ae-4dde-8ee4-3136181532b2';
  schwimmen_uuid uuid := '247c8623-693b-42b5-90dd-3b594e3fc1f5';

  -- Schwimmen
    -- Männer
    phelps_uuid uuid := '4eac578b-ff37-4a36-83b4-c4518d13bd21';
    spitz_uuid uuid := '3d29a8f6-8ec0-4a7d-a6b4-1c9ab3e7dcd9';
    thorpe_uuid uuid := 'a9b6b5e0-dadf-4b9c-9b9a-5c9b9e4b9c9a';
    popov_uuid uuid := '98a1d0c3-f2e4-45bb-9de3-7c8e4a5d8e9a';
    -- Frauen
    ledecky_uuid uuid := '08432774-b7b9-41af-bc08-59471368c619';
    coughlin_uuid uuid := 'd17fc67b-2a99-4e81-b041-7d9c8f0b8a6d';
    otto_uuid uuid := 'c9b6b5e0-5b9e-4b9c-9b9a-5c9b9e4b9c9a';
    mingxia_uuid uuid := 'a5d4e5b6-9c8a-4b9e-9d8c-6a7c8f4d5a9e';

  -- Springreiten
    -- Männer
    brash_uuid uuid := 'ba99b740-fef0-4196-ad1e-ef7e82c6238a';
    beerbaum_uuid uuid := '6a9c5d4e-8b7a-4c8d-b3e2-1a8b9c4d3e2a';
    lamaze_uuid uuid := 'f1e2d3c4-5b6a-9c8d-b3e2-1e2d3f4a5b6a';
    pessoa_uuid uuid := '8d9c7a6b-2e3d-5a4b-8c7d-9a1b2c3d4e5f';
    -- Frauen
    madden_uuid uuid := '06200d6e-8145-4103-a373-d3412dba5c64';
    michaels_beerbaum_uuid uuid := '1b2a3c4d-6e5f-9a8b-7c8d-2e35f4a5b6c7';
    leprevost_uuid uuid := '3f4ef5d6-7c8b-9a1b-2c3d-4e5f66a7b8c9';
    kraut_uuid uuid := '9a8b7c6d-5e4f-3d2c-1b9a-8f7e69d5c4b3';

  -- Lauf 100m
    -- Männer
    bolt_uuid uuid := 'b1152269-278e-4c52-acef-207e6544fc89';
    gay_uuid uuid := '2c1b37e4-8a9b-7c6d-5e4f-9a8b7ce6d5e4';
    gatlin_uuid uuid := '7ab8a96c-3e4f-2d1c-5b6a-8d9c7db8a9d6';
    blake_uuid uuid := '1c2d32e4-7b8a-9d6c-5b6a-8d9c7b08a9d6';
    -- Frauen
    fraser_pryce_uuid uuid := 'ff5731cb-5ee0-4f29-8a83-13386239ebbb';
    griffith_joyner_uuid uuid := '6d5c4fb3-1a2b-3c4d-8a9b-7c8d9a1fb2c3';
    jeter_uuid uuid := '8b7c6df5-9a1b-2c3d-4e5f-7c8b9a1b2c3f';
    jones_uuid uuid := '4e5f6af7-8d9c-2b3a-7c8d-1e2d3c4fb5af';
  
  -- Weitsprung
    -- Männer
    powell_uuid uuid := '5e4fe6a7-8b9a-1c2d-3e4f-7c8d9a1eb2c3';
    beamon_uuid uuid := '8a9b7c6e-1d2e-3f4e-5d6c-7b8a9d6c5eb4';
    lewis_uuid uuid := '3fe4e5d6-7c8b-9a1b-2c3d-4e5f6a7b8ec9';
    pedroso_uuid uuid := '7c8de9a1-3b4c-2d1e-5f6a-7b8c9d5ee4f3';
    -- Frauen
    drechsler_uuid uuid := '505e572e-705f-49f7-ae18-52e409c36590';
    chistyakova_uuid uuid := '12d1c3e4-8b7a-9d6c-5e4f-1a12bd3c4d5e';
    joyner_kersee_uuid uuid := '1b2c23d4-5e4f-7c8b-9a1b-2c32d34e5f6a';
    reese_uuid uuid := '5d4e5f62-7c8b-9a1b-2c3d-4e5f62a7b8c9';
BEGIN

-- Disciplines
INSERT INTO
  public.discipline(uuid, title, "routeParameter")
VALUES
  (
    weitsprung_uuid,
    'Weitsprung',
    'weitsprung'
  ),
  (
    springreiten_uuid,
    'Springreiten',
    'springreiten'
  ),
  (
    lauf100m_uuid,
    '100m-Lauf',
    '100m-lauf'
  ),
  (
    schwimmen_uuid,
    'Schwimmen',
    'schwimmen'
  );

-- Athletes
INSERT INTO
  public.athlete(
    uuid,
    "firstName",
    "lastName",
    gender,
    country,
    "birthDate",
    "disciplineUuid"
  )
VALUES
  (
    phelps_uuid,
    'Michael',
    'Phelps',
    'male',
    'USA',
    '1985-06-30',
    schwimmen_uuid
  ),
  (
    spitz_uuid,
    'Mark',
    'Spitz',
    'male',
    'USA',
    '1950-02-10',
    schwimmen_uuid
  ),
  (
    thorpe_uuid,
    'Ian',
    'Thorpe',
    'male',
    'AUS',
    '1982-10-13',
    schwimmen_uuid
  ),
  (
    popov_uuid,
    'Alexander',
    'Popov',
    'male',
    'RUS',
    '1971-11-16',
    schwimmen_uuid
  ),
  (
    ledecky_uuid,
    'Katie',
    'Ledecky',
    'female',
    'USA',
    '1997-03-17',
    schwimmen_uuid
  ),
  (
    coughlin_uuid,
    'Natalie',
    'Coughlin',
    'female',
    'USA',
    '1982-08-23',
    schwimmen_uuid
  ),
  (
    otto_uuid,
    'Kristin',
    'Otto',
    'female',
    'DEU',
    '1966-02-07',
    schwimmen_uuid
  ),
  (
    mingxia_uuid,
    'Fu',
    'Mingxia',
    'female',
    'CHN',
    '1978-10-16',
    schwimmen_uuid
  ),
  (
    brash_uuid,
    'Scott',
    'Brash',
    'male',
    'GBR',
    '1985-12-05',
    springreiten_uuid
  ),
  (
    beerbaum_uuid,
    'Ludger',
    'Beerbaum',
    'male',
    'DEU',
    '1963-08-26',
    springreiten_uuid
  ),
  (
    lamaze_uuid,
    'Eric',
    'Lamaze',
    'male',
    'CAN',
    '1968-04-17',
    springreiten_uuid
  ),
  (
    pessoa_uuid,
    'Rodrigo',
    'Pessoa',
    'male',
    'BRA',
    '1972-11-29',
    springreiten_uuid
  ),
  (
    madden_uuid,
    'Beezie',
    'Madden',
    'female',
    'USA',
    '1963-11-20',
    springreiten_uuid
  ),
  (
    michaels_beerbaum_uuid,
    'Meredith',
    'Michaels-Beerbaum',
    'female',
    'DEU',
    '1969-12-26',
    springreiten_uuid
  ),
  (
    leprevost_uuid,
    'Pénélope',
    'Leprévost',
    'female',
    'FRA',
    '1980-08-01',
    springreiten_uuid
  ),
  (
    kraut_uuid,
    'Laura',
    'Kraut',
    'female',
    'USA',
    '1965-11-14',
    springreiten_uuid
  ),
  (
    bolt_uuid,
    'Usain',
    'Bolt',
    'male',
    'JAM',
    '1986-08-21',
    lauf100m_uuid
  ),
  (
    gay_uuid,
    'Tyson',
    'Gay',
    'male',
    'USA',
    '1982-08-09',
    lauf100m_uuid
  ),
  (
    gatlin_uuid,
    'Justin',
    'Gatlin',
    'male',
    'USA',
    '1982-02-10',
    lauf100m_uuid
  ),
  (
    blake_uuid,
    'Yohan',
    'Blake',
    'male',
    'JAM',
    '1989-12-26',
    lauf100m_uuid
  ),
  (
    fraser_pryce_uuid,
    'Shelly-Ann',
    'Fraser-Pryce',
    'female',
    'JAM',
    '1986-12-27',
    lauf100m_uuid
  ),
  (
    griffith_joyner_uuid,
    'Florence',
    'Griffith-Joyner',
    'female',
    'USA',
    '1959-12-21',
    lauf100m_uuid
  ),
  (
    jeter_uuid,
    'Carmelita',
    'Jeter',
    'female',
    'USA',
    '1979-11-24',
    lauf100m_uuid
  ),
  (
    jones_uuid,
    'Marion',
    'Jones',
    'female',
    'USA',
    '1975-10-12',
    lauf100m_uuid
  ),
  (
    powell_uuid,
    'Mike',
    'Powell',
    'male',
    'USA',
    '1963-11-10',
    weitsprung_uuid
  ),
  (
    beamon_uuid,
    'Bob',
    'Beamon',
    'male',
    'USA',
    '1946-08-29',
    weitsprung_uuid
  ),
  (
    lewis_uuid,
    'Carl',
    'Lewis',
    'male',
    'USA',
    '1961-07-01',
    weitsprung_uuid
  ),
  (
    pedroso_uuid,
    'Ivan',
    'Pedroso',
    'male',
    'CUB',
    '1972-12-17',
    weitsprung_uuid
  ),
  (
    drechsler_uuid,
    'Heike',
    'Drechsler',
    'female',
    'DEU',
    '1964-12-16',
    weitsprung_uuid
  ),
  (
    chistyakova_uuid,
    'Galina',
    'Chistyakova',
    'female',
    'URS',
    '1962-06-26',
    weitsprung_uuid
  ),
  (
    joyner_kersee_uuid,
    'Jackie',
    'Joyner-Kersee',
    'female',
    'USA',
    '1962-03-03',
    weitsprung_uuid
  ),
  (
    reese_uuid,
    'Brittney',
    'Reese',
    'female',
    'USA',
    '1986-09-09',
    weitsprung_uuid
  )
  ;

  -- Sports Results
  INSERT INTO
    public.sports_result(
      value,
      medal, 
      "athleteUuid"
    )
	VALUES
  -- Schwimmen
    (47.32, 'gold', phelps_uuid),
    (47.53, 'silver', spitz_uuid),
    (49.10, 'bronze', thorpe_uuid),
    (51.33, null, popov_uuid),
    (52.43, 'gold', ledecky_uuid),
    (53.33, 'silver', coughlin_uuid),
    (58.12, 'bronze', otto_uuid),
    (64.14, null, mingxia_uuid),
  -- Springreiten
    (0, 'gold', brash_uuid),
    (1, 'silver', beerbaum_uuid),
    (1, 'bronze', lamaze_uuid),
    (3, null, pessoa_uuid),
    (1, 'gold', madden_uuid),
    (2, 'silver', michaels_beerbaum_uuid),
    (3, 'bronze', leprevost_uuid),
    (4, null, kraut_uuid),
  -- Lauf 100m
    (9.58, 'gold', bolt_uuid),
    (9.69, 'silver', gay_uuid),
    (9.74, 'bronze', gatlin_uuid),
    (9.75, null, blake_uuid),
    (10.70, 'gold', fraser_pryce_uuid),
    (10.78, 'silver', griffith_joyner_uuid),
    (10.92, 'bronze', jeter_uuid),
    (10.99, null, jones_uuid),
  -- Weitsprung
    (8.95, 'gold', powell_uuid),
    (8.90, 'silver', beamon_uuid),
    (8.87, 'bronze', lewis_uuid),
    (8.71, null, pedroso_uuid),
    (7.40, 'gold', drechsler_uuid),
    (7.36, 'silver', chistyakova_uuid),
    (7.29, 'bronze', joyner_kersee_uuid),
    (7.15, null, reese_uuid);
END;
$BODY$;


ALTER PROCEDURE
  public.insert_example_data() OWNER TO olympia;