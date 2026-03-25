export interface SystemDesignCase {
  id: string
  icon: string
  title: { en: string; zh: string }
  difficulty: 'Easy' | 'Medium' | 'Hard'
  category: string
  overview: { en: string; zh: string }
  requirements: {
    functional: string[]
    nonFunctional: string[]
  }
  components: { name: string; role: string }[]
  diagram: string
  keyDecisions: { question: string; answer: string }[]
  interviewTips: string[]
  relatedCompanies: string[]
}

export const systemDesignCases: SystemDesignCase[] = [
  {
    id: 'url-shortener',
    icon: '🔗',
    title: { en: 'URL Shortener', zh: 'URL 短链服务' },
    difficulty: 'Easy',
    category: 'Storage / Encoding',
    overview: {
      en: 'Design a service like bit.ly that converts long URLs into short codes and redirects users when they visit the short link.',
      zh: '设计类似 bit.ly 的短链接服务，将长 URL 转换为短码并在访问时重定向。',
    },
    requirements: {
      functional: [
        'Given a long URL, generate a unique short URL',
        'Redirect short URL to original long URL',
        'Optional: custom alias, expiry time, analytics',
      ],
      nonFunctional: [
        '100:1 read/write ratio — optimize for reads',
        'Redirect latency < 10ms (cache-first)',
        'Short codes must be unique and non-guessable',
        '100M URLs/day write, 10B reads/day',
      ],
    },
    components: [
      { name: 'API Gateway', role: 'Routes POST /shorten and GET /:code requests' },
      { name: 'Encoding Service', role: 'Generates unique 7-char base62 short code' },
      { name: 'KV Store (Redis)', role: 'Caches code→URL mapping for hot reads' },
      { name: 'SQL/NoSQL DB', role: 'Persistent storage for all URL mappings' },
      { name: 'Counter Service', role: 'Distributed ID generation (Snowflake / Zookeeper)' },
    ],
    diagram: `Client
  │
  ├─ POST /shorten ──→ API Gateway ──→ Encoding Service ──→ DB (write)
  │                                            │
  │                                        Redis (cache)
  │
  └─ GET /:code ──→ API Gateway ──→ Redis (hit?) ──→ DB (miss)
                                        │
                                    HTTP 301/302 Redirect`,
    keyDecisions: [
      {
        question: 'Hash collision: what if two URLs get the same code?',
        answer: 'Append a random suffix and retry, or use a globally unique counter (base62-encode a Snowflake ID) which guarantees no collision.',
      },
      {
        question: '301 vs 302 redirect?',
        answer: '301 is permanent (browser caches it, reduces server load). 302 is temporary (every request hits server, better for analytics tracking).',
      },
      {
        question: 'How to handle 10B reads/day efficiently?',
        answer: 'Redis cache with LRU eviction. Hot URLs stay in memory. Cache hit rate ~80% drops DB load to 2B req/day.',
      },
    ],
    interviewTips: [
      'Start with back-of-envelope: 100M writes/day = ~1160 writes/sec, 10B reads/day = ~115K reads/sec',
      'Mention base62 (a-z, A-Z, 0-9) — 62^7 = 3.5 trillion unique codes',
      'Discuss DB schema: id, long_url, short_code, created_at, expires_at, user_id',
      'Bonus: analytics table tracking clicks by time/region',
    ],
    relatedCompanies: ['Google', 'Meta', 'Twitter', 'Amazon'],
  },
  {
    id: 'rate-limiter',
    icon: '🚦',
    title: { en: 'Rate Limiter', zh: '限流器' },
    difficulty: 'Medium',
    category: 'Middleware / Distributed',
    overview: {
      en: 'Design a rate limiter that throttles API requests per user/IP to prevent abuse, ensure fair usage, and protect downstream services.',
      zh: '设计限流中间件，限制每个用户/IP 的 API 请求速率，防止滥用并保护下游服务。',
    },
    requirements: {
      functional: [
        'Limit requests per user: e.g. 100 req/min',
        'Return HTTP 429 when limit exceeded',
        'Support multiple rule types (per user, per IP, per endpoint)',
      ],
      nonFunctional: [
        'Latency overhead < 1ms',
        'Works across multiple API server instances',
        'Rules configurable without redeployment',
      ],
    },
    components: [
      { name: 'Rate Limiter Middleware', role: 'Intercepts every request before it reaches the API handler' },
      { name: 'Redis (atomic ops)', role: 'Stores counters/timestamps; INCR + EXPIRE for fixed window; sorted sets for sliding window' },
      { name: 'Rule Config Service', role: 'Loads rate limit rules from DB/config; cached in-memory' },
      { name: 'Response Headers', role: 'X-RateLimit-Limit, X-RateLimit-Remaining, Retry-After' },
    ],
    diagram: `Client Request
      │
      ▼
Rate Limiter Middleware
      │
      ├─ Load rule ──→ Rule Cache (in-memory)
      │
      ├─ Check counter ──→ Redis
      │         │
      │    [within limit]  [exceeded]
      │         │               │
      ▼         ▼               ▼
   API Handler            HTTP 429 + Retry-After`,
    keyDecisions: [
      {
        question: 'Which algorithm to use?',
        answer: 'Token Bucket: smooth bursts, memory-efficient. Sliding Window Log: precise but O(n) memory per user. Fixed Window Counter: simplest, O(1), but boundary burst problem. Sliding Window Counter: best balance of accuracy and efficiency.',
      },
      {
        question: 'How to make it distributed (multiple API servers)?',
        answer: 'Centralized Redis with Lua script for atomic check-and-increment. Lua script runs atomically on Redis server — no race conditions. Alternative: Redis cluster with consistent hashing.',
      },
      {
        question: 'What if Redis goes down?',
        answer: 'Fail-open (allow requests, log warning) for availability-critical services. Fail-closed (reject requests) for security-critical APIs. Local in-memory fallback with shorter window.',
      },
    ],
    interviewTips: [
      'Know all 4 algorithms cold: Token Bucket, Leaky Bucket, Fixed Window, Sliding Window',
      'Redis INCR + EXPIRE: INCR returns new value; if == 1, set EXPIRE. Atomic with Lua or pipeline',
      'Mention client-side best practices: exponential backoff with jitter',
      'For Bloomberg: financial APIs use rate limiting heavily for data subscription tiers',
    ],
    relatedCompanies: ['Bloomberg', 'Stripe', 'Cloudflare', 'Uber'],
  },
  {
    id: 'news-feed',
    icon: '📰',
    title: { en: 'News Feed (Twitter/Instagram)', zh: '社交动态流' },
    difficulty: 'Medium',
    category: 'Feed / Fan-out',
    overview: {
      en: 'Design a social news feed where users see posts from people they follow, in reverse-chronological or ranked order.',
      zh: '设计社交动态流，用户可以看到关注者的帖子，按时间倒序或算法排序。',
    },
    requirements: {
      functional: [
        'Post a tweet/status (text, images)',
        'Follow / unfollow users',
        'View home feed: posts from followed users',
        'Like, comment, repost',
      ],
      nonFunctional: [
        'Feed load < 200ms',
        '300M DAU, 500M tweets/day',
        'Celebrity problem: some users have 100M+ followers',
      ],
    },
    components: [
      { name: 'Post Service', role: 'Handles creating/deleting posts; writes to Posts DB' },
      { name: 'Fan-out Service', role: 'Pushes new posts to followers feed caches (fan-out on write)' },
      { name: 'Feed Cache (Redis)', role: 'Stores pre-computed feed list (post IDs) per user; sorted by time' },
      { name: 'Message Queue (Kafka)', role: 'Decouples post creation from fan-out; absorbs write spikes' },
      { name: 'Graph Service', role: 'Stores follower/following relationships (adjacency list in DB + cache)' },
      { name: 'Media CDN', role: 'Stores and serves images/videos from edge nodes' },
    ],
    diagram: `User posts tweet
        │
        ▼
   Post Service ──→ Posts DB
        │
        ▼
   Kafka Queue
        │
        ▼
   Fan-out Workers (async)
        │
        ├─ [Normal users <10K followers] ──→ push to each follower's Feed Cache
        │
        └─ [Celebrities >10K followers] ──→ skip fan-out (pull on read)

User reads feed
        │
        ▼
   Feed Service ──→ Feed Cache (get post IDs) ──→ Post Service (hydrate)
                         │
                    [celebrity posts merged at read time]`,
    keyDecisions: [
      {
        question: 'Fan-out on write vs fan-out on read?',
        answer: 'Fan-out on write: pre-compute feed, fast reads, expensive for celebrities. Fan-out on read: always fresh, slow for active users. Hybrid: fan-out on write for normal users, pull on read for celebrities (>10K followers).',
      },
      {
        question: 'How to store the feed?',
        answer: 'Redis sorted set per user: ZADD feed:{userId} timestamp postId. Cap at 1000 posts. TTL 7 days for inactive users.',
      },
      {
        question: 'How to handle the celebrity problem?',
        answer: 'Do not fan-out celebrity posts to 100M feeds. Instead, when reading, merge the user\'s pre-computed feed with a real-time pull of the top N celebrities they follow.',
      },
    ],
    interviewTips: [
      'Always mention the celebrity/hotspot problem — interviewers love this',
      'Kafka decouples write path from fan-out, enabling horizontal scaling',
      'Feed pagination: cursor-based (last seen post ID), not page numbers',
      'Ranking feed: add ML scoring layer — move from sorted-by-time to scored list',
    ],
    relatedCompanies: ['Twitter/X', 'Instagram', 'LinkedIn', 'TikTok'],
  },
  {
    id: 'order-book',
    icon: '📊',
    title: { en: 'Order Book / Matching Engine', zh: '订单簿 / 撮合引擎' },
    difficulty: 'Hard',
    category: 'Financial Systems (Bloomberg)',
    overview: {
      en: 'Design a financial order book for a stock exchange. Accept buy/sell orders, match them by price-time priority, and publish trade executions.',
      zh: '设计金融交易所的订单簿，接受买卖订单，按价格-时间优先级撮合，并发布成交结果。',
    },
    requirements: {
      functional: [
        'Accept limit orders (buy/sell at specific price) and market orders',
        'Match orders: highest bid meets lowest ask',
        'Cancel existing orders by order ID',
        'Publish real-time order book state and trade executions',
      ],
      nonFunctional: [
        'Ultra-low latency: < 1 microsecond matching time',
        'Strict ordering: no out-of-order matches',
        'High throughput: 1M orders/sec for major exchanges',
        'Fault tolerance: no order loss',
      ],
    },
    components: [
      { name: 'Order Gateway', role: 'Validates and sequences incoming orders via FIX protocol' },
      { name: 'Matching Engine (single-threaded)', role: 'Core: TreeMap<price, Queue<Order>> for bids and asks' },
      { name: 'Order Book (in-memory)', role: 'Bids: max-heap by price. Asks: min-heap by price. Each level: FIFO queue' },
      { name: 'Trade Publisher', role: 'Publishes executions to Kafka → downstream systems (risk, clearing)' },
      { name: 'Market Data Feed', role: 'Publishes BBO (best bid/offer) and full depth to subscribers' },
      { name: 'Persistence (WAL)', role: 'Write-ahead log for recovery; replay to rebuild order book state' },
    ],
    diagram: `Order Input (FIX Protocol)
        │
        ▼
  Order Gateway (validate, sequence)
        │
        ▼
  ┌─────────────────────────────────┐
  │       Matching Engine            │
  │   (single-threaded, in-memory)   │
  │                                  │
  │  BIDS          ASKS              │
  │  [100.5] ←──→ [100.6]           │
  │  [100.4]       [100.7]           │
  │  [100.3]       [100.8]           │
  │  TreeMap DESC  TreeMap ASC       │
  └─────────────────────────────────┘
        │
        ├─→ Trade Executions ──→ Kafka ──→ Clearing / Risk
        │
        └─→ Market Data Feed ──→ Subscribers`,
    keyDecisions: [
      {
        question: 'Why single-threaded matching engine?',
        answer: 'Eliminates concurrency bugs and lock contention. One thread processes orders sequentially — deterministic and auditable. Speed comes from in-memory TreeMap operations, not parallelism. Lmax DISRUPTOR pattern uses ring buffer to feed orders to the single matching thread at ~6M ops/sec.',
      },
      {
        question: 'Data structure for the order book?',
        answer: 'TreeMap<Long price, ArrayDeque<Order>> for each side. TreeMap gives O(log n) insert/delete per price level. At each price level, ArrayDeque gives O(1) enqueue/dequeue for FIFO (time priority). Total: O(log P + 1) per match, where P = number of price levels.',
      },
      {
        question: 'How to recover from a crash?',
        answer: 'Write-ahead log (WAL): persist every order event to disk before processing. On restart, replay WAL to rebuild exact in-memory order book state. Alternatively, checkpoint the full order book state periodically + replay delta log.',
      },
    ],
    interviewTips: [
      'Bloomberg asks this — know FIX protocol basics (order types: limit, market, IOC, FOK)',
      'Price-time priority: best price first, then FIFO within same price level',
      'Know order types: Limit, Market, IOC (Immediate-or-Cancel), FOK (Fill-or-Kill), Stop',
      'TreeMap is Java; in C++ use std::map (red-black tree). Python: sortedcontainers.SortedDict',
      'Mention Level 1 (BBO only) vs Level 2 (full depth) market data',
    ],
    relatedCompanies: ['Bloomberg', 'Goldman Sachs', 'NYSE', 'Citadel'],
  },
  {
    id: 'distributed-cache',
    icon: '⚡',
    title: { en: 'Distributed Cache', zh: '分布式缓存' },
    difficulty: 'Medium',
    category: 'Distributed Systems',
    overview: {
      en: 'Design a distributed in-memory cache like Redis or Memcached, supporting get/set/delete with TTL, high availability, and horizontal scalability.',
      zh: '设计类似 Redis/Memcached 的分布式内存缓存，支持 get/set/delete，高可用和横向扩展。',
    },
    requirements: {
      functional: [
        'get(key), set(key, value, ttl), delete(key)',
        'TTL-based automatic expiration',
        'Eviction when memory full',
      ],
      nonFunctional: [
        'Sub-millisecond latency for reads/writes',
        'Linear scalability (add nodes to increase capacity)',
        'High availability: survive node failures without data loss',
        'Eventual consistency acceptable for most use cases',
      ],
    },
    components: [
      { name: 'Client Library', role: 'Consistent hash ring to route keys to correct cache node' },
      { name: 'Cache Node Pool', role: 'N in-memory hash map nodes; each owns a ring segment' },
      { name: 'Consistent Hash Ring', role: 'Virtual nodes (vnodes) distribute keys evenly; minimal remapping on node add/remove' },
      { name: 'Replication', role: 'Each key replicated to R successor nodes on the ring for fault tolerance' },
      { name: 'Eviction Manager', role: 'LRU (doubly linked list + hash map), LFU (freq counter), or TTL-based expiry' },
    ],
    diagram: `Client
  │
  ▼
Client Library (consistent hash ring)
  │
  ├─ hash(key) % ring → Node A  [handles keys 0–1000]
  ├─ hash(key) % ring → Node B  [handles keys 1001–2000]
  └─ hash(key) % ring → Node C  [handles keys 2001–3000]

Node failure:
  Node B dies → Node B's range redistributed to Node C
  Only ~1/N keys remapped (vs N-1/N with modulo hashing)

Replication: key written to primary node + R-1 successors`,
    keyDecisions: [
      {
        question: 'Why consistent hashing instead of key % N?',
        answer: 'With key % N, adding/removing 1 node remaps ~N-1/N keys (catastrophic cache invalidation). Consistent hashing remaps only ~1/N keys. Virtual nodes (each physical node gets 100-200 virtual positions) ensure even distribution.',
      },
      {
        question: 'LRU eviction implementation?',
        answer: 'Doubly linked list (order by recency) + HashMap (O(1) lookup). get() moves node to head. set() adds to head, evicts tail when over capacity. Redis uses approximated LRU (sample 5 random keys, evict least recent) — much simpler and nearly as effective.',
      },
      {
        question: 'Write strategies: which to use?',
        answer: 'Write-through: write to cache AND DB synchronously — strong consistency, higher write latency. Write-back: write to cache, async to DB — fast writes, risk of data loss. Write-around: skip cache on write, cache on first read — good for write-heavy, infrequently-re-read data.',
      },
    ],
    interviewTips: [
      'Know consistent hashing cold — it appears in almost every distributed systems question',
      'LRU = HashMap + Doubly Linked List. Code this by heart for coding rounds',
      'Thundering herd on cache miss: use mutex/locking per key or probabilistic early expiration',
      'Redis single-threaded: uses I/O multiplexing (epoll), not multi-threading, for concurrency',
    ],
    relatedCompanies: ['Google', 'Meta', 'Amazon', 'Netflix'],
  },
  {
    id: 'real-time-chat',
    icon: '💬',
    title: { en: 'Real-time Chat (WhatsApp/Slack)', zh: '即时通讯系统' },
    difficulty: 'Hard',
    category: 'Real-time / WebSocket',
    overview: {
      en: 'Design a real-time messaging system supporting 1-on-1 and group chat, with message delivery guarantees and offline queuing.',
      zh: '设计支持单聊和群聊的实时消息系统，具备消息送达保证和离线消息队列。',
    },
    requirements: {
      functional: [
        'Send and receive 1-on-1 messages in real-time',
        'Group chats (up to 1000 members)',
        'Message delivery receipts: sent, delivered, read',
        'Offline message queuing — deliver when user reconnects',
      ],
      nonFunctional: [
        'End-to-end latency < 100ms for online users',
        '500M DAU, 100B messages/day',
        'Message ordering preserved per conversation',
        'At-least-once delivery guarantee',
      ],
    },
    components: [
      { name: 'WebSocket Server Pool', role: 'Maintains persistent connections; each server holds ~100K connections' },
      { name: 'Connection Manager (Redis)', role: 'Maps userId → WebSocket server; lookup to route messages' },
      { name: 'Message Queue (Kafka)', role: 'Durable ordered message log per conversation; enables replay/recovery' },
      { name: 'Message Store (Cassandra)', role: 'Stores all messages; partitioned by conversation_id for fast range scans' },
      { name: 'Notification Service', role: 'Sends push notifications (APNs/FCM) to offline users' },
      { name: 'Presence Service', role: 'Tracks online/offline status via WebSocket heartbeats' },
    ],
    diagram: `User A sends message to User B
        │
        ▼
  WebSocket Server A (A is connected here)
        │
        ├─→ Message Store (Cassandra) — persist
        │
        ├─→ Kafka topic: conv_{conv_id}
        │
        ▼
  Message Router (looks up B's server in Redis)
        │
        ├─ [B is online] ──→ WebSocket Server B ──→ User B
        │
        └─ [B is offline] ──→ Offline Queue ──→ Push Notification (FCM/APNs)
                                    │
                               [B reconnects] ──→ Pull unread messages`,
    keyDecisions: [
      {
        question: 'How to route a message from Server A to Server B where the recipient is connected?',
        answer: 'Redis stores {userId: serverAddress}. When User B connects to Server B, it registers in Redis. When Server A receives a message for User B, it looks up Redis to find Server B\'s address, then forwards via internal gRPC/HTTP. If User B is on the same server, deliver directly.',
      },
      {
        question: 'Message ordering in group chat?',
        answer: 'Assign a monotonically increasing sequence number per conversation (using a Snowflake-like ID or Cassandra TIMEUUID). Client reconciles gaps. Kafka topic per conversation guarantees ordering within partition.',
      },
      {
        question: 'Exactly-once vs at-least-once delivery?',
        answer: 'At-least-once is easier and sufficient. Client deduplicates by message ID. Sender retries until ACK received. Store message_id in Redis with short TTL to detect duplicates on receipt.',
      },
    ],
    interviewTips: [
      'WebSocket vs HTTP long-polling: WebSocket is bidirectional, lower overhead; long-polling is simpler, HTTP-compatible',
      'WhatsApp uses XMPP over WebSocket. Slack uses WebSocket with custom protocol',
      'End-to-end encryption: Signal Protocol — key exchange happens on device, server never sees plaintext',
      'Cassandra schema: PRIMARY KEY ((conversation_id), message_timestamp) — fast range scan for history',
    ],
    relatedCompanies: ['Meta/WhatsApp', 'Slack', 'Discord', 'Bloomberg Terminal'],
  },
]
