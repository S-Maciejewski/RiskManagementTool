CREATE TABLE "user" (
  "id" id,
  "login" text,
  "password" text
);

CREATE TABLE "project" (
  "id" id,
  "name" text,
  "description" text
);

CREATE TABLE "user_project" (
  "user_id" id,
  "project_id" id
);

CREATE TABLE "risk_register" (
  "id" id,
  "project_id" id,
  "name" text,
  "description" text
);

CREATE TABLE "risk" (
  "id" id,
  "register_id" id,
  "name" text,
  "description" text,
  "prority_id" id,
  "probability_id" id
);

CREATE TABLE "response" (
  "id" id,
  "risk_id" id,
  "name" text,
  "description" text,
  "expected_result" text
);

CREATE TABLE "risk_property" (
  "id" id,
  "risk_id" id,
  "name" text,
  "description" text,
  "quantiative_value" number
);

CREATE TABLE "priority" (
  "id" id,
  "name" text,
  "value" number
);

CREATE TABLE "probability" (
  "id" id,
  "name" text,
  "value" number
);

ALTER TABLE "risk" ADD FOREIGN KEY ("register_id") REFERENCES "risk_register" ("id");

ALTER TABLE "risk_register" ADD FOREIGN KEY ("project_id") REFERENCES "project" ("id");

ALTER TABLE "response" ADD FOREIGN KEY ("risk_id") REFERENCES "risk" ("id");

ALTER TABLE "project" ADD FOREIGN KEY ("id") REFERENCES "user_project" ("project_id");

ALTER TABLE "user" ADD FOREIGN KEY ("id") REFERENCES "user_project" ("user_id");

ALTER TABLE "risk" ADD FOREIGN KEY ("prority_id") REFERENCES "priority" ("id");

ALTER TABLE "probability" ADD FOREIGN KEY ("id") REFERENCES "risk" ("probability_id");

ALTER TABLE "risk" ADD FOREIGN KEY ("id") REFERENCES "risk_property" ("risk_id");
