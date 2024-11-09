import { Injectable } from '@nestjs/common';
import { ChromaClient } from 'chromadb';

@Injectable()
export class RecommendationsService {
  private readonly client: ChromaClient;
  private collection;

  constructor() {
    console.log('starting RecommendationsService');

    this.client = new ChromaClient();
    this.init()
      .then(() => {
        console.log('RecommendationsService initialized');
      })
      .catch((err) => {
        console.error('RecommendationsService failed to initialize', err);
      });
  }

  private async init() {
    this.collection = await this.client.getOrCreateCollection({
      name: 'recommendations',
    });
    this.collection.add({
      ids: ['1', '2'],
      documents: ['This text says hello', 'this text says goodbye'],
    });
  }

  public async addEntries(entries: Entry[]) {
    return await this.collection.add({
      ids: entries.map((entry) => entry.id),
      documents: entries.map((entry) => entry.document),
    });
  }

  public async getRecommendationsByString(
    query: string,
    nResults = 2
  ): Promise<string[]> {
    const results = await this.collection.query({
      queryTexts: query, // Chroma will embed this for you
      nResults, // how many results to return
    });
    console.log('results', results.documents);
    return results.documents;
  }
}

interface Entry {
  id: string;
  document: string;
}
