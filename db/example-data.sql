-- PROCEDURE: public.insert_example_data()
-- DROP PROCEDURE IF EXISTS public.insert_example_data();
CREATE
OR REPLACE PROCEDURE public.insert_example_data() LANGUAGE 'plpgsql' AS $BODY$
DECLARE
  weitsprung_uuid uuid := '58e8f5b5-2385-4adb-a26a-ac596ad5e8eb';
  springreiten_uuid uuid := '4fb34cdc-d18c-4cf4-923c-bea8e154388b';
  lauf100m_uuid uuid := '10710a47-f1ae-4dde-8ee4-3136181532b2';
  schwimmen_uuid uuid := '247c8623-693b-42b5-90dd-3b594e3fc1f5';

  phelps_uuid uuid := '4eac578b-ff37-4a36-83b4-c4518d13bd21';
  ledecky_uuid uuid := '08432774-b7b9-41af-bc08-59471368c619';
  brash_uuid uuid := 'ba99b740-fef0-4196-ad1e-ef7e82c6238a';
  madden_uuid uuid := '06200d6e-8145-4103-a373-d3412dba5c64';
  bolt_uuid uuid := 'b1152269-278e-4c52-acef-207e6544fc89';
  fraser_pryce_uuid uuid := 'ff5731cb-5ee0-4f29-8a83-13386239ebbb';
  powell_uuid uuid := 'ffe3e8ad-6839-41e9-9cf6-44d93b4c0085';
  drechsler_uuid uuid := '505e572e-705f-49f7-ae18-52e409c36590';
BEGIN

-- Disciplines
INSERT INTO
  public.discipline(uuid, title)
VALUES
  (
    weitsprung_uuid,
    'Weitsprung'
  ),
  (
    springreiten_uuid,
    'Springreiten'
  ),
  (
    lauf100m_uuid,
    '100m-Lauf'
  ),
  (
    schwimmen_uuid,
    'Schwimmen'
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
    ledecky_uuid,
    'Katie',
    'Ledecky',
    'female',
    'USA',
    '1997-03-17',
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
    madden_uuid,
    'Beezie',
    'Madden',
    'female',
    'USA',
    '1963-11-20',
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
    fraser_pryce_uuid,
    'Shelly-Ann',
    'Fraser-Pryce',
    'female',
    'JAM',
    '1986-12-27',
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
    drechsler_uuid,
    'Heike',
    'Drechsler',
    'female',
    'DEU',
    '1964-12-16',
    weitsprung_uuid
  );

  -- Sports Results
  INSERT INTO
    public.sports_result(
      value,
      medal, 
      "athleteUuid"
    )
	VALUES
    (1.2, 'gold', phelps_uuid),
    (1.1, 'silver', ledecky_uuid),
    (1.0, 'bronze', brash_uuid),
    (0.9, 'gold', madden_uuid),
    (9.81, 'gold', bolt_uuid),
    (10.71, 'silver', fraser_pryce_uuid),
    (8.95, 'gold', powell_uuid),
    (7.14, 'silver', drechsler_uuid);
END;
$BODY$;


ALTER PROCEDURE
  public.insert_example_data() OWNER TO olympia;