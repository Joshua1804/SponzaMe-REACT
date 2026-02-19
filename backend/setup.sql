CREATE DATABASE IF NOT EXISTS sponzame CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE sponzame;

CREATE TABLE IF NOT EXISTS users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'creator',
    is_active TINYINT(1) NOT NULL DEFAULT 1,
    token_count INT NOT NULL DEFAULT 5,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS creator_profiles (
    creator_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    fullname VARCHAR(150) NOT NULL,
    description TEXT,
    platforms VARCHAR(255),
    instalink VARCHAR(255),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_creator_user
        FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE
) ENGINE=InnoDB;


CREATE TABLE IF NOT EXISTS sponsor_profiles (
    sponsor_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    company_name VARCHAR(150) NOT NULL,
    description TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_sponsor_user
        FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE
) ENGINE=InnoDB;


CREATE TABLE IF NOT EXISTS campaigns (
    campaign_id INT AUTO_INCREMENT PRIMARY KEY,
    sponsor_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    niche VARCHAR(100),
    budget DECIMAL(12,2),
    company_name VARCHAR(150),
    status VARCHAR(20) DEFAULT 'active',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_campaign_sponsor
        FOREIGN KEY (sponsor_id)
        REFERENCES sponsor_profiles(sponsor_id)
        ON DELETE CASCADE
) ENGINE=InnoDB;


CREATE TABLE IF NOT EXISTS applications (
    application_id INT AUTO_INCREMENT PRIMARY KEY,
    campaign_id INT NOT NULL,
    creator_id INT NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',

    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_application_campaign
        FOREIGN KEY (campaign_id)
        REFERENCES campaigns(campaign_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_application_creator
        FOREIGN KEY (creator_id)
        REFERENCES creator_profiles(creator_id)
        ON DELETE CASCADE,

    UNIQUE KEY unique_application (campaign_id, creator_id)

) ENGINE=InnoDB;
