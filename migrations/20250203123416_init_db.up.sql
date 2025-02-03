CREATE TABLE players (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    nba_id INTEGER NOT NULL,
    rating INTEGER NOT NULL,
    active BOOLEAN DEFAULT true
);

CREATE TABLE results (
    id SERIAL PRIMARY KEY,
    player1 INTEGER,
    player2 INTEGER,
    result INTEGER, -- 1 or 2
    FOREIGN KEY (player1) REFERENCES players(id),
    FOREIGN KEY (player2) REFERENCES players(id)
);