import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from '../../categories/entities/category.entity';

@Entity()
export class Ebook {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  // @Column("simple-array")
  @ManyToMany(() => Category, { cascade: true })
  @JoinTable()
  genre: Category[];

  @Column({ type: 'timestamp' })
  publishedDate: string;

  @Column()
  detail: string;

  @Column()
  image: string;

  @Column()
  pdf: string;

  @Column()
  author: string;
}
