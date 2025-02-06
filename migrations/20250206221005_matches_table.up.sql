CREATE TABLE matches (
    id SERIAL PRIMARY KEY,
    player1 INTEGER,
    player2 INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (player1) REFERENCES players(id),
    FOREIGN KEY (player2) REFERENCES players(id)
);