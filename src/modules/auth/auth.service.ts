import { Injectable } from "@nestjs/common";
import { accessLogger, errorLogger } from "src/core/logger";
import { SigninDto } from "./auth.dto";
import { UserRepository } from "src/database/repository/user.repository";
import { User } from "src/database/models/user.model";
import { API_MESSAGES } from "src/common/constant";
import { SerialNumberRepository } from "src/database/repository/serial-number.repository";
import { SERIAL_NUMBER_KEYS } from "src/common/enum";
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from "@nestjs/config";


@Injectable()
export class AuthService {
    private readonly accessLogger = accessLogger.child({
        service: AuthService.name,
    });
    private readonly errorLogger = errorLogger.child({
        service: AuthService.name,
    });
    private readonly JWT_SECRET: string;
    private readonly JWT_EXPIRE_IN_DAYS: string;

    constructor(
        private readonly userRepository: UserRepository,
        private readonly serialNumberRepository: SerialNumberRepository,
        private readonly config: ConfigService,
    ) {
        this.JWT_SECRET = this.config.get('properties.JWT.SECRET')
        this.JWT_EXPIRE_IN_DAYS = this.config.get('properties.JWT.EXPIRES_IN_DAYS')
    }

    async signin(payload: SigninDto): Promise<any> {
        try {
            this.accessLogger.info(`Method: signin: input: ${JSON.stringify(payload)}`);
            const { email, password } = payload

            //First check if email exist
            const user: User | null = await this.userRepository.findByEmail(email)
            if (!user) {
                throw new Error(API_MESSAGES.USER_NOT_FOUND)
            }

            const isPasswordValid: boolean = await this.verifyPassword(password, user.password)
            if (!isPasswordValid) {
                throw new Error(API_MESSAGES.INVALID_CREDENTIALS)
            }

            const token = jwt.sign({ userId: user.userId, email: user.email }, this.JWT_SECRET, { expiresIn: this.JWT_EXPIRE_IN_DAYS });
            this.accessLogger.info(`Method: signin: end`);
            return { accessToken: token }
        }
        catch (err) {
            this.errorLogger.error(`Method: signin: exceptionError: ${err.message}`);
            throw err
        }
    }

    async signup(payload: SigninDto): Promise<any> {
        try {
            this.accessLogger.info(`Method: signup: input: ${JSON.stringify(payload)}`);
            const { email, password } = payload

            //First check if email exist
            const user: User | null = await this.userRepository.findByEmail(email)

            if (user) {
                this.accessLogger.info(`Method: signup: input: Email already exist`);
                throw new Error(API_MESSAGES.EMAIL_ALREADY_EXIST)
            }

            const savedUser = await this.userRepository.create({
                firstName: "",
                lastName: "",
                phoneNumber: "",
                roles: [],
                email,
                password: await this.hashPassword(password),
                userId: await this.serialNumberRepository.getSerialNumber(SERIAL_NUMBER_KEYS.USER),
                createdAt: new Date(),
                updatedAt: new Date()
            } as User)
            this.accessLogger.info(`Method: signup: end`);
            return savedUser
        }
        catch (err) {
            this.errorLogger.error(`Method: signup: exceptionError: ${err.message}`);
            throw err
        }
    }

    private async hashPassword(password): Promise<string> {
        const saltRounds = 10; // Number of salt rounds for hashing (you can adjust as needed)
        return await bcrypt.hash(password, saltRounds);
    }

    private async verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
        try {
            const passwordMatch = await bcrypt.compare(plainPassword, hashedPassword);
            return passwordMatch
        } catch (error) {
            return false
        }
    }
}