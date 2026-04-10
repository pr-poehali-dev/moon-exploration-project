CREATE TABLE IF NOT EXISTS tracks (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  title VARCHAR(255) NOT NULL,
  prompt TEXT NOT NULL,
  genre VARCHAR(100),
  mood VARCHAR(100),
  lyrics TEXT,
  audio_url TEXT,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_tracks_user_id ON tracks(user_id);
