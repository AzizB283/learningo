import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { LearningProgressService } from './learning-progress.service';
import { CreateLearningProgressDto } from './dto/create-learning-progress.dto';
import { UpdateLearningProgressDto } from './dto/update-learning-progress.dto';
import { GetUser } from 'src/users/get-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('learning-progress')
@UseGuards(AuthGuard('jwt'))
export class LearningProgressController {
  constructor(
    private readonly learningProgressService: LearningProgressService,
  ) {}

  @Post()
  create(@Body() createLearningProgressDto: CreateLearningProgressDto) {
    return this.learningProgressService.create(createLearningProgressDto);
  }

  @Get()
  findAll() {
    return this.learningProgressService.findAll();
  }

  @Post('get-progress')
  findOne(@GetUser() user: User, @Body('language') language: string) {
    const userId = user.id;

    return this.learningProgressService.findOne(userId, language);
  }

  @Post('get-single-progress')
  findOneProgress(@GetUser() user: User, @Body() value: any) {
    const userId = user.id;
    const language = value.language;
    const difficultyLevel = value.difficultyLevel;

    return this.learningProgressService.findOneProgress(
      userId,
      language,
      difficultyLevel,
    );
  }

  @Patch('update')
  update(
    @Body() updateLearningProgressDto: UpdateLearningProgressDto,
    @GetUser() user: User,
  ) {
    // Use the user object to get the user ID
    const userId = user.id;

    return this.learningProgressService.update(
      userId,
      updateLearningProgressDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.learningProgressService.remove(+id);
  }
}
