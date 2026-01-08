
import {Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInDto, SignUpDto } from './dto/auth';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
    constructor(private prismaService: PrismaService, private jwtService: JwtService, private usersService: UsersService) { }

    async signup(data: SignUpDto) {
        const hashedPassword = await bcrypt.hash(data.password, 10);

        const user = await this.usersService.create({
            ...data,
            password: hashedPassword,
        });

        return {
            id: user.id,
            name: user.name,
            email: user.email,
        };
    }

    async signin(data: SignInDto) {

        const user = await this.prismaService.user.findUnique({
            where: {
                email: data.email
            }
        });

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        if (!await bcrypt.compare(data.password, user.password)) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const accessToken = await this.jwtService.signAsync({ id: user.id, name: user.name, mail: user.email });


        return { accessToken };
    }

}
