# PleasantFeeldar
Website for youtube personality Pleasant Ildar, created during a hackathon by a "Team 21" a.k.a. "Blackjack"
## создать базу данных postgreSQL, с данными которрые в settings.py:
```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 
        'USER': 
        'PASSWORD':
        'HOST': 
        'PORT':
    }
} 
```

сделать миграции:

```python
python manage.py migrate
```
после этого уже созданные данные в БД должны загрузится на ваш локальный сервер.

если этого не произошло,примените резервную копию backup_file.sql:
```python
pg_restore -h localhost -U admin -d ildar backup.sql
```


### Для установки викторины выполнить миграции:
```python
python manage.py makemigrations
```
```python
python manage.py migrate
```


## потом выполнить команду(для ОС Linux/Mac):
```python
export DJANGO_SETTINGS_MODULE=feeldar.settings
python load_data.py
```
## Для Windows:
```python
set DJANGO_SETTINGS_MODULE=feeldar.settings
python load_data.py
```

## эта команда запустит скрипт, который заполнит базу данных вопросами и ответами к викторине
