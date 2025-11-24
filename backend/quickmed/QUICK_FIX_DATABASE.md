# 🚀 Quick Fix: PostgreSQL Database Connection

## ⚡ Fastest Solution

### 1. Find Your PostgreSQL Password
- Check if you remember your PostgreSQL installation password
- Or check if you saved it somewhere during installation

### 2. Update settings.py
Open `backend/quickmed/quickmed/settings.py` and change line 95:

**BEFORE:**
```python
'PASSWORD': os.getenv('DB_PASSWORD', 'postgres'),
```

**AFTER (replace with YOUR password):**
```python
'PASSWORD': os.getenv('DB_PASSWORD', 'YOUR_ACTUAL_PASSWORD_HERE'),
```

### 3. Test Connection
```bash
cd backend/quickmed
python manage.py migrate
```

If it works, you're done! ✅

If it still fails, see FIX_DATABASE.md for detailed solutions.

## 🔄 Alternative: Use SQLite Temporarily

If you can't connect to PostgreSQL right now, you can use SQLite temporarily:

1. In `settings.py`, comment out PostgreSQL config and uncomment SQLite:

```python
# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.postgresql',
#         ...
#     }
# }

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}
```

2. Run migrations:
```bash
python manage.py migrate
```

3. All data will be saved to `db.sqlite3` file
4. Switch back to PostgreSQL later when ready

## ✅ Verify Data is Being Saved

After signup, check:

**For SQLite:**
```bash
python manage.py shell
>>> from home.models import User, Vendor
>>> User.objects.all()
>>> Vendor.objects.all()
```

**For PostgreSQL:**
```sql
psql -U postgres -d quickmed_db
SELECT * FROM home_user;
SELECT * FROM home_vendor;
```

