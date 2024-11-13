import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Translation } from './entities/translation.entity';
import { Repository } from 'typeorm';

// get 3 random options
function getRandomOptions(translatedWords, count) {
  const shuffledWords = translatedWords.sort(() => Math.random() - 0.5);
  return shuffledWords.slice(0, count);
}

// Helper function to shuffle an array
function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

@Injectable()
export class TranslationService {
  constructor(
    @InjectRepository(Translation)
    private readonly translationRepository: Repository<Translation>,
  ) {}

  getData(language: string, difficultylevel: string) {
    // console.log(language, difficultylevel);
    return this.translationRepository.find({
      where: {
        language: language,
        difficultyLevel: difficultylevel,
      },
    });
  }

  async getPracticeData(language: string) {
    const mcqs = await this.translationRepository.find({
      where: {
        language: language,
        difficultyLevel: 'word',
      },
    });

    // const translatedWords = await mcqs.map((option) => option.translatedWord);
    const mcqsWithOptions = mcqs.map((question) => {
      const correctOption = question.translatedWord;
      const allOptions = mcqs.map((option) => option.translatedWord);
      const randomOptions = getRandomOptions(
        allOptions.filter((option) => option !== correctOption),
        3,
      );
      const mcqOptions = [correctOption, ...randomOptions];
      const shuffledOptions = shuffleArray(mcqOptions);

      return {
        ...question,
        options: shuffledOptions,
      };
    });

    return mcqsWithOptions;
  }
}
