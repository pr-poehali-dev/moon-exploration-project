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


def handler(event: dict, context) -> dict:
    """Получение списка треков текущего пользователя."""
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

    cur.execute("""
        SELECT id, title, prompt, genre, mood, lyrics, audio_url, status, created_at
        FROM tracks
        WHERE user_id = %s
        ORDER BY created_at DESC
        LIMIT 50
    """, (user_id,))

    rows = cur.fetchall()
    cur.close()
    conn.close()

    tracks = [
        {
            'id': r[0],
            'title': r[1],
            'prompt': r[2],
            'genre': r[3],
            'mood': r[4],
            'lyrics': r[5],
            'audio_url': r[6],
            'status': r[7],
            'created_at': r[8].isoformat()
        }
        for r in rows
    ]

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'tracks': tracks})
    }
