import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { KycService } from './kyc.service';
import { CreateKycDto } from './dto/create-kyc.dto';
import { UpdateKycDto } from './dto/update-kyc.dto';

@Controller('account/:accountId')
export class KycController {
  constructor(private readonly kycService: KycService) {}

  @Post('kyc/')
  create(@Body() createKycDto: CreateKycDto, @Param('accountId') accountId: string) {
    return this.kycService.create(accountId, createKycDto);
  }

  @Get('kyc/')
  findAll(@Param('accountId') accountId: string) {
    return this.kycService.findAll(accountId);
  }

  @Get('kyc/:id')
  findOne(@Param('id') id: string) {
    // file deepcode ignore XSS: <please specify a reason of ignoring this>
    return this.kycService.findOne(id);
  }

  @Patch('kyc/:id')
  update(@Param('id') id: string, @Param('accountId') accountId: string, @Body() updateKycDto: UpdateKycDto) {
    return this.kycService.update(accountId, id, updateKycDto);
  }

  @Delete('kyc/:id')
  remove(@Param('id') id: string) {
    return this.kycService.remove(id);
  }
}
