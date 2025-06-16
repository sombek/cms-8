import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsObject,
} from 'class-validator';
import { Status } from 'src/generated/prisma';

export class CreateContentDto {
  @ApiProperty({ description: 'Content title', example: 'Welcome to our CMS' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Content description',
    example: 'A brief description of the content',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'Content body',
    example: 'The main content body goes here...',
  })
  @IsString()
  @IsNotEmpty()
  body: string;

  @ApiProperty({ description: 'Content category', example: 'news' })
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty({ description: 'Content language', example: 'en' })
  @IsString()
  @IsNotEmpty()
  language: string;

  @ApiProperty({
    description: 'Content status',
    enum: ['draft', 'published', 'archived'],
    example: 'draft',
  })
  @IsEnum(Status)
  status: Status;

  @ApiProperty({ description: 'Author ID', example: 'user123' })
  @IsString()
  @IsNotEmpty()
  author_id: string;

  @ApiProperty({
    description: 'Additional metadata',
    required: false,
    example: { tags: ['cms', 'content'] },
  })
  @IsOptional()
  @IsObject()
  meta_data?: Record<string, any>;
}
