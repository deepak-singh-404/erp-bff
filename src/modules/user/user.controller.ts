import { Controller, Get, Post, Body, Param, Req, Res, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../../database/models/User.model';
import { CreateUserDto } from './user.dto'; // Assuming the correct path

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto, @Req() req, @Res() res): Promise<User> {
        try {
            const data = await this.userService.createUser(createUserDto);
            return res.status(HttpStatus.ACCEPTED).json({ status: true, data: data });
        } catch (err) {
            if (err.name === 'ValidationError') {
                return res.status(HttpStatus.BAD_REQUEST).json({ status: false, message: 'Validation error.' });
            }
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ status: false, message: "Internal server error.", error: err.message });
        }
    }

    @Get()
    async findAllUsers(): Promise<User[]> {
        return this.userService.findAllUsers();
    }

    @Get(':id')
    async findUserById(@Param('id') userId: string): Promise<User> {
        return this.userService.findUserById(userId);
    }

    // Implement other HTTP request handlers (update, delete) as needed
}
