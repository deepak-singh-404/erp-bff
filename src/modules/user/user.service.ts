// user.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../../database/models/User.model';
import { CreateUserDto } from './user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>
    ) { }

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const createdUser = new this.userModel(createUserDto);
        return createdUser.save();
    }

    async findAllUsers(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    async findUserById(userId: string): Promise<User> {
        return this.userModel.findById(userId).exec();
    }

    // Implement other CRUD operations (updateUser, deleteUser) as needed
}
