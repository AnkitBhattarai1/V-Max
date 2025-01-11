
CREATE TABLE video ( 
    id VARCHAR(36) PRIMARY KEY,
    title JSON NOT NULL,
    description JSON ,
    original_video_url VARCHAR(512) NOT NULL,
    thumbnail_url VARCHAR(512),
    trailer_url VARCHAR(512),
    release_date DATE,
    duration INT,
    type ENUM('movie', 'episode', 'trailer', 'documentary') NOT NULL,
    age_rating VARCHAR(10),
    language VARCHAR(50),
    status ENUM('ready', 'transcoding', 'error') DEFAULT 'ready',
    metadata JSON
);



CREATE TABLE series (
    id VARCHAR(36) PRIMARY KEY, 
    title JSON,                
    description JSON,         
    total_seasons INT,       
    ongoing BOOLEAN,        
    thumbnail_url VARCHAR(512),            
    metadata JSON                          
);

CREATE TABLE season (
    id VARCHAR(36) PRIMARY KEY,           
    series_id VARCHAR(36),               
    season_number INT,                  
    release_date DATE,                    -- Release date of the season.
    metadata JSON,                        -- Flexible metadata for the season.

    FOREIGN KEY (series_id) REFERENCES series(id) -- Foreign key constraint.
);
CREATE TABLE episode (
    id VARCHAR(36) PRIMARY KEY,                -- Unique identifier for the episode.
    season_id VARCHAR(36),                     -- Foreign key to the season table.
    video_id VARCHAR(36),                      -- Foreign key to the video table.
    episode_number INT,                   -- Episode number within the season.
    release_date DATE,                    -- Release date of the episode.

    FOREIGN KEY (season_id) REFERENCES season(id),  -- Foreign key constraint to seasons.
    FOREIGN KEY (video_id) REFERENCES video(id)     -- Foreign key constraint to video.
);


-- Create the Genre table
CREATE TABLE genre (
    id VARCHAR(36) PRIMARY KEY NOT NULL, -- Unique ID for each genre
    name VARCHAR(255) NOT NULL UNIQUE     -- Name of the genre (e.g., Action, Drama)
);


-- Create the Movie table
CREATE TABLE movie (
    id VARCHAR(36) PRIMARY KEY,            -- Unique identifier for the movie.
    video_id VARCHAR(36) NOT NULL,         -- Foreign key to the Video table.
    director VARCHAR(255),                 -- Director of the movie.
    cast JSON,                             -- JSON array of cast members.
    metadata JSON,                         -- Flexible metadata for the movie.
    
    FOREIGN KEY (video_id) REFERENCES video(id) -- Foreign key constraint to the Video table.
);

-- Create the Movie-Genre Mapping table
CREATE TABLE movie_genre_mapping (
    movie_id VARCHAR(36) NOT NULL,         -- Foreign key from Movie table.
    genre_id VARCHAR(36) NOT NULL,         -- Foreign key from Genre table.
    
    PRIMARY KEY (movie_id, genre_id),      -- Composite primary key.
    FOREIGN KEY (movie_id) REFERENCES movie(id) ON DELETE CASCADE,
    FOREIGN KEY (genre_id) REFERENCES genre(id) ON DELETE CASCADE
);
-- Create the mapping table for Series and Genre
CREATE TABLE series_genre_mapping(
    series_id VARCHAR(36) NOT NULL,         -- Foreign key from Series table
    genre_id VARCHAR(36) NOT NULL,-- Foreign key from Genre table
    
    PRIMARY KEY (series_id, genre_id), -- Composite primary key
    FOREIGN KEY (series_id) REFERENCES Series(id) ON DELETE CASCADE,
    FOREIGN KEY (genre_id) REFERENCES Genre(id) ON DELETE CASCADE
);


CREATE TABLE movie_genre_mapping();


