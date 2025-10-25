-- Создание таблицы пользователей Spooky
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(255) PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    is_premium BOOLEAN DEFAULT FALSE,
    admin_level INTEGER DEFAULT 0 CHECK (admin_level >= 0 AND admin_level <= 25),
    admin_role VARCHAR(50),
    avatar VARCHAR(10),
    cover_image TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание индексов для быстрого поиска
CREATE INDEX IF NOT EXISTS idx_users_admin_level ON users(admin_level);
CREATE INDEX IF NOT EXISTS idx_users_is_premium ON users(is_premium);
CREATE INDEX IF NOT EXISTS idx_users_created_at ON users(created_at);

-- Создание таблицы групп
CREATE TABLE IF NOT EXISTS groups (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    avatar VARCHAR(10) NOT NULL,
    created_by VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание таблицы участников групп с ролями
CREATE TABLE IF NOT EXISTS group_members (
    group_id VARCHAR(255) NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('owner', 'admin', 'moderator', 'member')),
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (group_id, user_id)
);

-- Создание индексов для group_members
CREATE INDEX IF NOT EXISTS idx_group_members_user_id ON group_members(user_id);
CREATE INDEX IF NOT EXISTS idx_group_members_role ON group_members(role);

-- Создание таблицы сообщений
CREATE TABLE IF NOT EXISTS messages (
    id VARCHAR(255) PRIMARY KEY,
    sender_id VARCHAR(255) NOT NULL,
    chat_id VARCHAR(255) NOT NULL,
    text TEXT NOT NULL,
    is_group_message BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание индексов для сообщений
CREATE INDEX IF NOT EXISTS idx_messages_chat_id ON messages(chat_id);
CREATE INDEX IF NOT EXISTS idx_messages_sender_id ON messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at);

-- Создание таблицы Premium подписок
CREATE TABLE IF NOT EXISTS premium_subscriptions (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL UNIQUE,
    started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    payment_amount DECIMAL(10, 2)
);

-- Создание индекса для активных подписок
CREATE INDEX IF NOT EXISTS idx_premium_active ON premium_subscriptions(user_id, is_active) WHERE is_active = TRUE;

-- Вставка тестовых данных
INSERT INTO users (id, first_name, last_name, password_hash, is_premium, admin_level, admin_role, avatar) VALUES
('test_user_1', 'Мария', 'Привидова', 'hashed_password_1', TRUE, 15, 'Владелец', '👻'),
('test_user_2', 'Иван', 'Духов', 'hashed_password_2', FALSE, 10, 'Администратор', '🎃'),
('test_user_3', 'Елена', 'Тенькова', 'hashed_password_3', TRUE, 5, 'Модератор', '💀'),
('test_user_4', 'Петр', 'Призраков', 'hashed_password_4', FALSE, 3, 'Агент поддержки', '🦇'),
('test_user_5', 'Анна', 'Ночная', 'hashed_password_5', TRUE, 0, NULL, '🌙')
ON CONFLICT (id) DO NOTHING;