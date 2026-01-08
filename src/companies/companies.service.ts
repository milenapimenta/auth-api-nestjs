import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CompaniesService {
  constructor(private prismaService: PrismaService) { }

  async create(data: CreateCompanyDto) {
    const companyAlreadyExixts = await this.prismaService.company.findUnique({
      where: { cnpj: data.cnpj },
    });

    if (companyAlreadyExixts) {
      throw new Error('Company already exists');
    }

    return this.prismaService.company.create({ data });
  }

  async findAll() {
    return await this.prismaService.company.findMany();
  }

  async findOne(id: number) {
    const company = await this.prismaService.company.findUnique({
      where: { id },
    });

    return company;
  }

  async update(id: number, updateCompanyDto: UpdateCompanyDto) {
    const company = await this.prismaService.company.update({
      where: { id },
      data: updateCompanyDto,
    });

    return company;
  }

  async remove(id: number) {
    await this.prismaService.company.delete({
      where: { id },
    });

    return { success: true };
  }
}
