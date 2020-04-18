-- Needed to generate uuid
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TABLE IF EXISTS users ;
DROP TABLE IF EXISTS templates;
DROP TABLE IF EXISTS checklists;
DROP TABLE IF EXISTS checklist_task;
DROP TABLE IF EXISTS template_task;
DROP TABLE IF EXISTS user_template;

CREATE TABLE users (
    id uuid DEFAULT uuid_generate_v4(),
    email VARCHAR (355) UNIQUE NOT NULL,
    password VARCHAR NOT NULL,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT (NOW() AT TIME ZONE 'utc'),
    PRIMARY KEY (id)
);

CREATE TABLE templates (
    id uuid DEFAULT uuid_generate_v4(),
    name VARCHAR (355) NOT NULL,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT (NOW() AT TIME ZONE 'utc'),
    PRIMARY KEY (id)
);

CREATE TABLE checklists (
    id uuid DEFAULT uuid_generate_v4(),
    name VARCHAR (355) NOT NULL,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT (NOW() AT TIME ZONE 'utc'),
    PRIMARY KEY (id)
);

CREATE TABLE checklist_task (
    id uuid DEFAULT uuid_generate_v4(),
    text VARCHAR (355) NOT NULL,
    parent_task uuid,
    completed boolean,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT (NOW() AT TIME ZONE 'utc'),
    checklist_id uuid REFERENCES checklists (id),
    PRIMARY KEY (id)
);

CREATE TABLE template_task (
    id uuid DEFAULT uuid_generate_v4(),
    text VARCHAR (355) NOT NULL,
    parent_task uuid,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT (NOW() AT TIME ZONE 'utc'),
    template_id uuid REFERENCES templates (id),
    PRIMARY KEY (id)
);

CREATE TABLE user_template (
    user_id uuid REFERENCES users (id),
    template_id uuid REFERENCES templates (id),
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT (NOW() AT TIME ZONE 'utc'),
    PRIMARY KEY (user_id, template_id)
);