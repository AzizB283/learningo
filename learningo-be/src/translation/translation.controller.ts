import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { TranslationService } from './translation.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('translation')
export class TranslationController {
  constructor(private readonly translationService: TranslationService) {}

  @Get(':language/:difficultylevel')
  @UseGuards(AuthGuard('jwt'))
  getdata(
    @Param('language') language: string,
    @Param('difficultylevel') difficultylevel: string,
  ) {
    return this.translationService.getData(language, difficultylevel);
  }

  @Get(':language')
  @UseGuards(AuthGuard('jwt'))
  getpracticedata(@Param('language') language: string) {
    return this.translationService.getPracticeData(language);
  }
}
