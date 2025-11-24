# Fix Database Connection Issues

## ⚠️ Current Issue
PostgreSQL connection is failing. Follow these steps to fix:

## 🔧 Step-by-Step Fix

### Option 1: Update Password in settings.py (Quick Fix)

1. Open `backend/quickmed/quickmed/settings.py`
2. Find the DATABASES section (around line 79)
3. Update the PASSWORD field with your actual PostgreSQL password:

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'quickmed_db',
        'USER': 'postgres',
        'PASSWORD': 'YOUR_ACTUAL_POSTGRES_PASSWORD',  # ← Change this
        'HOST': 'localhost',
        'PORT': '5432',
    }
}
```

### Option 2: Use Environment Variables (Recommended)

1. Create `.env` file in `backend/quickmed/`:
```bash
cd backend/quickmed
copy .env.example .env
```

2. Edit `.env` and add your PostgreSQL password:
```
DB_PASSWORD=your_actual_password
```

3. Install python-dotenv:
```bash
pip install python-dotenv
```

### Option 3: Reset PostgreSQL Password

If you forgot your PostgreSQL password:

1. Open Command Prompt as Administrator
2. Stop PostgreSQL service:
```bash
net stop postgresql-x64-XX  # Replace XX with your version
```

3. Edit `pg_hba.conf` (usually in `C:\Program Files\PostgreSQL\XX\data\`)
   - Change `md5` to `trust` for local connections
   - Save and restart PostgreSQL

4. Connect without password:
```bash
psql -U postgres
```

5. Reset password:
```sql
ALTER USER postgres WITH PASSWORD 'newpassword';
```

6. Change `pg_hba.conf` back to `md5`
7. Restart PostgreSQL

### Option 4: Create New PostgreSQL User

```sql
-- Connect as postgres
psql -U postgres

-- Create new user
CREATE USER quickmed_user WITH PASSWORD 'your_password';

-- Create database
CREATE DATABASE quickmed_db;

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE quickmed_db TO quickmed_user;

-- Update settings.py to use quickmed_user instead of postgres
```

## ✅ Verify Connection

After fixing credentials, test connection:

```bash
cd backend/quickmed
python check_database.py
```

Or run migrations:
```bash
python manage.py migrate
```

## 🔍 Check if PostgreSQL is Running

**Windows:**
```bash
# Check service status
sc query postgresql-x64-XX

# Start service if stopped
net start postgresql-x64-XX
```

**Or use Services:**
1. Press `Win + R`
2. Type `services.msc`
3. Find PostgreSQL service
4. Right-click → Start (if stopped)

## 📝 Quick Test

Test PostgreSQL connection directly:

```bash
psql -U postgres -d quickmed_db
```

If this works, the issue is in Django settings.
If this fails, the issue is with PostgreSQL setup.

## 🎯 After Fixing

Once connection works:

1. Run migrations:
```bash
python manage.py migrate
```

2. Create superuser (optional):
```bash
python manage.py createsuperuser
```

3. Test signup from frontend
4. Check database:
```sql
SELECT * FROM home_user;
SELECT * FROM home_vendor;
```

## 💡 Common Issues

**Issue: "password authentication failed"**
- Solution: Update password in settings.py or .env file

**Issue: "database does not exist"**
- Solution: Create database: `CREATE DATABASE quickmed_db;`

**Issue: "connection refused"**
- Solution: Check if PostgreSQL service is running

**Issue: "permission denied"**
- Solution: Grant privileges to user

