import { Injectable } from '@nestjs/common';
import { ChromaClient, IncludeEnum } from 'chromadb';
import { Collection } from './chromatypes';

@Injectable()
export class RecommendationsService {
  private readonly client: ChromaClient;
  // Somebody not asleep, can we have type here?
  private collection: Collection;

  constructor() {
    console.log('starting RecommendationsService');

    this.client = new ChromaClient();
    this.init().catch((err) => {
      console.error('RecommendationsService failed to initialize', err);
    });
  }

  private async init() {
    this.client.deleteCollection({ name: 'recommendations' });
    this.collection = (await this.client.getOrCreateCollection({
      name: 'recommendations',
      metadata: { 'hnsw:space': 'cosine' },
    })) as unknown as Collection;
    // TODO: remove these hardcoded entries
    await this.collection.add({
      ids: ['1', '2', '3'],
      documents: ['skiing', 'snowboarding', 'hiking'],
    });
    const count = await this.collection.count();
    console.log(
      'Recommendation Service initialized. Number of items in collection: ',
      count
    );
  }

  public async addEntries(entries: Entry[]) {
    return await this.collection.add({
      ids: entries.map((entry) => entry.id),
      documents: entries.map((entry) => entry.document),
    });
  }

  public async getRecommendationsByString(query: string, nResults = 5) {
    const results = await this.collection.query({
      queryTexts: query,
      nResults,
    });
    return results;
  }

  public async getEntriesByIds(ids: string[]) {
    return await this.collection.get({
      ids,
      include: ['embeddings' as IncludeEnum.Embeddings],
    });
  }

  public async getSimilarEntries(ids: string[], nResults = 5) {
    const entries = await this.getEntriesByIds(ids);
    const results = await this.collection.query({
      queryEmbeddings: entries.embeddings,
      nResults,
    });

    return results;
  }
}

interface Entry {
  id: string;
  document: string;
}
