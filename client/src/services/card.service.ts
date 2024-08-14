import { Injectable } from '@angular/core';
import { CardComponent } from '../app/components/card/card.component';
import { EbookModel } from '../models/ebook.model';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  cards: EbookModel[] = [
    {
      id: '1',
      title: 'The Hobbit',
      author: 'J. R. R. Tolkien',
      detail:
        "The Hobbit is the unforgettable story of Bilbo, a peace-loving hobbit, who embarks on a strange and magical adventure. A timeless classic. Bilbo Baggins enjoys a quiet and contented life, with no desire to travel far from the comforts of home; then one day the wizard Gandalf and a band of dwarves arrive unexpectedly and enlist his services - as a burglar - on a dangerous expedition to raid the treasure-hoard of Smaug the dragon. Bilbo's life is never to be the same again. Seldom has any book been so widely read and loved as J. R.R. Tolkien's classic tale, 'The Hobbit'. Since its first publication in 1937 it has remained in print to delight each new generation of readers all over the world, and its hero, Bilbo Baggins, has taken his place among the ranks of the immortals of fiction.",
      image: 'public/assets/books-img/theHobbit.png',
      date: '06/07/2012',
      view: 100,
      like: 50,
      pdf: '',
      genre: ['Fiction', 'fantasy', 'Children'],
    },
    {
      id: '2',
      title: 'Azathoth',
      author: 'H.P. Lovecraft',
      detail:
        'When age fell upon the world, and wonder went out of the minds of men; when grey cities reared to smoky skies tall towers grim and ugly, in whose shadow none might dream of the sun or of spring’s flowering meads; when learning stripped earth of her mantle of beauty, and poets sang no more save of twisted phantoms seen with bleared and inward-looking eyes; when these things had come to pass, and childish hopes had gone away forever, there was a man who travelled out of life on a quest into the spaces whither the world’s dreams had fled.',
      image: 'public/assets/books-img/azathoth.png',
      date: '8/20/2009',
      view: 200,
      like: 100,
      pdf: '',
      genre: ['Horror', 'Fiction', 'Short Stories', 'Fantasy'],
    },
    {
      id: '3',
      title: 'The Charm Offensive',
      author: 'Alison Cochrun',
      detail:
        'Dev Deshpande has always believed in fairy tales. So it’s no wonder then that he’s spent his career crafting them on the long-running reality dating show Ever After. As the most successful producer in the franchise’s history, Dev always scripts the perfect love story for his contestants, even as his own love life crashes and burns. But then the show casts disgraced tech wunderkind Charlie Winshaw as its star.',
      image: 'public/assets/books-img/theCharmOffensive.png',
      date: '2021',
      view: 300,
      like: 150,
      pdf: '',
      genre: ['Romance', 'LGBT', 'Contemporary'],
    },
    {
      id: '4',
      title: 'The God Of The Woods',
      author: 'Liz Moore',
      detail:
        'Early morning, August 1975: a camp counselor discovers an empty bunk. Its occupant, Barbara Van Laar, has gone missing. Barbara isn’t just any thirteen-year-old: she’s the daughter of the family that owns the summer camp and employs most of the region’s residents. And this isn’t the first time a Van Laar child has disappeared. Barbara’s older brother similarly vanished fourteen years ago, never to be found.',
      image: 'public/assets/books-img/theGodOfTheWoods.png',
      date: 'July 2, 2024',
      view: 400,
      like: 200,
      pdf: '',
      genre: ['Fiction', 'Fantasy'],
    },
    {
      id: '5',
      title: 'What Is History?',
      author: 'E.H. Carr',
      detail:
        'Who is to say how things really were? In formulating a modern answer to the question ‘What is History?’ Professor Carr shows that the ‘facts’ of history are simply those which historians have selected for scrutiny. Millions have crossed the Rubicon, but the historians tell us that only Caesar’s crossing was significant. All historical facts come to us as a result of interpretative choices by historians influenced by the standards of their age. Yet if absolute objectivity is impossible, the role of the historian need in no way suffer; nor does history lose its fascination. With lucidity, Carr casts a light on the proper function of the historian and the vital importance of history in modern society. -- Provided by publisher',
      image: 'public/assets/books-img/whatIsHistory.png',
      date: ' 1961',
      view: 500,
      like: 250,
      pdf: '',
      genre: ['History', 'Philosophy'],
    },
    {
      id: '6',
      title: 'The Invisible Hand',
      author: 'Adam Smith',
      detail:
        'Adam Smith’s landmark treatise on the free market paved the way for modern capitalism, arguing that competition is the engine of a productive society, and that self-interest will eventually come to enrich the whole community, as if by an ‘invisible hand’. Throughout history, some books have changed the world. They have transformed the way we see ourselves – and each other. They have inspired debate, dissent, war and revolution. They have enlightened, outraged, provoked and comforted. They have enriched lives – and destroyed them. Now Penguin brings you the works of the great thinkers, pioneers, radicals and visionaries whose ideas shook civilization and helped make us who we are.',
      image: 'public/assets/books-img/theInvisibleHand.png',
      date: 'January 1, 1759',
      view: 600,
      like: 300,
      pdf: '',
      genre: ['Economics', 'Philosophy', 'Business'],
    },
    {
      id: '7',
      title: 'The Wonderful Things You Will Be',
      author: 'E.W Martin',
      detail:
        'The New York Times bestseller that celebrates the dreams, acceptance, and love that parents have for their children . . . now and forever. This is the perfect heartfelt gift for kids of all ages, plus a great choice for baby showers, birthdays, graduations, and other new beginnings!',
      image: 'public/assets/books-img/theWonderfulThingsYouWillBe.png',
      date: 'August 25, 2015',
      view: 700,
      like: 350,
      pdf: '',
      genre: ['Picture Book', 'Children', 'Family'],
    },
    {
      id: '8',
      title: 'Be Smart Investor',
      author: 'Warren Buffet',
      detail:
        'The greatest investment advisor of the twentieth century, Benjamin Graham, taught and inspired people worldwide. Graham\'s philosophy of "value investing" -- which shields investors from substantial error and teaches them to develop long-term strategies -- has made The Intelligent Investor the stock market bible ever since its original publication in 1949.',
      image: 'public/assets/books-img/beSmartInvestor.png',
      date: 'February 21, 2006',
      view: 800,
      like: 400,
      pdf: '',
      genre: ['Economics', 'Investing'],
    },
    {
      id: '9',
      title: 'Hamlet',
      author: 'William Shakespeare',
      detail:
        'Among Shakespeare\'s plays, "Hamlet" is considered by many his masterpiece. Among actors, the role of Hamlet, Prince of Denmark, is considered the jewel in the crown of a triumphant theatrical career. Now Kenneth Branagh plays the leading role and co-directs a brillant ensemble performance. Three generations of legendary leading actors, many of whom first assembled for the Oscar-winning film "Henry V", gather here to perform the rarely heard complete version of the play. This clear, subtly nuanced, stunning dramatization, presented by The Renaissance Theatre Company in association with "Bbc" Broadcasting, features such luminaries as Sir John Gielgud, Derek Jacobi, Emma Thompson and Christopher Ravenscroft. It combines a full cast with stirring music and sound effects to bring this magnificent Shakespearen classic vividly to life. Revealing new riches with each listening, this production of "Hamlet" is an invaluable aid for students, teachers and all true lovers of Shakespeare - a recording to be treasured for decades to come.',
      image: 'public/assets/books-img/Hamlet.png',
      date: '1603',
      view: 900,
      like: 450,
      pdf: '',
      genre: ['Drama', 'Classic'],
    },
    {
      id: '10',
      title: 'The Odyssey',
      author: 'Homer',
      detail:
        'Sing to me of the man, Muse, the man of twists and turns\n' +
        'driven time and again off course, once he had plundered\n' +
        'the hallowed heights of Troy.',
      image: 'public/assets/books-img/theOdyssey.png',
      date: '8th century BC',
      view: 1000,
      like: 500,
      pdf: '',
      genre: ['Epic', 'Poetry', 'Classic'],
    },
  ];

  constructor() {}
}
