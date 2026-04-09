import json
import os
import hashlib
import secrets
import psycopg2


def handler(event: dict, context) -> dict:
    """Авторизация пользователя по email и паролю."""
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type, X-User-Id, X-Auth-Token, X-Session-Id', 'Access-Control-Max-Age': '86400'}, 'body': ''}

    body = json.loads(event.get('body') or '{}')
    email = (body.get('email') or '').strip().lower()
    password = body.get('password') or ''

    if not email or not password:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Email и пароль обязательны'})
        }

    password_hash = hashlib.sha256(password.encode()).hexdigest()

    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()

    cur.execute(
        "SELECT id, email, name FROM users WHERE email = %s AND password_hash = %s",
        (email, password_hash)
    )
    user = cur.fetchone()

    if not user:
        cur.close()
        conn.close()
        return {
            'statusCode': 401,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Неверный email или пароль'})
        }

    token = secrets.token_hex(32)
    cur.execute(
        "INSERT INTO sessions (user_id, token) VALUES (%s, %s)",
        (user[0], token)
    )
    conn.commit()
    cur.close()
    conn.close()

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({
            'token': token,
            'user': {'id': user[0], 'email': user[1], 'name': user[2]}
        })
    }
