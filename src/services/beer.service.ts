import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateBeerDto, UpdateBeerDto } from 'src/controllers/beer.dto';
import { Beer } from 'src/database/beer.entity';

@Injectable()
export class BeerService {
  constructor(@InjectRepository(Beer) private beerRepository: Repository<Beer>) { }

  async create(params: CreateBeerDto): Promise<Beer> {
    return this.beerRepository.save(params);
  }

  async delete(id: string): Promise<DeleteResult> {
    return this.beerRepository.delete(id);
  }

  async update(id: string, params: UpdateBeerDto): Promise<UpdateResult> {
    // calculate new rating
    if (params.rating) {
      try {
        const beer = await this.beerRepository.findOneByOrFail({ id })

        const currentBeerRating = beer ? beer.rating : 0
        const totalRatings = beer ? beer.totalRatings : 0

        params.rating = (currentBeerRating * totalRatings + params.rating) / (totalRatings + 1)
        params.totalRatings = totalRatings + 1
      } catch (err) {
        console.log(`Could not find beer with the given id: ${id}`)
      }
    }
    
    return await this.beerRepository.update({ id }, params);
  }

  async getByName(name?: string): Promise<Beer[]> {
    if (name) {
        return await this.beerRepository
            .createQueryBuilder('beer')
            .where('beer.name like :name', { name: `%${name}%` })
            .getMany();
    }
    return await this.beerRepository.find();
  }
}
