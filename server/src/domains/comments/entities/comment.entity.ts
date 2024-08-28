import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Ebook } from '../../ebooks/entities/ebook.entity';

@Entity()
export class EbookComment {
  @PrimaryColumn({ name: 'userId' })
  @ManyToOne(() => User, (user) => user.id, {
    nullable: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: User;

  @PrimaryColumn({ name: 'ebookId' })
  @ManyToOne(() => Ebook, (ebook) => ebook.id, {
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
