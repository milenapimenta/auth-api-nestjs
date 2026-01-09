
import { SignInDto, SignUpDto } from './dto/auth';
import { AuthService } from './auth.service';
import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import type { Request as ExpressRequest } from 'express';
import { AuthGuard } from './auth.guard';


@ApiTags('auth')
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
    @ApiBearerAuth()
    @Get('profile')
    async profile(@Request() req: any) {
        return this.authService.getProfile(req.user.id);
    }

    @Post('logout')
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    async logout(@Request() req: ExpressRequest) {
        const token = req.headers.authorization?.replace('Bearer ', '');
        if (!token) return;

        return this.authService.logout(token);
    }
}
