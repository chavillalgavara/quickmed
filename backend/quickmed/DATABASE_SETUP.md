# PostgreSQL Database Setup for QuickMed

## 🔧 Quick Setup Guide

### Step 1: Install PostgreSQL
If not installed, download from: https://www.postgresql.org/download/

### Step 2: Create Database
Open PostgreSQL command line (psql) or pgAdmin and run:

```sql
-- Connect as postgres superuser
psql -U postgres

-- Create database
CREATE DATABASE quickmed_db;

-- Verify database created
\l
```

### Step 3: Update Database Credentials

Edit `backend/quickmed/quickmed/settings.py` and update the DATABASES configuration:

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'quickmed_db',           # Your database name
        'USER': 'postgres',               # Your PostgreSQL username
        'PASSWORD': 'YOUR_PASSWORD',      # Your PostgreSQL password
        'HOST': 'localhost',
        'PORT': '5432',
    }
}
```

**OR** use environment variables (recommended):

1. Create `.env` file in `backend/quickmed/`:
```
DB_NAME=quickmed_db
DB_USER=postgres
DB_PASSWORD=your_password_here
DB_HOST=localhost
DB_PORT=5432
```

2. Update settings.py to read from environment variables (see below)

### Step 4: Run Migrations
```bash
cd backend/quickmed
python manage.py migrate
```

### Step 5: Verify Connection
```bash
python check_database.py
```

## 🔍 Troubleshooting

### Password Authentication Failed
- Check your PostgreSQL password
- Try resetting password: `ALTER USER postgres WITH PASSWORD 'newpassword';`
- Check `pg_hba.conf` file for authentication settings

### Database Doesn't Exist
```sql
CREATE DATABASE quickmed_db;
```

### Connection Refused
- Ensure PostgreSQL service is running
- Check if port 5432 is open
- Verify HOST is 'localhost' or '127.0.0.1'

### Permission Denied
```sql
GRANT ALL PRIVILEGES ON DATABASE quickmed_db TO postgres;
```

## 📊 Verify Data is Saved

After signup, check database:

```sql
-- Connect to database
psql -U postgres -d quickmed_db

-- View all users
SELECT * FROM home_user;

-- View all vendors
SELECT * FROM home_vendor;

-- View all delivery agents
SELECT * FROM home_delivery;

-- View all doctors
SELECT * FROM home_doctor;
```

## 🔐 Using Environment Variables (Recommended)

Update `settings.py` to use environment variables for security:

```python
import os
from dotenv import load_dotenv

load_dotenv()

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.getenv('DB_NAME', 'quickmed_db'),
        'USER': os.getenv('DB_USER', 'postgres'),
        'PASSWORD': os.getenv('DB_PASSWORD', 'postgres'),
        'HOST': os.getenv('DB_HOST', 'localhost'),
        'PORT': os.getenv('DB_PORT', '5432'),
    }
}
```

Install python-dotenv:
```bash
pip install python-dotenv
```

