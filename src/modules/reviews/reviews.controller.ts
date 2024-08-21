import { Controller, Post, Get, Patch, Delete, Param, Body, Req } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { Request } from 'express';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) { }

  @Post(':productId')
  addReview(@Req() req: Request, @Param('productId') productId: number, @Body() createReviewDto: CreateReviewDto) {
    const userId = 1;
    return this.reviewsService.addReview(userId, productId, createReviewDto);
  }

  @Patch(':reviewId')
  updateReview(@Req() req: Request, @Param('reviewId') reviewId: number, @Body() updateReviewDto: UpdateReviewDto) {
    const userId = 1;
    return this.reviewsService.updateReview(userId, reviewId, updateReviewDto);
  }

  @Delete(':reviewId')
  deleteReview(@Req() req: Request, @Param('reviewId') reviewId: number) {
    const userId = 1;
    return this.reviewsService.deleteReview(userId, reviewId);
  }

  @Get('product/:productId')
  getProductReviews(@Param('productId') productId: number) {
    return this.reviewsService.getProductReviews(productId);
  }
}