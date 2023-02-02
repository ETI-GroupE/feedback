-- Drop Tables
DROP TABLE IF EXISTS feedback;

-- Create Tables
CREATE TABLE feedback (
    created_at_date DATE DEFAULT (CURRENT_DATE),
    user_id int,
    product_id int,
    rating int CHECK(rating >= 0 AND rating <= 5),
    description text,
    PRIMARY KEY(user_id, product_id)
);