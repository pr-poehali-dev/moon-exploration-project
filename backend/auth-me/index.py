import json
import os
import psycopg2


def handler(event: dict, context) -> dict:
    """Получение данных текущего авторизованного пользователя по токену."""
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type, X-User-Id, X-Auth-Token, X-Session-Id', 'Access-Control-Max-Age': '86400'}, 'body': ''}

    headers = event.get('headers') or {}
    auth_header = headers.get('X-Authorization') or headers.get('Authorization') or ''
    token = auth_header.replace('Bearer ', '').strip()

    if not token:
        return {
            'statusCode': 401,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Токен не передан'})
        }

    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()

    cur.execute("""
        SELECT u.id, u.email, u.name, u.created_at
        FROM sessions s
        JOIN users u ON u.id = s.user_id
        WHERE s.token = %s AND s.expires_at > NOW()
    """, (token,))
    row = cur.fetchone()
    cur.close()
    conn.close()

    if not row:
        return {
            'statusCode': 401,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Сессия недействительна'})
        }

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({
            'user': {
                'id': row[0],
                'email': row[1],
                'name': row[2],
                'created_at': row[3].isoformat() if row[3] else None
            }
        })
    }
