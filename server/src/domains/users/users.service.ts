import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto, FirebaseUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

const saltRounds = 10;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto | FirebaseUserDto) {
    try {
      if (
        (createUserDto as CreateUserDto).password != '' &&
        (createUserDto as CreateUserDto).password != undefined
      ) {
        let user = this.usersRepository.create(createUserDto);
        user.joinedDate = new Date().toISOString();
        if (!bcrypt) {
          throw new Error('bcrypt is not defined');
        }
        const salt = bcrypt.genSaltSync(saltRounds);
        user.password = bcrypt.hashSync(user.password, salt);
        await this.usersRepository.save(user);
      } else {
        let user = new User();
        user.id = (createUserDto as FirebaseUserDto).uid;
        user.userName = (createUserDto as FirebaseUserDto).name;
        user.email = (createUserDto as FirebaseUserDto).email;
        user.avatarURL = (createUserDto as FirebaseUserDto).picture;
        user.joinedDate = new Date().toISOString();
        await this.usersRepository.save(user);
      }
      return;
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return await this.usersRepository.find();
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: string) {
    try {
      const user = await this.usersRepository
        .createQueryBuilder('user')
        .select([
          'user.id',
          'user.userName',
          'user.email',
          'user.joinedDate',
          'user.avatarURL',
          'user.wallPaperURL',
        ])
        .where('user.id = :id', { id })
        .getOne();
      if (!user) {
        throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
      }
      return user;
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  async findOneByRole(role: string) {
    return await this.usersRepository.findOneBy({ role });
  }

  async remove(id: string): Promise<void> {
    try {
      const deleteResult = await this.usersRepository.delete(id);
      if (deleteResult.affected === 0) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return;
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const updateResult = await this.usersRepository.update(id, updateUserDto);
      if (updateResult.affected === 0) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return;
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  async checkUser(email: string, password: string): Promise<User> {
    try {
      console.log(email, password);
      const user = await this.usersRepository.findOne({
        where: { email },
      });
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        throw new HttpException(
          'Password does not match',
          HttpStatus.UNAUTHORIZED,
        );
      }
      return user;
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }
}
