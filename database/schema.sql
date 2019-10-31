-- Completely destroy database and build it up again

DROP TABLE Related_Word;
DROP TABLE Word;
DROP TABLE Editor;
DROP TABLE Language;

--------------------------------------------------------------
--------------------- SCHEMA DEFINITION ----------------------
--------------------------------------------------------------

CREATE TABLE Language
(
    lang_id SERIAL CONSTRAINT language_pk PRIMARY KEY,
    lang VARCHAR(80) CONSTRAINT language_nn1 NOT NULL,
    CONSTRAINT language_un1 UNIQUE (lang)
);

CREATE TABLE Editor
(
    editor_id SERIAL CONSTRAINT user_pk PRIMARY KEY,
    name VARCHAR(500) CONSTRAINT user_nn1 NOT NULL,
    CONSTRAINT user_un1 UNIQUE (name)
);

CREATE TABLE Word
(
    word_id SERIAL CONSTRAINT word_pk PRIMARY KEY,
    word VARCHAR(100) CONSTRAINT word_nn1 NOT NULL,
    lang_id INT NOT NULL,
    created_by_id INT NOT NULL,
    last_edit_id INT,
    CONSTRAINT word_fk1 FOREIGN KEY (lang_id) REFERENCES Language(lang_id),
    CONSTRAINT word_fk2 FOREIGN KEY (created_by_id) REFERENCES Editor(editor_id),
    CONSTRAINT word_fk3 FOREIGN KEY (last_edit_id) REFERENCES Editor(editor_id)
);

CREATE TABLE Related_Word
(
    related_word_id SERIAL CONSTRAINT related_word_pk PRIMARY KEY,
    from_word INT CONSTRAINT related_word_nn1 NOT NULL,
    to_word INT CONSTRAINT related_word_nn2 NOT NULL,
    last_edit_id INT CONSTRAINT related_word_nn3 NOT NULL,
    CONSTRAINT related_word_fk1 FOREIGN KEY (from_word) REFERENCES Word(word_id),
    CONSTRAINT related_word_fk2 FOREIGN KEY (to_word) REFERENCES Word(word_id),
    CONSTRAINT related_word_fk3 FOREIGN KEY (last_edit_id) REFERENCES Editor(editor_id)
);

--------------------------------------------------------------
--------------------------- EDITOR ---------------------------
--------------------------------------------------------------

INSERT INTO Editor VALUES
(
    DEFAULT,
    'Multi-Lingual Dictionary'
);

--------------------------------------------------------------
------------------------- LANGUAGES --------------------------
--------------------------------------------------------------

INSERT INTO Language VALUES
(
    DEFAULT,
    'English'
);

INSERT INTO Language VALUES
(
    DEFAULT,
    'Spanish'
);

INSERT INTO Language VALUES
(
    DEFAULT,
    'Portuguese'
);

INSERT INTO Language VALUES
(
    DEFAULT,
    'French'
);

--------------------------------------------------------------
---------------------------- WORDS ---------------------------
--------------------------------------------------------------

INSERT INTO Word VALUES
(
    DEFAULT,
    'hello',
    (Select lang_id FROM Language WHERE lang = 'English'),
    (Select editor_id FROM Editor WHERE name = 'Multi-Lingual Dictionary'),
    (Select editor_id FROM Editor WHERE name = 'Multi-Lingual Dictionary')
);

INSERT INTO Word VALUES
(
    DEFAULT,
    'bonjour',
    (Select lang_id FROM Language WHERE lang = 'French'),
    (Select editor_id FROM Editor WHERE name = 'Multi-Lingual Dictionary'),
    (Select editor_id FROM Editor WHERE name = 'Multi-Lingual Dictionary')
);

INSERT INTO Word VALUES
(
    DEFAULT,
    'hola',
    (Select lang_id FROM Language WHERE lang = 'Spanish'),
    (Select editor_id FROM Editor WHERE name = 'Multi-Lingual Dictionary'),
    (Select editor_id FROM Editor WHERE name = 'Multi-Lingual Dictionary')
);

INSERT INTO Word VALUES
(
    DEFAULT,
    'olá',
    (Select lang_id FROM Language WHERE lang = 'Portuguese'),
    (Select editor_id FROM Editor WHERE name = 'Multi-Lingual Dictionary'),
    (Select editor_id FROM Editor WHERE name = 'Multi-Lingual Dictionary')
);

--------------------------------------------------------------
--------------------- RELATED WORDS --------------------------
--------------------------------------------------------------

INSERT INTO Related_Word VALUES
(
    DEFAULT,
    1,
    2,
    (Select editor_id FROM Editor WHERE name = 'Multi-Lingual Dictionary')   
);

INSERT INTO Related_Word VALUES
(
    DEFAULT,
    1,
    3,
    (Select editor_id FROM Editor WHERE name = 'Multi-Lingual Dictionary')   
);

INSERT INTO Related_Word VALUES
(
    DEFAULT,
    1,
    4,
    (Select editor_id FROM Editor WHERE name = 'Multi-Lingual Dictionary')   
);

INSERT INTO Related_Word VALUES
(
    DEFAULT,
    2,
    1,
    (Select editor_id FROM Editor WHERE name = 'Multi-Lingual Dictionary')   
);

INSERT INTO Related_Word VALUES
(
    DEFAULT,
    2,
    3,
    (Select editor_id FROM Editor WHERE name = 'Multi-Lingual Dictionary')   
);

INSERT INTO Related_Word VALUES
(
    DEFAULT,
    2,
    4,
    (Select editor_id FROM Editor WHERE name = 'Multi-Lingual Dictionary')   
);

INSERT INTO Related_Word VALUES
(
    DEFAULT,
    3,
    1,
    (Select editor_id FROM Editor WHERE name = 'Multi-Lingual Dictionary')   
);

INSERT INTO Related_Word VALUES
(
    DEFAULT,
    3,
    2,
    (Select editor_id FROM Editor WHERE name = 'Multi-Lingual Dictionary')   
);

INSERT INTO Related_Word VALUES
(
    DEFAULT,
    3,
    4,
    (Select editor_id FROM Editor WHERE name = 'Multi-Lingual Dictionary')   
);

INSERT INTO Related_Word VALUES
(
    DEFAULT,
    4,
    1,
    (Select editor_id FROM Editor WHERE name = 'Multi-Lingual Dictionary')   
);

INSERT INTO Related_Word VALUES
(
    DEFAULT,
    4,
    2,
    (Select editor_id FROM Editor WHERE name = 'Multi-Lingual Dictionary')   
);

INSERT INTO Related_Word VALUES
(
    DEFAULT,
    4,
    3,
    (Select editor_id FROM Editor WHERE name = 'Multi-Lingual Dictionary')   
);