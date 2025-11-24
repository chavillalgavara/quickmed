-- =====================================================
-- QuickMed PostgreSQL Database Schema
-- =====================================================
-- This file contains the complete database schema for QuickMed
-- Run this script to set up your PostgreSQL database
-- =====================================================

-- Create Database (run this as superuser)
-- CREATE DATABASE quickmed_db;
-- \c quickmed_db;

-- =====================================================
-- EXTENSIONS
-- =====================================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- REVIEWS TABLE
-- =====================================================
-- This table stores customer reviews for QuickMed services

CREATE TABLE IF NOT EXISTS home_review (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT NOT NULL CHECK (char_length(comment) <= 500),
    status VARCHAR(10) NOT NULL DEFAULT 'approved' CHECK (status IN ('pending', 'approved', 'rejected')),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_review_status ON home_review(status);
CREATE INDEX IF NOT EXISTS idx_review_created_at ON home_review(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_review_rating ON home_review(rating);
CREATE INDEX IF NOT EXISTS idx_review_email ON home_review(email);

-- Create a function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to auto-update updated_at
CREATE TRIGGER update_review_updated_at 
    BEFORE UPDATE ON home_review
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- SAMPLE DATA (Optional - for testing)
-- =====================================================
-- Uncomment below to insert sample reviews

/*
INSERT INTO home_review (name, email, rating, comment, status, created_at) VALUES
('Rahul Sharma', 'rahul.sharma@example.com', 5, 'QuickMed saved me during my emergency! The medicine delivery was super fast - received within 25 minutes. Highly recommended!', 'approved', '2024-01-15 10:30:00+00'),
('Priya Patel', 'priya.patel@example.com', 4, 'Excellent service! The doctor consultation was smooth and the medicine reached within 30 minutes as promised.', 'approved', '2024-01-12 14:20:00+00'),
('Ankit Verma', 'ankit.verma@example.com', 5, 'Best healthcare app I have used. The live tracking feature is amazing and the doctors are very professional.', 'approved', '2024-01-10 09:15:00+00'),
('Sneha Reddy', 'sneha.reddy@example.com', 5, '24/7 doctor consultation is a lifesaver! Got immediate help for my child fever at midnight.', 'approved', '2024-01-08 16:45:00+00'),
('Vikram Singh', 'vikram.singh@example.com', 4, 'Great platform for medicine delivery. The delivery executive was very professional and polite.', 'approved', '2024-01-05 11:00:00+00'),
('Meera Joshi', 'meera.joshi@example.com', 5, 'The OTC products section is very comprehensive. Found all my regular health supplements easily.', 'approved', '2024-01-03 13:30:00+00');
*/

-- =====================================================
-- VIEWS (Optional - for easier querying)
-- =====================================================

-- View for approved reviews only
CREATE OR REPLACE VIEW approved_reviews AS
SELECT 
    id,
    name,
    email,
    rating,
    comment,
    created_at,
    updated_at,
    -- Generate avatar initials
    UPPER(SUBSTRING(name, 1, 1) || 
          CASE 
              WHEN POSITION(' ' IN name) > 0 
              THEN SUBSTRING(name, POSITION(' ' IN name) + 1, 1)
              ELSE ''
          END) AS avatar,
    -- Format date as YYYY-MM-DD
    TO_CHAR(created_at, 'YYYY-MM-DD') AS date
FROM home_review
WHERE status = 'approved'
ORDER BY created_at DESC;

-- View for review statistics
CREATE OR REPLACE VIEW review_statistics AS
SELECT 
    COUNT(*) AS total_reviews,
    AVG(rating) AS average_rating,
    COUNT(*) FILTER (WHERE rating = 5) AS five_star_count,
    COUNT(*) FILTER (WHERE rating = 4) AS four_star_count,
    COUNT(*) FILTER (WHERE rating = 3) AS three_star_count,
    COUNT(*) FILTER (WHERE rating = 2) AS two_star_count,
    COUNT(*) FILTER (WHERE rating = 1) AS one_star_count,
    COUNT(*) FILTER (WHERE status = 'approved') AS approved_count,
    COUNT(*) FILTER (WHERE status = 'pending') AS pending_count,
    COUNT(*) FILTER (WHERE status = 'rejected') AS rejected_count
FROM home_review;

-- =====================================================
-- USEFUL QUERIES
-- =====================================================

-- Get all approved reviews ordered by date (newest first)
-- SELECT * FROM approved_reviews;

-- Get review statistics
-- SELECT * FROM review_statistics;

-- Get reviews by rating
-- SELECT * FROM home_review WHERE rating = 5 AND status = 'approved' ORDER BY created_at DESC;

-- Get reviews created in the last 7 days
-- SELECT * FROM home_review 
-- WHERE created_at >= CURRENT_TIMESTAMP - INTERVAL '7 days' 
-- AND status = 'approved'
-- ORDER BY created_at DESC;

-- =====================================================
-- PERMISSIONS (Adjust as needed for your setup)
-- =====================================================
-- GRANT ALL PRIVILEGES ON TABLE home_review TO your_django_user;
-- GRANT USAGE, SELECT ON SEQUENCE home_review_id_seq TO your_django_user;
-- GRANT SELECT ON approved_reviews TO your_django_user;
-- GRANT SELECT ON review_statistics TO your_django_user;

-- =====================================================
-- NOTES
-- =====================================================
-- 1. Make sure PostgreSQL is installed and running
-- 2. Create a database user for Django (recommended):
--    CREATE USER quickmed_user WITH PASSWORD 'your_password';
--    GRANT ALL PRIVILEGES ON DATABASE quickmed_db TO quickmed_user;
-- 3. Update Django settings.py with your database credentials
-- 4. Run Django migrations: python manage.py makemigrations && python manage.py migrate
-- 5. The Django ORM will create the tables automatically, but this SQL provides
--    a reference schema and can be used for manual setup if needed

