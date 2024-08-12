import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SharedModule } from '../../../shared/modules/shared.module';
import { MaterialModule } from '../../../shared/modules/material.module';
import { MatTableDataSource } from '@angular/material/table';
import { EbookModel } from '../../../models/ebook.model';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { CreateFormDialogComponent } from './components/create-form-dialog/create-form-dialog.component';

/** Constants used to fill up our data base. */
export const GENRES: string[] = [
  'Adventure',
  'Science Fiction',
  'Fantasy',
  'Mystery',
  'Historical Fiction',
  'Horror',
  'Thriller',
  'Romance',
  'Westerns',
  'Dystopian',
  'Memoir',
  'Biography',
  'Self-help',
  'Cookbooks',
  'History',
  'Travel',
  'True Crime',
  'Humor',
  'Children’s',
  'Young Adult',
  'Poetry',
  'Science',
  'Nature',
  'Math',
  'Philosophy',
  'Religion',
  'Spirituality',
  'New Age',
  'Art',
  'Photography',
  'Architecture',
  'Music',
  'Film',
  'Fashion',
  'Performing Arts',
  'Graphic Novels',
  'Manga',
];
const NAMES: string[] = [
  'Around the World in Eighty Days',
  'The War of the Worlds',
  'The Time Machine',
  'The Invisible',
  'The Island of Doctor Moreau',
  'The First',
  'The Lost World',
  'The Call of the Wild',
  'The Picture of Dorian Gray',
  'The Adventures of Sherlock Holmes',
  'The Hound of the Baskervilles',
  'The Sign of the Four',
  'The Valley of Fear',
  'The Adventures of Tom Sawyer',
  'The Adventures of Huckleberry Finn',
  'The Prince and the Pauper',
  "A Connecticut Yankee in King Arthur's Court",
  "The Tragedy of Pudd'nhead Wilson",
  'The Innocents Abroad',
  'Roughing It',
  'The Gilded Age',
  'A Tramp Abroad',
  'Life on the Mississippi',
  'Alice in Wonderland',
  'Through the Looking Glass',
  'The Hunting of the Snark',
  'The Secret Garden',
  'A Little Princess',
  'Little Lord Fauntleroy',
  'The Lost Prince',
  'The Railway Children',
  'Five Children and It',
  'The Phoenix and the Carpet',
  'The Story of the Amulet',
  'The Enchanted Castle',
  'Hard Times',
  'Great Expectations',
  'A Christmas Carol',
  'Oliver Twist',
  'David Copperfield',
  'Bleak House',
  'Little Dorrit',
  'The Pickwick Papers',
  'Our Mutual Friend',
  'The Old Curiosity Shop',
  'Nicholas Nickleby',
  'Martin Chuzzlewit',
  'Dombey and Son',
  'The Mystery of Edwin Drood',
  'The Chimes',
  'The Cricket on the Hearth',
  'The Battle of Life',
  'The Ha',
  'Gone with the Wind',
  'The Great Gatsby',
  'To Kill a Mockingbird',
  'The Catcher in the Rye',
  'The Grapes of Wrath',
  'The Lord of the Rings',
  'The Hobbit',
  'The Silmarillion',
  'The Two Towers',
  'The Return of the King',
  'The Fellowship of the Ring',
  'The Adventures of Huckleberry Finn',
  'The Good Earth',
  'The Sun Also Rises',
  'The Old',
  'The Godfather',
  'The Godfather Returns',
  "The Godfather's Revenge",
  "Harry Potter and the Philosopher's Stone",
  'Harry Potter and the Chamber of Secrets',
  'Harry Potter and the Prisoner of Azkaban',
  'Harry Potter and the Goblet of Fire',
  'Harry Potter and the Order of the Phoenix',
  'Harry Potter and the Half-Blood Prince',
  'Harry Potter and the Deathly Hallows',
  'The Da Vinci Code',
  'Angels & Demons',
  'The Lost Symbol',
  'Inferno',
  'Origin',
  'Digital Fortress',
  'Deception Point',
  'The Hunger Games',
  'Catching Fire',
  'Mockingjay',
  'The Ballad of Songbirds and Snakes',
  'The Maze Runner',
  'The Scorch Trials',
  'The Death Cure',
  'The Kill Order',
  'The Fever Code',
  'The Outsiders',
  'That Was Then, This Is Now',
  'Rumble Fish',
  'Tex',
  'Taming the Star Runner',
  'Holes',
  'Small Steps',
  'Wayside School is Falling Down',
  'Wayside School Gets a Little Stranger',
  'Sideways Stories from Wayside School',
  'The Giver',
  'Gathering Blue',
  'Messenger',
  'Son',
  'Number the Stars',
  'Anastasia Krupnik',
  'The Giver',
  'Finale',
  'Caraval',
  'Shatter Me',
  'Restore Me',
  'Ignite Me',
  'Unravel Me',
  'Defy Me',
  'Destroy Me',
  'The Selection',
  'The Elite',
  'The One',
  'The Heir',
  'The Crown',
  'The Prince',
  'The Guard',
  'The Queen',
  'The Favorite',
  'The Siren',
  'The Betrothed',
  'The Traitor',
  'The Queen of Nothing',
  'The Wicked King',
  'The Cruel Prince',
  'The Lost Sisters',
  'The Darkest Part of the Forest',
  'The Col',
  'Green Eggs and Ham',
  'The Cat in the Hat',
  'One Fish Two Fish Red Fish Blue Fish',
  'Horton Hears a Who!',
  'How the Grinch Stole Christmas!',
  'Fox in Socks',
  'The Lorax',
  'Oh, the Places You’ll Go!',
  'The Sneetches and Other Stories',
  'Dr. Seuss’s Sleep Book',
  'Hop on Pop',
  'Scrambled Eggs Super!',
  'The Butter Battle Book',
  'I Had Trouble in Getting to Solla Sollew',
  'If I Ran the Circus',
  'If I Ran the Zoo',
  'The 500 Hats of Bartholomew Cubbins',
  'The King’s Stilts',
  'McElligot’s Pool',
  'On Beyond Zebra!',
  'Thidwick the Big-Hearted Moose',
  'Yertle the Turtle and Other Stories',
  'Bartholomew and the Oobleck',
  'Daisy-Head Mayzie',
  'Did I Ever Tell You How Lucky You Are?',
  'Dr. Seuss’s ABC',
  'Gerald McBoing Boing',
  'Happy Birthday to You!',
  'Horton Hatches the Egg',
];
const AUTHORS: string[] = [
  'Jules Verne',
  'H.G. Wells',
  'Oscar Wilde',
  'Arthur Conan Doyle',
  'Mark Twain',
  'Frances Hodgson Burnett',
  'Charles Dickens',
  'Margaret Mitchell',
  'F. Scott Fitzgerald',
  'Harper Lee',
  'J.R.R. Tolkien',
  'John Steinbeck',
  'Mario Puzo',
  'J.K. Rowling',
  'Dan Brown',
  'Suzanne Collins',
  'James Dashner',
  'S.E. Hinton',
  'Lois Lowry',
  'Stephanie Garber',
  'Tahereh Mafi',
  'Kiera Cass',
];

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [SharedModule, MaterialModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent implements AfterViewInit {
  //table
  displayedColumns: string[] = [
    'select',
    // 'id',
    'image',
    'title',
    'author',
    'detail',
    'view',
    'like',
    'genre',
  ];
  dataSource: MatTableDataSource<EbookModel>;
  selection = new SelectionModel<EbookModel>(true, []);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  //dialog
  readonly dialog = inject(MatDialog);

  constructor() {
    // Create 100 users
    const ebooks = Array.from({ length: 100 }, (_, k) => createNewEbook(k + 1));

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(ebooks);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: EbookModel): string {
    if (!row) {
      return `${this.selection.hasValue() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${Number(row.id) + 1}`;
  }

  toggle(row: EbookModel) {
    if (this.selection.isSelected(row)) {
      // console.log(row);
      this.selection.deselect(row);
    } else {
      this.selection.clear(); // Clear all selections
      this.selection.toggle(row); // Select the clicked row
    }
    //log the checked row
    // console.log(this.selection.selected);
  }

  openCreateEbookDialog() {
    const dialogRef = this.dialog.open(CreateFormDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

/** Builds and returns a new User. */
function createNewEbook(id: number): EbookModel {
  const name =
    NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
    ' ' +
    NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
    '.';

  //random genre and number of genre from GENRES
  const genre = [];
  const num = Math.round(Math.random() * 5);
  for (let i = 0; i < num; i++) {
    genre.push(GENRES[Math.round(Math.random() * (GENRES.length - 1))]);
  }

  return {
    id: id.toString(),
    title: name,
    author: AUTHORS[Math.round(Math.random() * (AUTHORS.length - 1))],
    detail: 'This is a detail of ' + name,
    image: 'public/assets/Emma-Jane-Austen.jpg',
    date: new Date().toDateString(),
    view: Math.round(Math.random() * 1000),
    like: Math.round(Math.random() * 100),
    pdf: 'public/assets/pdfs/Bootstrap-vs-Material-Design-vs-Prime-vs-Tailwind.pdf',
    genre: genre,
  };
}
