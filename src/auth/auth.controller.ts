
import type { SignUpDto } from './dto/auth';
import { SignInDto } from './dto/auth';
import { AuthService } from './auth.service';
import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('signup')
    async signup(@Body() body: SignUpDto) {
        return this.authService.signup(body);
    }

    @Post('signin')
    async signin(@Body() body: SignInDto) {
        return this.authService.signin(body);
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    async profile(@Request() req) {
        return req.user;
    }
}
