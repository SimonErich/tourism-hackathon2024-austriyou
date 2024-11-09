import { ChromaClient } from 'chromadb';

const client = new ChromaClient();

const collection = await client.createCollection({
  name: 'recommendations',
});

interface Entry {
  id: string;
  document: string;
}

export async function addEntries(entries: Entry[]) {
  return await collection.add({
    ids: entries.map((entry) => entry.id),
    documents: entries.map((entry) => entry.document),
  });
}

export async function getRecommendationsByString(query: string, nResults = 2) {
  const results = await collection.query({
    queryTexts: query, // Chroma will embed this for you
    nResults, // how many results to return
  });

  return results;
}
