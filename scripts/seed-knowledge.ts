import 'dotenv/config';
import { Store } from '../server/db.js';
import { seedKnowledge } from '../server/knowledge.js';

const store = new Store(process.env.DATABASE_PATH || './data/riftborne.db');
seedKnowledge(store);
console.log(`Knowledge ready: ${store.searchFacts('', '', 500).length} versioned facts.`);
store.close();
