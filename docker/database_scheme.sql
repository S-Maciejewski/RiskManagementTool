CREATE TABLE "user" (
  "id" serial PRIMARY KEY,
  "login" text,
  "password" text
);

CREATE TABLE "project" (
  "id" serial PRIMARY KEY,
  "name" text,
  "description" text
);

CREATE TABLE "user_project" (
  "user_id" serial,
  "project_id" serial,
  PRIMARY KEY ("user_id", "project_id")
);

CREATE TABLE "risk_register" (
  "id" serial PRIMARY KEY,
  "project_id" serial,
  "name" text,
  "description" text
);

CREATE TABLE "risk" (
  "id" serial PRIMARY KEY,
  "register_id" serial,
  "date_raised" date,
  "name" text,
  "description" text,
  "status" text,
  "impact_id" serial,
  "probability_id" serial,
  "severity_id" serial
);

CREATE TABLE "response" (
  "id" serial PRIMARY KEY,
  "risk_id" serial,
  "name" text,
  "description" text,
  "expected_result" text,
  "progress" text
);

CREATE TABLE "risk_property" (
  "id" serial PRIMARY KEY,
  "risk_id" serial,
  "name" text,
  "description" text,
  "quantiative_value" real
);

CREATE TABLE "impact" (
  "id" serial PRIMARY KEY,
  "name" text,
  "value" real
);

CREATE TABLE "probability" (
  "id" serial PRIMARY KEY,
  "name" text,
  "value" real
);

CREATE TABLE "severity" (
  "id" serial PRIMARY KEY,
  "name" text,
  "value" real
);

ALTER TABLE "risk" ADD FOREIGN KEY ("register_id") REFERENCES "risk_register" ("id");

ALTER TABLE "risk_register" ADD FOREIGN KEY ("project_id") REFERENCES "project" ("id");

ALTER TABLE "response" ADD FOREIGN KEY ("risk_id") REFERENCES "risk" ("id");

ALTER TABLE "risk" ADD FOREIGN KEY ("impact_id") REFERENCES "impact" ("id");

ALTER TABLE "risk_property" ADD FOREIGN KEY ("risk_id") REFERENCES "risk" ("id");

ALTER TABLE "risk" ADD FOREIGN KEY ("severity_id") REFERENCES "severity" ("id");

ALTER TABLE "risk" ADD FOREIGN KEY ("probability_id") REFERENCES "probability" ("id");

ALTER TABLE "user_project" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id");

ALTER TABLE "user_project" ADD FOREIGN KEY ("project_id") REFERENCES "project" ("id");