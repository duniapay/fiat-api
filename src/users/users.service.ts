import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, FindOptionsWhere, Repository } from 'typeorm';
import { UsersDTO } from './dto/create-user.dto';
import { User } from './entities/user.entity';

// This should be a real class/interface representing a user entity
// export type User = any;

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>) {}

  create(createUserDto: UsersDTO): Promise<User> {
    const user = new User();

    
    user.firstname = createUserDto.firstname;
    user.lastname = createUserDto.lastname;
    user.mobile = createUserDto.mobile;
    user.business_name = createUserDto.business_name;
    user.address = { ...createUserDto.address };
    user.balance = 0;
    user.isActive = false;
    user.currency = createUserDto.currency;
    user.email = createUserDto.email;
    user.password = createUserDto.password;
    user.salt = createUserDto.salt;
    return this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(email: string): Promise<User> {
    const query = {
      where: { email },
    } as FindOneOptions<User>;
    return this.usersRepository.findOne(query);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
