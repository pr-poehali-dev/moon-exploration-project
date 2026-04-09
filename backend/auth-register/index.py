import json
import os
import hashlib
import secrets
import psycopg2


def handler(event: dict, context) -> dict:
    """Регистрация нового пользователя по email и паролю."""
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type, X-User-Id, X-Auth-Token, X-Session-Id', 'Access-Control-Max-Age': '86400'}, 'body': ''}

    body = json.loads(event.get('body') or '{}')
    email = (body.get('email') or '').strip().lower()
    password = body.get('password') or ''
    name = (body.get('name') or '').strip()

    if not email or not password:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Email и пароль обязательны'})
        }

    if len(password) < 6:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Пароль должен быть не менее 6 символов'})
        }

    password_hash = hashlib.sha256(password.encode()).hexdigest()
    token = secrets.token_hex(32)

    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()

    cur.execute("SELECT id FROM users WHERE email = %s", (email,))
    if cur.fetchone():
        cur.close()
        conn.close()
        return {
            'statusCode': 409,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Пользователь с таким email уже существует'})
        }

    cur.execute(
        "INSERT INTO users (email, password_hash, name) VALUES (%s, %s, %s) RETURNING id",
        (email, password_hash, name or None)
    )
    user_id = cur.fetchone()[0]

    cur.execute(
        "INSERT INTO sessions (user_id, token) VALUES (%s, %s)",
        (user_id, token)
    )
    conn.commit()
    cur.close()
    conn.close()

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({
            'token': token,
            'user': {'id': user_id, 'email': email, 'name': name}
        })
    }
