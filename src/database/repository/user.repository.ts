import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../models/user.model';

@Injectable()
export class UserRepository {
    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<UserDocument>,
    ) { }

    async findByEmail(email: string): Promise<UserDocument | null> {
        return this.userModel.findOne({ email }).exec();
    }

    async findByUserId(userId: number): Promise<UserDocument | null> {
        return this.userModel.findOne({ userId }).exec();
    }

    async create(user: User): Promise<UserDocument> {
        return this.userModel.create(user)
    }
} 