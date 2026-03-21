/**
 * TechCorp Sample Database
 * 8 interconnected tables with realistic data for SQL learning.
 *
 * Tables:
 *   departments  → employees → assignments → projects
 *   customers    → orders    → order_items ← products
 */
export const SAMPLE_DB_SQL = `
-- ─────────────────────────────────────────────────────────────────
--  SCHEMA
-- ─────────────────────────────────────────────────────────────────

CREATE TABLE departments (
  dept_id    INTEGER PRIMARY KEY,
  dept_name  TEXT NOT NULL,
  location   TEXT NOT NULL,
  budget     REAL NOT NULL
);

CREATE TABLE employees (
  emp_id      INTEGER PRIMARY KEY,
  name        TEXT NOT NULL,
  email       TEXT UNIQUE NOT NULL,
  dept_id     INTEGER REFERENCES departments(dept_id),
  job_title   TEXT NOT NULL,
  salary      REAL NOT NULL,
  hire_date   TEXT NOT NULL,   -- ISO format YYYY-MM-DD
  manager_id  INTEGER REFERENCES employees(emp_id)
);

CREATE TABLE projects (
  proj_id     INTEGER PRIMARY KEY,
  proj_name   TEXT NOT NULL,
  status      TEXT NOT NULL,  -- 'active' | 'completed' | 'on-hold'
  start_date  TEXT NOT NULL,
  end_date    TEXT,
  dept_id     INTEGER REFERENCES departments(dept_id),
  budget      REAL NOT NULL
);

CREATE TABLE assignments (
  emp_id        INTEGER REFERENCES employees(emp_id),
  proj_id       INTEGER REFERENCES projects(proj_id),
  role          TEXT NOT NULL,
  hours_worked  INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (emp_id, proj_id)
);

CREATE TABLE products (
  prod_id   INTEGER PRIMARY KEY,
  name      TEXT NOT NULL,
  category  TEXT NOT NULL,
  price     REAL NOT NULL,
  stock     INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE customers (
  cust_id    INTEGER PRIMARY KEY,
  name       TEXT NOT NULL,
  email      TEXT UNIQUE NOT NULL,
  country    TEXT NOT NULL,
  join_date  TEXT NOT NULL
);

CREATE TABLE orders (
  order_id    INTEGER PRIMARY KEY,
  cust_id     INTEGER REFERENCES customers(cust_id),
  emp_id      INTEGER REFERENCES employees(emp_id),
  order_date  TEXT NOT NULL,
  status      TEXT NOT NULL,   -- 'pending' | 'shipped' | 'delivered' | 'cancelled'
  total       REAL NOT NULL
);

CREATE TABLE order_items (
  order_id    INTEGER REFERENCES orders(order_id),
  prod_id     INTEGER REFERENCES products(prod_id),
  quantity    INTEGER NOT NULL,
  unit_price  REAL NOT NULL,
  PRIMARY KEY (order_id, prod_id)
);

-- ─────────────────────────────────────────────────────────────────
--  DATA — departments
-- ─────────────────────────────────────────────────────────────────
INSERT INTO departments VALUES
  (1, 'Engineering',   'San Francisco', 3000000),
  (2, 'Product',       'San Francisco', 1500000),
  (3, 'Sales',         'New York',      2000000),
  (4, 'Marketing',     'New York',      1200000),
  (5, 'HR',            'Chicago',        800000),
  (6, 'Finance',       'Chicago',        900000),
  (7, 'Data Science',  'San Francisco', 1800000);

-- ─────────────────────────────────────────────────────────────────
--  DATA — employees  (manager_id NULL = top of hierarchy)
-- ─────────────────────────────────────────────────────────────────
INSERT INTO employees VALUES
  ( 1, 'Alice Chen',     'alice@techcorp.com',   1, 'CTO',                    210000, '2018-03-01', NULL),
  ( 2, 'Bob Martinez',   'bob@techcorp.com',     1, 'Senior Engineer',        145000, '2019-06-15', 1),
  ( 3, 'Carol Williams', 'carol@techcorp.com',   1, 'Senior Engineer',        140000, '2019-09-01', 1),
  ( 4, 'David Kim',      'david@techcorp.com',   1, 'Engineer',               110000, '2021-01-10', 2),
  ( 5, 'Emma Davis',     'emma@techcorp.com',    1, 'Engineer',               108000, '2021-04-20', 2),
  ( 6, 'Frank Lee',      'frank@techcorp.com',   1, 'Junior Engineer',         82000, '2023-02-01', 3),
  ( 7, 'Grace Park',     'grace@techcorp.com',   2, 'VP of Product',          185000, '2018-07-01', NULL),
  ( 8, 'Henry Brown',    'henry@techcorp.com',   2, 'Product Manager',        125000, '2020-03-15', 7),
  ( 9, 'Iris Johnson',   'iris@techcorp.com',    2, 'Product Manager',        122000, '2020-08-01', 7),
  (10, 'James Wilson',   'james@techcorp.com',   2, 'Product Analyst',         88000, '2022-05-10', 8),
  (11, 'Kate Thompson',  'kate@techcorp.com',    3, 'VP of Sales',            190000, '2017-11-01', NULL),
  (12, 'Liam Garcia',    'liam@techcorp.com',    3, 'Sales Manager',          115000, '2019-12-01', 11),
  (13, 'Mia Rodriguez',  'mia@techcorp.com',     3, 'Sales Rep',               72000, '2021-07-15', 12),
  (14, 'Noah Taylor',    'noah@techcorp.com',    3, 'Sales Rep',               70000, '2022-01-20', 12),
  (15, 'Olivia White',   'olivia@techcorp.com',  3, 'Sales Rep',               68000, '2023-03-01', 12),
  (16, 'Paul Harris',    'paul@techcorp.com',    4, 'Marketing Manager',      105000, '2020-04-01', NULL),
  (17, 'Quinn Lewis',    'quinn@techcorp.com',   4, 'Marketing Specialist',    78000, '2021-09-15', 16),
  (18, 'Rachel Clark',   'rachel@techcorp.com',  4, 'Marketing Specialist',    75000, '2022-06-01', 16),
  (19, 'Sam Walker',     'sam@techcorp.com',     5, 'HR Manager',             100000, '2019-05-01', NULL),
  (20, 'Tina Allen',     'tina@techcorp.com',    5, 'HR Specialist',           68000, '2021-11-01', 19),
  (21, 'Uma Scott',      'uma@techcorp.com',     6, 'Finance Director',       160000, '2018-09-15', NULL),
  (22, 'Victor Young',   'victor@techcorp.com',  6, 'Financial Analyst',       90000, '2020-10-01', 21),
  (23, 'Wendy King',     'wendy@techcorp.com',   7, 'Head of Data Science',   175000, '2019-01-15', NULL),
  (24, 'Xander Hill',    'xander@techcorp.com',  7, 'Data Scientist',         130000, '2020-07-01', 23),
  (25, 'Yara Adams',     'yara@techcorp.com',    7, 'Data Scientist',         128000, '2021-03-15', 23),
  (26, 'Zoe Nelson',     'zoe@techcorp.com',     7, 'Data Analyst',            95000, '2022-08-01', 24);

-- ─────────────────────────────────────────────────────────────────
--  DATA — projects
-- ─────────────────────────────────────────────────────────────────
INSERT INTO projects VALUES
  ( 1, 'Apollo Platform Rewrite',  'active',    '2023-01-01', NULL,         1, 500000),
  ( 2, 'ML Recommendation Engine', 'active',    '2023-04-01', NULL,         7, 350000),
  ( 3, 'Mobile App v3',            'active',    '2023-06-15', NULL,         2, 280000),
  ( 4, 'Sales CRM Upgrade',        'completed', '2022-01-01', '2023-03-31', 3, 150000),
  ( 5, 'Data Warehouse Migration', 'completed', '2022-06-01', '2023-01-31', 7, 400000),
  ( 6, 'Marketing Analytics Tool', 'on-hold',   '2023-03-01', NULL,         4, 200000),
  ( 7, 'Security Audit 2024',      'active',    '2024-01-01', NULL,         1, 120000),
  ( 8, 'HR Self-Service Portal',   'completed', '2021-09-01', '2022-12-31', 5, 180000);

-- ─────────────────────────────────────────────────────────────────
--  DATA — assignments
-- ─────────────────────────────────────────────────────────────────
INSERT INTO assignments VALUES
  (2,  1, 'Tech Lead',       820),
  (3,  1, 'Backend Lead',    650),
  (4,  1, 'Developer',       480),
  (5,  1, 'Developer',       410),
  (6,  1, 'Developer',       300),
  (24, 2, 'ML Lead',         560),
  (25, 2, 'Data Scientist',  490),
  (26, 2, 'Data Analyst',    320),
  (8,  3, 'PM',              400),
  (4,  3, 'Developer',       220),
  (5,  3, 'Developer',       180),
  (12, 4, 'Project Sponsor', 200),
  (13, 4, 'Lead',            350),
  (14, 4, 'Support',         280),
  (24, 5, 'Lead',            600),
  (25, 5, 'Contributor',     420),
  (26, 5, 'Analyst',         380),
  (17, 6, 'Lead',            150),
  (18, 6, 'Contributor',     110),
  (2,  7, 'Advisor',         120),
  (3,  7, 'Reviewer',        100),
  (20, 8, 'PM',              300),
  (10, 8, 'Analyst',         240);

-- ─────────────────────────────────────────────────────────────────
--  DATA — products
-- ─────────────────────────────────────────────────────────────────
INSERT INTO products VALUES
  ( 1, 'AlgoLearn Pro Annual',      'Subscription',  299.00, 9999),
  ( 2, 'AlgoLearn Pro Monthly',     'Subscription',   29.99, 9999),
  ( 3, 'DataMaster Course Bundle',  'Course',         199.00, 9999),
  ( 4, 'SQL Expert Course',         'Course',         149.00, 9999),
  ( 5, 'Python Bootcamp',           'Course',         129.00, 9999),
  ( 6, 'Dev Hoodie',                'Merch',           49.99,  342),
  ( 7, 'Mechanical Keyboard',       'Hardware',       129.99,   87),
  ( 8, 'Laptop Stand Pro',          'Hardware',        59.99,  215),
  ( 9, 'Premium Support 1yr',       'Service',        499.00, 9999),
  (10, 'Private Coaching Session',  'Service',        199.00, 9999),
  (11, 'Algo Flashcards Deck',      'Physical',        24.99,  890),
  (12, 'Tech Interview Handbook',   'Physical',        39.99,  430);

-- ─────────────────────────────────────────────────────────────────
--  DATA — customers
-- ─────────────────────────────────────────────────────────────────
INSERT INTO customers VALUES
  ( 1, 'Tom Anderson',  'tom@example.com',    'USA',    '2022-01-15'),
  ( 2, 'Lin Wei',       'linwei@example.com', 'China',  '2022-02-20'),
  ( 3, 'Maria Silva',   'maria@example.com',  'Brazil', '2022-03-05'),
  ( 4, 'Arjun Patel',   'arjun@example.com',  'India',  '2022-04-10'),
  ( 5, 'Sophie Dubois', 'sophie@example.com', 'France', '2022-05-22'),
  ( 6, 'Ahmed Hassan',  'ahmed@example.com',  'Egypt',  '2022-06-18'),
  ( 7, 'Hana Tanaka',   'hana@example.com',   'Japan',  '2022-07-30'),
  ( 8, 'Carlos Gomez',  'carlos@example.com', 'Mexico', '2022-08-14'),
  ( 9, 'Priya Nair',    'priya@example.com',  'India',  '2022-09-01'),
  (10, 'Jake Murphy',   'jake@example.com',   'USA',    '2022-10-25'),
  (11, 'Nadia Petrov',  'nadia@example.com',  'Russia', '2023-01-03'),
  (12, 'Omar Faruk',    'omar@example.com',   'UAE',    '2023-02-14'),
  (13, 'Emma Clarke',   'emma.c@example.com', 'UK',     '2023-03-20'),
  (14, 'Ryan Park',     'ryan@example.com',   'USA',    '2023-04-08'),
  (15, 'Fatima Al-Ali', 'fatima@example.com', 'UAE',    '2023-05-17');

-- ─────────────────────────────────────────────────────────────────
--  DATA — orders
-- ─────────────────────────────────────────────────────────────────
INSERT INTO orders VALUES
  ( 1,  1, 13, '2023-01-10', 'delivered', 299.00),
  ( 2,  2, 14, '2023-01-15', 'delivered', 349.00),
  ( 3,  3, 13, '2023-02-01', 'delivered',  49.99),
  ( 4,  4, 14, '2023-02-14', 'delivered', 199.00),
  ( 5,  1, 13, '2023-03-05', 'delivered',  59.99),
  ( 6,  5, 15, '2023-03-20', 'delivered', 149.00),
  ( 7,  6, 13, '2023-04-02', 'delivered', 499.00),
  ( 8,  7, 14, '2023-04-18', 'delivered', 329.00),
  ( 9,  8, 15, '2023-05-10', 'delivered', 129.99),
  (10,  9, 13, '2023-05-25', 'delivered', 299.00),
  (11, 10, 14, '2023-06-08', 'shipped',   199.00),
  (12,  2, 15, '2023-06-20', 'delivered', 149.00),
  (13, 11, 13, '2023-07-05', 'delivered', 129.00),
  (14, 12, 14, '2023-07-22', 'delivered', 299.00),
  (15,  3, 15, '2023-08-01', 'delivered', 199.00),
  (16,  4, 13, '2023-08-18', 'cancelled',  49.99),
  (17, 13, 14, '2023-09-03', 'delivered', 498.00),
  (18, 14, 15, '2023-09-20', 'shipped',   129.00),
  (19,  5, 13, '2023-10-05', 'delivered', 239.00),
  (20, 15, 14, '2023-10-22', 'delivered', 299.00),
  (21,  1, 15, '2023-11-10', 'delivered', 199.00),
  (22,  6, 13, '2023-11-25', 'delivered', 129.99),
  (23,  7, 14, '2023-12-08', 'delivered', 299.00),
  (24,  8, 15, '2023-12-20', 'pending',    59.99),
  (25,  9, 13, '2024-01-05', 'pending',   149.00);

-- ─────────────────────────────────────────────────────────────────
--  DATA — order_items
-- ─────────────────────────────────────────────────────────────────
INSERT INTO order_items VALUES
  ( 1,  1, 1, 299.00),
  ( 2,  3, 1, 149.00), ( 2,  1, 1, 199.00),
  ( 3,  6, 1,  49.99),
  ( 4,  3, 1, 199.00),
  ( 5,  8, 1,  59.99),
  ( 6,  4, 1, 149.00),
  ( 7,  9, 1, 499.00),
  ( 8,  1, 1, 299.00), ( 8,  2, 1,  29.99),
  ( 9,  7, 1, 129.99),
  (10,  1, 1, 299.00),
  (11, 10, 1, 199.00),
  (12,  4, 1, 149.00),
  (13,  5, 1, 129.00),
  (14,  1, 1, 299.00),
  (15, 10, 1, 199.00),
  (16,  6, 1,  49.99),
  (17,  9, 1, 499.00), (17, 11, 1,  24.99),
  (18,  5, 1, 129.00),
  (19,  2, 1,  29.99), (19,  3, 1, 199.00), (19, 11, 1,  24.99),
  (20,  1, 1, 299.00),
  (21, 10, 1, 199.00),
  (22,  7, 1, 129.99),
  (23,  1, 1, 299.00),
  (24,  8, 1,  59.99),
  (25,  4, 1, 149.00);
`

