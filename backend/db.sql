CREATE TABLE users(
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS  IDENTITY,
    username VARCHAR(20),
    password VARCHAR(255),
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


CREATE TABLE active_games(
     id INTEGER PRIMARY KEY GENERATED ALWAYS AS  IDENTITY,
     game_id uuid,
     board_history INT[],
     max_duration INT,
     turn_player VARCHAR(2),
     is_paused BOOLEAN,
     is_won BOOLEAN,
     counter INTEGER,
     player_one VARCHAR(20),
     player_one_score INT,
     player_one_connection VARCHAR(20),
     player_two VARCHAR(20),
     player_two_score INT,
     player_two_connection VARCHAR(20),
     created_at timestamp with time zone,
     updated_at timestamp with time zone
);
