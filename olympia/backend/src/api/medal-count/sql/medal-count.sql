SELECT
  "athlete"."country" AS "country",
  COUNT(
    CASE
      WHEN "sports_result"."medal" = $1 THEN 1
    END
  ) AS "gold",
  COUNT(
    CASE
      WHEN "sports_result"."medal" = $2 THEN 1
    END
  ) AS "silver",
  COUNT(
    CASE
      WHEN "sports_result"."medal" = $3 THEN 1
    END
  ) AS "bronze"
FROM
  "athlete" "athlete"
  LEFT JOIN "sports_result" "sports_result" ON "athlete"."uuid" = "sports_result"."athleteUuid"
GROUP BY
  "athlete"."country"
ORDER BY
  count (
    CASE
      WHEN "sports_result"."medal" is not null THEN 1
    END
  ) DESC,
  count (
    CASE
      WHEN "sports_result"."medal" = $1 THEN 1
    END
  ) DESC,
  count (
    CASE
      WHEN "sports_result"."medal" = $2 THEN 1
    END
  ) DESC,
  count (
    CASE
      WHEN "sports_result"."medal" = $3 THEN 1
    END
  ) DESC