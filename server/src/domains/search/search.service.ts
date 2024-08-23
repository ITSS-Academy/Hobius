import { Injectable } from '@nestjs/common';
import { Client } from '@elastic/elasticsearch';
import { Ebook } from '../ebooks/entities/ebook.entity';

@Injectable()
export class SearchService {
  private readonly esClient: Client;

  constructor() {
    this.esClient = new Client({
      node: 'https://es.ext.akademy.dev',
    });

    console.log('esClient', this.esClient);
  }

  async indexEbook(ebook: Ebook) {
    await this.esClient.index({
      index: 'hobius_ebooks',
      id: ebook.id,
      document: {
        id: ebook.id,
        title: ebook.title,
        author: ebook.author,
        detail: ebook.detail,
      },
    });
  }

  async searchEbooks(query: string) {
    // search for profiles by username or email or uid
    const response = await this.esClient.search({
      index: 'hobius_ebooks',
      query: {
        multi_match: {
          query: query,
          fields: ['username', 'email', 'uid'],
        },
      },
    });
    return response.hits.hits;
  }

  async updateEbook(ebook: Ebook) {
    // delete first
    await this.deletePost(ebook.id);
    // index
    await this.indexEbook(ebook);
  }

  async deletePost(postId: string) {
    await this.esClient.delete({
      index: 'hobius_ebooks',
      id: postId,
    });
  }

  async searchAny(indexName: string, query: string) {
    try {
      const response = await this.esClient.search({
        index: [indexName],
        query: {
          multi_match: {
            query: query,
            fields: ['*'],
          },
        },
      });
      return response.hits.hits.map((hit) => hit['_source']);
    } catch (e) {
      return [];
    }
  }
}
