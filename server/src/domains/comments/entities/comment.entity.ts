import { Column, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Ebook } from '../../ebooks/entities/ebook.entity';
import { IsInt, Max, Min } from 'class-validator';

export class Comment {
  @PrimaryColumn({ name: 'userId' })
  @ManyToOne((type) => User, (user) => user.id, {
    nullable: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: User;

  @PrimaryColumn({ name: 'ebookId' })
  @ManyToOne((type) => Ebook, (ebook) => ebook.id, {
    nullable: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'ebookId' })
  ebook: Ebook;

  @Column()
  content: string;

  @Column({ type: 'timestamp' })
  commentDate: string;
}