export const DB_SCHEMA = [
  {
    name: 'departments',
    color: 'bg-purple-500',
    columns: [
      { name: 'dept_id',   type: 'INTEGER', key: 'PK' },
      { name: 'dept_name', type: 'TEXT' },
      { name: 'location',  type: 'TEXT' },
      { name: 'budget',    type: 'REAL' },
    ],
  },
  {
    name: 'employees',
    color: 'bg-blue-500',
    columns: [
      { name: 'emp_id',     type: 'INTEGER', key: 'PK' },
      { name: 'name',       type: 'TEXT' },
      { name: 'email',      type: 'TEXT' },
      { name: 'dept_id',    type: 'INTEGER', key: 'FK→departments' },
      { name: 'job_title',  type: 'TEXT' },
      { name: 'salary',     type: 'REAL' },
      { name: 'hire_date',  type: 'TEXT' },
      { name: 'manager_id', type: 'INTEGER', key: 'FK→employees' },
    ],
  },
  {
    name: 'projects',
    color: 'bg-green-500',
    columns: [
      { name: 'proj_id',    type: 'INTEGER', key: 'PK' },
      { name: 'proj_name',  type: 'TEXT' },
      { name: 'status',     type: 'TEXT' },
      { name: 'start_date', type: 'TEXT' },
      { name: 'end_date',   type: 'TEXT' },
      { name: 'dept_id',    type: 'INTEGER', key: 'FK→departments' },
      { name: 'budget',     type: 'REAL' },
    ],
  },
  {
    name: 'assignments',
    color: 'bg-yellow-500',
    columns: [
      { name: 'emp_id',       type: 'INTEGER', key: 'FK→employees' },
      { name: 'proj_id',      type: 'INTEGER', key: 'FK→projects' },
      { name: 'role',         type: 'TEXT' },
      { name: 'hours_worked', type: 'INTEGER' },
    ],
  },
  {
    name: 'products',
    color: 'bg-orange-500',
    columns: [
      { name: 'prod_id',  type: 'INTEGER', key: 'PK' },
      { name: 'name',     type: 'TEXT' },
      { name: 'category', type: 'TEXT' },
      { name: 'price',    type: 'REAL' },
      { name: 'stock',    type: 'INTEGER' },
    ],
  },
  {
    name: 'customers',
    color: 'bg-teal-500',
    columns: [
      { name: 'cust_id',   type: 'INTEGER', key: 'PK' },
      { name: 'name',      type: 'TEXT' },
      { name: 'email',     type: 'TEXT' },
      { name: 'country',   type: 'TEXT' },
      { name: 'join_date', type: 'TEXT' },
    ],
  },
  {
    name: 'orders',
    color: 'bg-red-500',
    columns: [
      { name: 'order_id',   type: 'INTEGER', key: 'PK' },
      { name: 'cust_id',    type: 'INTEGER', key: 'FK→customers' },
      { name: 'emp_id',     type: 'INTEGER', key: 'FK→employees' },
      { name: 'order_date', type: 'TEXT' },
      { name: 'status',     type: 'TEXT' },
      { name: 'total',      type: 'REAL' },
    ],
  },
  {
    name: 'order_items',
    color: 'bg-pink-500',
    columns: [
      { name: 'order_id',   type: 'INTEGER', key: 'FK→orders' },
      { name: 'prod_id',    type: 'INTEGER', key: 'FK→products' },
      { name: 'quantity',   type: 'INTEGER' },
      { name: 'unit_price', type: 'REAL' },
    ],
  },
]
