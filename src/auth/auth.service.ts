
import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInDto, SignUpDto } from './dto/auth';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private prismaService: PrismaService, private jwtService: JwtService) { }

    async signup(data: SignUpDto) {

        const userAlreadyExists = await this.prismaService.user.findUnique({
            where: {
                email: data.email
            }
        });

        const hashedPassword = await bcrypt.hash(data.password, 10);

        if (userAlreadyExists) {
            throw new UnauthorizedException('User already exists');
        }

        const user = await this.prismaService.user.create({ data: { ...data, password: hashedPassword } });

        return {
            id: user.id,
            name: user.name,
            email: user.email
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


        return {accessToken};
    }

}
