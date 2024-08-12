import { Injectable } from '@angular/core';
import { CardComponent } from '../app/components/card/card.component';
import { EbookModel } from '../models/ebook.model';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  cards: EbookModel[] = [
    {
      id: Date.now().toString(),
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      detail:
        "The Great Gatsby is a 1925 novel by American writer F. Scott Fitzgerald. Set in the Jazz Age on Long Island, near New York City, the novel depicts first-person narrator Nick Carraway's interactions with mysterious millionaire Jay Gatsby and Gatsby's obsession to reunite with his former lover, Daisy Buchanan.",
      image:
        'https://images-na.ssl-images-amazon.com/images/I/51cZ1J2J8HL._SX331_BO1,204,203,200_.jpg',
      date: '1925',
      view: 100,
      like: 50,
      pdf: '',
    },
  ];

  constructor() {}
}
