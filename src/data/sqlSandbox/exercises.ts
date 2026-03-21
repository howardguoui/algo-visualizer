export type Difficulty = 'beginner' | 'intermediate' | 'advanced'

export interface Exercise {
  id: string
  title: string
  difficulty: Difficulty
  topic: string
  description: string
  hint: string
  solution: string
  starterQuery: string
}

export const exercises: Exercise[] = [
  // ── BEGINNER ─────────────────────────────────────────────────────────────

  {
    id: 'b01',
    title: 'Your First SELECT',
    difficulty: 'beginner',
    topic: 'SELECT Basics',
    description:
      'Retrieve all columns and all rows from the `employees` table.\n\nThis is the most basic SQL query — it returns everything from a table.',
    hint: 'Use `SELECT *` to select all columns. No WHERE clause means all rows.',
    solution: 'SELECT * FROM employees;',
    starterQuery: '-- Select all employees\nSELECT * FROM employees;',
  },
  {
    id: 'b02',
    title: 'Choose Specific Columns',
    difficulty: 'beginner',
    topic: 'SELECT Basics',
    description:
      'Show only the `name`, `job_title`, and `salary` of every employee.\n\nGood habit: only select the columns you actually need.',
    hint: 'List the column names separated by commas after SELECT.',
    solution: 'SELECT name, job_title, salary FROM employees;',
    starterQuery: 'SELECT name, job_title, salary\nFROM employees;',
  },
  {
    id: 'b03',
    title: 'Filter with WHERE',
    difficulty: 'beginner',
    topic: 'WHERE Clause',
    description:
      'Find all employees in department 1 (Engineering) with a salary greater than $120,000.',
    hint: 'Use AND to combine two conditions in WHERE.',
    solution: "SELECT name, salary FROM employees WHERE dept_id = 1 AND salary > 120000;",
    starterQuery: "SELECT name, salary\nFROM employees\nWHERE dept_id = 1 AND salary > 120000;",
  },
  {
    id: 'b04',
    title: 'Sort Results',
    difficulty: 'beginner',
    topic: 'ORDER BY',
    description:
      'List all employees sorted by salary from highest to lowest. Show their name and salary.',
    hint: 'Use ORDER BY column DESC for descending order.',
    solution: 'SELECT name, salary FROM employees ORDER BY salary DESC;',
    starterQuery: 'SELECT name, salary\nFROM employees\nORDER BY salary DESC;',
  },
  {
    id: 'b05',
    title: 'Limit Your Results',
    difficulty: 'beginner',
    topic: 'LIMIT',
    description:
      'Find the top 5 highest-paid employees. Show their name, job title, and salary.',
    hint: 'Combine ORDER BY salary DESC with LIMIT 5.',
    solution: 'SELECT name, job_title, salary FROM employees ORDER BY salary DESC LIMIT 5;',
    starterQuery: 'SELECT name, job_title, salary\nFROM employees\nORDER BY salary DESC\nLIMIT 5;',
  },
  {
    id: 'b06',
    title: 'Pattern Matching',
    difficulty: 'beginner',
    topic: 'LIKE',
    description:
      'Find all employees whose email address ends with `@techcorp.com`.\n\n`%` is the wildcard that matches any sequence of characters.',
    hint: "Use WHERE email LIKE '%@techcorp.com'",
    solution: "SELECT name, email FROM employees WHERE email LIKE '%@techcorp.com';",
    starterQuery: "SELECT name, email\nFROM employees\nWHERE email LIKE '%@techcorp.com';",
  },
  {
    id: 'b07',
    title: 'Unique Values',
    difficulty: 'beginner',
    topic: 'DISTINCT',
    description:
      'List all unique countries that customers come from. Sort them alphabetically.',
    hint: 'Use SELECT DISTINCT on the country column.',
    solution: 'SELECT DISTINCT country FROM customers ORDER BY country;',
    starterQuery: 'SELECT DISTINCT country\nFROM customers\nORDER BY country;',
  },
  {
    id: 'b08',
    title: 'NULL Values',
    difficulty: 'beginner',
    topic: 'IS NULL',
    description:
      'Find employees who have no manager (i.e., `manager_id` is NULL). These are the top-level leaders.',
    hint: 'Use WHERE manager_id IS NULL — you cannot use = NULL in SQL!',
    solution: 'SELECT name, job_title FROM employees WHERE manager_id IS NULL;',
    starterQuery: 'SELECT name, job_title\nFROM employees\nWHERE manager_id IS NULL;',
  },
  {
    id: 'b09',
    title: 'Column Calculations',
    difficulty: 'beginner',
    topic: 'Expressions',
    description:
      'Show each employee\'s name, their current salary, and what their salary would be after a 10% raise. Name the new column `salary_after_raise`.',
    hint: 'Multiply salary by 1.10 and use AS to rename the column.',
    solution: "SELECT name, salary, ROUND(salary * 1.10, 2) AS salary_after_raise FROM employees;",
    starterQuery: "SELECT name,\n       salary,\n       ROUND(salary * 1.10, 2) AS salary_after_raise\nFROM employees;",
  },
  {
    id: 'b10',
    title: 'CASE Expression',
    difficulty: 'beginner',
    topic: 'CASE WHEN',
    description:
      'Classify each employee with a label:\n- salary >= 150000 → "Senior"\n- salary >= 100000 → "Mid"\n- anything else → "Junior"\n\nShow name, salary, and the classification as `level`.',
    hint: 'Use a CASE WHEN ... THEN ... ELSE ... END expression.',
    solution: "SELECT name, salary,\n  CASE\n    WHEN salary >= 150000 THEN 'Senior'\n    WHEN salary >= 100000 THEN 'Mid'\n    ELSE 'Junior'\n  END AS level\nFROM employees\nORDER BY salary DESC;",
    starterQuery: "SELECT name, salary,\n  CASE\n    WHEN salary >= 150000 THEN 'Senior'\n    WHEN salary >= 100000 THEN 'Mid'\n    ELSE 'Junior'\n  END AS level\nFROM employees\nORDER BY salary DESC;",
  },

  // ── INTERMEDIATE ──────────────────────────────────────────────────────────

  {
    id: 'i01',
    title: 'INNER JOIN',
    difficulty: 'intermediate',
    topic: 'JOINs',
    description:
      'List each employee\'s name along with the name of their department (`dept_name`). Only show employees who have a department (all do here, but use INNER JOIN).',
    hint: 'JOIN employees to departments on dept_id.',
    solution: 'SELECT e.name, d.dept_name\nFROM employees e\nINNER JOIN departments d ON e.dept_id = d.dept_id\nORDER BY d.dept_name, e.name;',
    starterQuery: 'SELECT e.name, d.dept_name\nFROM employees e\nINNER JOIN departments d ON e.dept_id = d.dept_id\nORDER BY d.dept_name, e.name;',
  },
  {
    id: 'i02',
    title: 'LEFT JOIN — Find Missing Data',
    difficulty: 'intermediate',
    topic: 'JOINs',
    description:
      'Find all projects that have NO employees assigned to them. Show project name and status.\n\nHint: Use LEFT JOIN from projects to assignments and look for NULL on the right side.',
    hint: 'LEFT JOIN assignments on proj_id, then WHERE a.emp_id IS NULL.',
    solution: "SELECT p.proj_name, p.status\nFROM projects p\nLEFT JOIN assignments a ON p.proj_id = a.proj_id\nWHERE a.emp_id IS NULL;",
    starterQuery: "SELECT p.proj_name, p.status\nFROM projects p\nLEFT JOIN assignments a ON p.proj_id = a.proj_id\nWHERE a.emp_id IS NULL;",
  },
  {
    id: 'i03',
    title: 'Self JOIN — Find Managers',
    difficulty: 'intermediate',
    topic: 'JOINs',
    description:
      'Show each employee\'s name and their manager\'s name side by side. If an employee has no manager, show "No Manager" instead of NULL.',
    hint: 'JOIN employees to itself using two aliases. Use COALESCE to handle NULLs.',
    solution: "SELECT e.name AS employee,\n       COALESCE(m.name, 'No Manager') AS manager\nFROM employees e\nLEFT JOIN employees m ON e.manager_id = m.emp_id\nORDER BY manager, employee;",
    starterQuery: "SELECT e.name AS employee,\n       COALESCE(m.name, 'No Manager') AS manager\nFROM employees e\nLEFT JOIN employees m ON e.manager_id = m.emp_id\nORDER BY manager, employee;",
  },
  {
    id: 'i04',
    title: 'COUNT and GROUP BY',
    difficulty: 'intermediate',
    topic: 'Aggregation',
    description:
      'How many employees are in each department? Show department name and employee count. Sort by count from highest to lowest.',
    hint: 'JOIN employees to departments, then GROUP BY dept_name and COUNT(*)',
    solution: "SELECT d.dept_name, COUNT(*) AS headcount\nFROM employees e\nJOIN departments d ON e.dept_id = d.dept_id\nGROUP BY d.dept_id, d.dept_name\nORDER BY headcount DESC;",
    starterQuery: "SELECT d.dept_name, COUNT(*) AS headcount\nFROM employees e\nJOIN departments d ON e.dept_id = d.dept_id\nGROUP BY d.dept_id, d.dept_name\nORDER BY headcount DESC;",
  },
  {
    id: 'i05',
    title: 'AVG and HAVING',
    difficulty: 'intermediate',
    topic: 'Aggregation',
    description:
      'Find departments where the average employee salary exceeds $100,000. Show the department name and average salary (rounded to 2 decimal places).',
    hint: 'Use GROUP BY with AVG(salary), then filter with HAVING AVG(salary) > 100000.',
    solution: "SELECT d.dept_name, ROUND(AVG(e.salary), 2) AS avg_salary\nFROM employees e\nJOIN departments d ON e.dept_id = d.dept_id\nGROUP BY d.dept_id, d.dept_name\nHAVING AVG(e.salary) > 100000\nORDER BY avg_salary DESC;",
    starterQuery: "SELECT d.dept_name, ROUND(AVG(e.salary), 2) AS avg_salary\nFROM employees e\nJOIN departments d ON e.dept_id = d.dept_id\nGROUP BY d.dept_id, d.dept_name\nHAVING AVG(e.salary) > 100000\nORDER BY avg_salary DESC;",
  },
  {
    id: 'i06',
    title: 'Three-Table JOIN',
    difficulty: 'intermediate',
    topic: 'JOINs',
    description:
      'For each active project, show the project name, department name, and total hours worked by all assigned employees.',
    hint: "JOIN projects → departments and projects → assignments. Filter WHERE status = 'active'.",
    solution: "SELECT p.proj_name,\n       d.dept_name,\n       SUM(a.hours_worked) AS total_hours\nFROM projects p\nJOIN departments d ON p.dept_id = d.dept_id\nLEFT JOIN assignments a ON p.proj_id = a.proj_id\nWHERE p.status = 'active'\nGROUP BY p.proj_id, p.proj_name, d.dept_name\nORDER BY total_hours DESC;",
    starterQuery: "SELECT p.proj_name, d.dept_name, SUM(a.hours_worked) AS total_hours\nFROM projects p\nJOIN departments d ON p.dept_id = d.dept_id\nLEFT JOIN assignments a ON p.proj_id = a.proj_id\nWHERE p.status = 'active'\nGROUP BY p.proj_id, p.proj_name, d.dept_name\nORDER BY total_hours DESC;",
  },
  {
    id: 'i07',
    title: 'Subquery in WHERE',
    difficulty: 'intermediate',
    topic: 'Subqueries',
    description:
      'Find all employees who earn more than the company-wide average salary. Show their name, department name, and salary.',
    hint: 'Use a subquery (SELECT AVG(salary) FROM employees) inside WHERE.',
    solution: "SELECT e.name, d.dept_name, e.salary\nFROM employees e\nJOIN departments d ON e.dept_id = d.dept_id\nWHERE e.salary > (SELECT AVG(salary) FROM employees)\nORDER BY e.salary DESC;",
    starterQuery: "SELECT e.name, d.dept_name, e.salary\nFROM employees e\nJOIN departments d ON e.dept_id = d.dept_id\nWHERE e.salary > (SELECT AVG(salary) FROM employees)\nORDER BY e.salary DESC;",
  },
  {
    id: 'i08',
    title: 'Aggregate + JOIN: Top Customers',
    difficulty: 'intermediate',
    topic: 'Aggregation',
    description:
      'List the top 5 customers by total amount spent. Show customer name, country, number of orders, and total spent.',
    hint: 'JOIN customers to orders, GROUP BY customer, SUM total, LIMIT 5.',
    solution: "SELECT c.name, c.country,\n       COUNT(o.order_id) AS order_count,\n       ROUND(SUM(o.total), 2) AS total_spent\nFROM customers c\nJOIN orders o ON c.cust_id = o.cust_id\nGROUP BY c.cust_id, c.name, c.country\nORDER BY total_spent DESC\nLIMIT 5;",
    starterQuery: "SELECT c.name, c.country,\n       COUNT(o.order_id) AS order_count,\n       ROUND(SUM(o.total), 2) AS total_spent\nFROM customers c\nJOIN orders o ON c.cust_id = o.cust_id\nGROUP BY c.cust_id, c.name, c.country\nORDER BY total_spent DESC\nLIMIT 5;",
  },
  {
    id: 'i09',
    title: 'IN with Subquery',
    difficulty: 'intermediate',
    topic: 'Subqueries',
    description:
      'Find all customers who have NEVER placed an order. Show their name and join date.',
    hint: 'Use LEFT JOIN and check for NULL, OR use WHERE cust_id NOT IN (SELECT cust_id FROM orders).',
    solution: "SELECT name, join_date\nFROM customers\nWHERE cust_id NOT IN (SELECT DISTINCT cust_id FROM orders)\nORDER BY join_date;",
    starterQuery: "SELECT name, join_date\nFROM customers\nWHERE cust_id NOT IN (SELECT DISTINCT cust_id FROM orders)\nORDER BY join_date;",
  },
  {
    id: 'i10',
    title: 'CTE (Common Table Expression)',
    difficulty: 'intermediate',
    topic: 'CTEs',
    description:
      'Using a WITH clause (CTE), find each department\'s average salary, then show only departments where the average is below the company overall average.',
    hint: 'Write two CTEs: one for department averages, one for the company average. Or nest them.',
    solution: "WITH dept_avg AS (\n  SELECT d.dept_name, AVG(e.salary) AS avg_sal\n  FROM employees e\n  JOIN departments d ON e.dept_id = d.dept_id\n  GROUP BY d.dept_id, d.dept_name\n),\ncompany_avg AS (\n  SELECT AVG(salary) AS co_avg FROM employees\n)\nSELECT da.dept_name,\n       ROUND(da.avg_sal, 2) AS dept_avg,\n       ROUND(ca.co_avg, 2)  AS company_avg\nFROM dept_avg da, company_avg ca\nWHERE da.avg_sal < ca.co_avg\nORDER BY da.avg_sal;",
    starterQuery: "WITH dept_avg AS (\n  SELECT d.dept_name, AVG(e.salary) AS avg_sal\n  FROM employees e JOIN departments d ON e.dept_id = d.dept_id\n  GROUP BY d.dept_id, d.dept_name\n),\ncompany_avg AS (\n  SELECT AVG(salary) AS co_avg FROM employees\n)\nSELECT da.dept_name,\n       ROUND(da.avg_sal, 2) AS dept_avg,\n       ROUND(ca.co_avg, 2) AS company_avg\nFROM dept_avg da, company_avg ca\nWHERE da.avg_sal < ca.co_avg\nORDER BY da.avg_sal;",
  },

  // ── ADVANCED ──────────────────────────────────────────────────────────────

  {
    id: 'a01',
    title: 'ROW_NUMBER — Rank Within Group',
    difficulty: 'advanced',
    topic: 'Window Functions',
    description:
      'Assign a rank to each employee within their department, ordered by salary descending. Show name, department, salary, and their within-department rank.',
    hint: 'Use ROW_NUMBER() OVER (PARTITION BY dept_id ORDER BY salary DESC).',
    solution: "SELECT e.name,\n       d.dept_name,\n       e.salary,\n       ROW_NUMBER() OVER (PARTITION BY e.dept_id ORDER BY e.salary DESC) AS dept_rank\nFROM employees e\nJOIN departments d ON e.dept_id = d.dept_id\nORDER BY d.dept_name, dept_rank;",
    starterQuery: "SELECT e.name,\n       d.dept_name,\n       e.salary,\n       ROW_NUMBER() OVER (PARTITION BY e.dept_id ORDER BY e.salary DESC) AS dept_rank\nFROM employees e\nJOIN departments d ON e.dept_id = d.dept_id\nORDER BY d.dept_name, dept_rank;",
  },
  {
    id: 'a02',
    title: 'Top N Per Group (DENSE_RANK)',
    difficulty: 'advanced',
    topic: 'Window Functions',
    description:
      'Find the top 2 highest-paid employees in EACH department. If two employees tie for 2nd place, include both. Show name, department, salary, and rank.',
    hint: 'Use DENSE_RANK() in a CTE, then filter WHERE rank <= 2.',
    solution: "WITH ranked AS (\n  SELECT e.name,\n         d.dept_name,\n         e.salary,\n         DENSE_RANK() OVER (PARTITION BY e.dept_id ORDER BY e.salary DESC) AS dr\n  FROM employees e\n  JOIN departments d ON e.dept_id = d.dept_id\n)\nSELECT name, dept_name, salary, dr AS rank\nFROM ranked\nWHERE dr <= 2\nORDER BY dept_name, salary DESC;",
    starterQuery: "WITH ranked AS (\n  SELECT e.name, d.dept_name, e.salary,\n         DENSE_RANK() OVER (PARTITION BY e.dept_id ORDER BY e.salary DESC) AS dr\n  FROM employees e\n  JOIN departments d ON e.dept_id = d.dept_id\n)\nSELECT name, dept_name, salary, dr AS rank\nFROM ranked\nWHERE dr <= 2\nORDER BY dept_name, salary DESC;",
  },
  {
    id: 'a03',
    title: 'Running Total',
    difficulty: 'advanced',
    topic: 'Window Functions',
    description:
      'Show a running total of order amounts over time. For each order (sorted by date), show the order date, amount, and the cumulative total of all orders up to and including that date.',
    hint: 'Use SUM(total) OVER (ORDER BY order_date ROWS UNBOUNDED PRECEDING).',
    solution: "SELECT order_date,\n       ROUND(total, 2) AS amount,\n       ROUND(SUM(total) OVER (ORDER BY order_date, order_id\n             ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW), 2) AS running_total\nFROM orders\nORDER BY order_date, order_id;",
    starterQuery: "SELECT order_date,\n       ROUND(total, 2) AS amount,\n       ROUND(SUM(total) OVER (ORDER BY order_date, order_id\n             ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW), 2) AS running_total\nFROM orders\nORDER BY order_date, order_id;",
  },
  {
    id: 'a04',
    title: 'LAG — Month-over-Month Comparison',
    difficulty: 'advanced',
    topic: 'Window Functions',
    description:
      'For each month in 2023, calculate total order revenue and compare it to the previous month. Show: month, revenue, previous month revenue, and the change amount.',
    hint: "Use strftime('%Y-%m', order_date) to group by month. Use LAG() to get previous month's value.",
    solution: "WITH monthly AS (\n  SELECT strftime('%Y-%m', order_date) AS month,\n         ROUND(SUM(total), 2) AS revenue\n  FROM orders\n  WHERE order_date LIKE '2023%'\n  GROUP BY strftime('%Y-%m', order_date)\n)\nSELECT month,\n       revenue,\n       LAG(revenue) OVER (ORDER BY month) AS prev_month,\n       ROUND(revenue - LAG(revenue) OVER (ORDER BY month), 2) AS change\nFROM monthly\nORDER BY month;",
    starterQuery: "WITH monthly AS (\n  SELECT strftime('%Y-%m', order_date) AS month,\n         ROUND(SUM(total), 2) AS revenue\n  FROM orders WHERE order_date LIKE '2023%'\n  GROUP BY strftime('%Y-%m', order_date)\n)\nSELECT month, revenue,\n       LAG(revenue) OVER (ORDER BY month) AS prev_month,\n       ROUND(revenue - LAG(revenue) OVER (ORDER BY month), 2) AS change\nFROM monthly ORDER BY month;",
  },
  {
    id: 'a05',
    title: 'Correlated Subquery',
    difficulty: 'advanced',
    topic: 'Subqueries',
    description:
      'For each employee, show their salary and whether it is above or below their own department\'s average. Label it "Above Avg" or "Below Avg".',
    hint: 'Use a correlated subquery inside CASE: SELECT AVG(salary) FROM employees WHERE dept_id = e.dept_id',
    solution: "SELECT e.name,\n       d.dept_name,\n       e.salary,\n       ROUND((SELECT AVG(salary) FROM employees WHERE dept_id = e.dept_id), 2) AS dept_avg,\n       CASE WHEN e.salary >= (SELECT AVG(salary) FROM employees WHERE dept_id = e.dept_id)\n            THEN 'Above Avg'\n            ELSE 'Below Avg'\n       END AS vs_dept\nFROM employees e\nJOIN departments d ON e.dept_id = d.dept_id\nORDER BY d.dept_name, e.salary DESC;",
    starterQuery: "SELECT e.name, d.dept_name, e.salary,\n  ROUND((SELECT AVG(salary) FROM employees WHERE dept_id = e.dept_id), 2) AS dept_avg,\n  CASE WHEN e.salary >= (SELECT AVG(salary) FROM employees WHERE dept_id = e.dept_id)\n       THEN 'Above Avg' ELSE 'Below Avg'\n  END AS vs_dept\nFROM employees e\nJOIN departments d ON e.dept_id = d.dept_id\nORDER BY d.dept_name, e.salary DESC;",
  },
  {
    id: 'a06',
    title: 'Multi-step CTE Pipeline',
    difficulty: 'advanced',
    topic: 'CTEs',
    description:
      'Find which sales representative (employees in Dept 3, Sales) generated the most revenue for TechCorp. Show rep name, number of orders handled, and total revenue.',
    hint: 'JOIN employees (dept_id=3) → orders → SUM(total). Group by employee.',
    solution: "WITH sales_reps AS (\n  SELECT emp_id, name FROM employees WHERE dept_id = 3\n),\nrep_sales AS (\n  SELECT o.emp_id,\n         COUNT(*)          AS orders_handled,\n         ROUND(SUM(o.total), 2) AS total_revenue\n  FROM orders o\n  WHERE o.status != 'cancelled'\n  GROUP BY o.emp_id\n)\nSELECT s.name,\n       r.orders_handled,\n       r.total_revenue\nFROM sales_reps s\nJOIN rep_sales r ON s.emp_id = r.emp_id\nORDER BY r.total_revenue DESC;",
    starterQuery: "WITH sales_reps AS (\n  SELECT emp_id, name FROM employees WHERE dept_id = 3\n),\nrep_sales AS (\n  SELECT o.emp_id, COUNT(*) AS orders_handled,\n         ROUND(SUM(o.total), 2) AS total_revenue\n  FROM orders o WHERE o.status != 'cancelled'\n  GROUP BY o.emp_id\n)\nSELECT s.name, r.orders_handled, r.total_revenue\nFROM sales_reps s\nJOIN rep_sales r ON s.emp_id = r.emp_id\nORDER BY r.total_revenue DESC;",
  },
  {
    id: 'a07',
    title: 'NTILE — Salary Quartiles',
    difficulty: 'advanced',
    topic: 'Window Functions',
    description:
      'Divide all employees into 4 salary quartiles (Q1 = lowest 25%, Q4 = highest 25%). Show each employee\'s name, salary, and quartile number.',
    hint: 'Use NTILE(4) OVER (ORDER BY salary).',
    solution: "SELECT name,\n       salary,\n       NTILE(4) OVER (ORDER BY salary) AS quartile\nFROM employees\nORDER BY salary;",
    starterQuery: "SELECT name,\n       salary,\n       NTILE(4) OVER (ORDER BY salary) AS quartile\nFROM employees\nORDER BY salary;",
  },
  {
    id: 'a08',
    title: 'Product Sales Report',
    difficulty: 'advanced',
    topic: 'Multi-table JOIN',
    description:
      'Generate a product sales report: for each product, show product name, category, number of times it was ordered, total units sold, and total revenue. Sort by revenue descending.',
    hint: 'JOIN products → order_items. Group by product. SUM(quantity) and SUM(quantity * unit_price).',
    solution: "SELECT p.name,\n       p.category,\n       COUNT(DISTINCT oi.order_id) AS times_ordered,\n       SUM(oi.quantity) AS units_sold,\n       ROUND(SUM(oi.quantity * oi.unit_price), 2) AS revenue\nFROM products p\nLEFT JOIN order_items oi ON p.prod_id = oi.prod_id\nGROUP BY p.prod_id, p.name, p.category\nORDER BY revenue DESC;",
    starterQuery: "SELECT p.name, p.category,\n       COUNT(DISTINCT oi.order_id) AS times_ordered,\n       SUM(oi.quantity) AS units_sold,\n       ROUND(SUM(oi.quantity * oi.unit_price), 2) AS revenue\nFROM products p\nLEFT JOIN order_items oi ON p.prod_id = oi.prod_id\nGROUP BY p.prod_id, p.name, p.category\nORDER BY revenue DESC;",
  },
]

export const DIFFICULTY_COLORS: Record<Difficulty, string> = {
  beginner:     'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300',
  intermediate: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300',
  advanced:     'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300',
}
