import json
import os
import psycopg2


def get_user_from_token(cur, token):
    cur.execute("""
        SELECT u.id FROM sessions s
        JOIN users u ON u.id = s.user_id
        WHERE s.token = %s AND s.expires_at > NOW()
    """, (token,))
    row = cur.fetchone()
    return row[0] if row else None


def generate_lyrics_stub(prompt, genre, mood):
    """Заглушка генерации текста — будет заменена на реальный API."""
    return f"[Куплет 1]\nЗдесь будет текст песни по запросу: {prompt}\n\n[Припев]\nГенерация через ИИ будет подключена позже.\n\n[Куплет 2]\nЖанр: {genre or 'не указан'}, настроение: {mood or 'не указано'}."


def handler(event: dict, context) -> dict:
    """Создание нового трека: сохраняет запрос, генерирует текст (заглушка), возвращает трек."""
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Authorization', 'Access-Control-Max-Age': '86400'}, 'body': ''}

    headers = event.get('headers') or {}
    auth = headers.get('X-Authorization') or headers.get('Authorization') or ''
    token = auth.replace('Bearer ', '').strip()

    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()

    user_id = get_user_from_token(cur, token)
    if not user_id:
        cur.close()
        conn.close()
        return {
            'statusCode': 401,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Не авторизован'})
        }

    body = json.loads(event.get('body') or '{}')
    title = (body.get('title') or '').strip()
    prompt = (body.get('prompt') or '').strip()
    genre = (body.get('genre') or '').strip()
    mood = (body.get('mood') or '').strip()

    if not prompt:
        cur.close()
        conn.close()
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Описание трека обязательно'})
        }

    if not title:
        title = prompt[:50] + ('...' if len(prompt) > 50 else '')

    lyrics = generate_lyrics_stub(prompt, genre, mood)

    cur.execute("""
        INSERT INTO tracks (user_id, title, prompt, genre, mood, lyrics, status)
        VALUES (%s, %s, %s, %s, %s, %s, 'ready')
        RETURNING id, title, prompt, genre, mood, lyrics, audio_url, status, created_at
    """, (user_id, title, prompt, genre or None, mood or None, lyrics))

    row = cur.fetchone()
    conn.commit()
    cur.close()
    conn.close()

    track = {
        'id': row[0],
        'title': row[1],
        'prompt': row[2],
        'genre': row[3],
        'mood': row[4],
        'lyrics': row[5],
        'audio_url': row[6],
        'status': row[7],
        'created_at': row[8].isoformat()
    }

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'track': track})
    }
