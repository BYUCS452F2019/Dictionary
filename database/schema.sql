DROP TABLE Related_Words;
DROP TABLE Word;
DROP TABLE Editor;
DROP TABLE Language;

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
    definition VARCHAR(8000),
    lang_id INT,
    last_edit_id INT,
    CONSTRAINT word_fk1 FOREIGN KEY (lang_id) REFERENCES Language(lang_id),
    CONSTRAINT word_fk2 FOREIGN KEY (last_edit_id) REFERENCES Editor(editor_id)
);

CREATE TABLE Related_Words
(
    related_words_id SERIAL CONSTRAINT related_words_pk PRIMARY KEY,
    from_word INT CONSTRAINT related_words_nn1 NOT NULL,
    to_word INT CONSTRAINT related_words_nn2 NOT NULL,
    last_edit_id INT CONSTRAINT related_words_nn3 NOT NULL,
    CONSTRAINT related_words_fk1 FOREIGN KEY (from_word) REFERENCES Word(word_id),
    CONSTRAINT related_words_fk2 FOREIGN KEY (to_word) REFERENCES Word(word_id),
    CONSTRAINT related_words_fk3 FOREIGN KEY (last_edit_id) REFERENCES Editor(editor_id)
);
