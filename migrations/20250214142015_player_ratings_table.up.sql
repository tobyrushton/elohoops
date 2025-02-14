CREATE TABLE player_ratings (
    id SERIAL PRIMARY KEY,
    player INT,
    rating INT,
    ranking INT,
    day DATE DEFAULT CURRENT_DATE,
    FOREIGN KEY (player) REFERENCES players(id)
);
