import { Injectable, UseGuards } from '@nestjs/common';
import { CreateLearningProgressDto } from './dto/create-learning-progress.dto';
import { UpdateLearningProgressDto } from './dto/update-learning-progress.dto';
import { LearningProgress } from './entities/learning-progress.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthGuard } from '@nestjs/passport';
import { log } from 'console';

@Injectable()
export class LearningProgressService {
  constructor(
    @InjectRepository(LearningProgress)
    private readonly learningRepository: Repository<LearningProgress>,
  ) {}
  create(createLearningProgressDto: CreateLearningProgressDto) {
    return 'This action adds a new learningProgress';
  }

  findAll() {
    return `This action returns all learningProgress`;
  }

  async findOne(id: number, language: string) {
    const result = await this.learningRepository.find({
      where: {
        userId: id,
        language: language,
      },
    });

    const transformedData = result.reduce((acc, item) => {
      acc[item.difficultyLevel] = item.completionPercentage;
      return acc;
    }, {});

    // Ensure that all difficulty levels are present and set to 0 if not found
    const allDifficultyLevels = ['alphabet', 'word', 'sentence'];

    for (const difficultyLevel of allDifficultyLevels) {
      if (!(difficultyLevel in transformedData)) {
        transformedData[difficultyLevel] = 0;
      }
    }

    return transformedData;
  }

  async findOneProgress(id: number, language: string, difficultyLevel: string) {
    let progress = await this.learningRepository.find({
      where: {
        userId: id,
        language: language,
        difficultyLevel: difficultyLevel,
      },
    });
    const completionPercentage =
      progress.length > 0 ? progress[0].completionPercentage : 0;
    return completionPercentage;
  }

  async update(
    userId: number,
    updateLearningProgressDto: UpdateLearningProgressDto,
  ) {
    // return `This action updates a #${userId} learningProgress`;

    const existingProgress = await this.learningRepository.findOne({
      where: {
        userId: userId,
        language: updateLearningProgressDto.language,
        difficultyLevel: updateLearningProgressDto.difficultyLevel,
      },
    });

    if (existingProgress) {
      // Update the existing record with the new values
      existingProgress.completionPercentage =
        updateLearningProgressDto.completePercentage;
      // Save the updated record back to the database
      return this.learningRepository.save(existingProgress);
    } else {
      let learningProgress = new LearningProgress();
      learningProgress.userId = userId;
      learningProgress.language = updateLearningProgressDto.language;
      learningProgress.difficultyLevel =
        updateLearningProgressDto.difficultyLevel;
      learningProgress.completionPercentage =
        updateLearningProgressDto.completePercentage;

      return this.learningRepository.save(learningProgress);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} learningProgress`;
  }
}
