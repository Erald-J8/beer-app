import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, FindOptionsWhere, Repository, UpdateResult } from 'typeorm';
import { CreateBeerDto, UpdateBeerDto } from 'src/controllers/beer.dto';
import { Beer } from 'src/database/beer.entity';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';

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
        const totalRatings = beer ? beer.totalRatings : 1
        params.rating = (beer.rating * totalRatings + params.rating) / (totalRatings + 1)
        params.totalRatings = beer.totalRatings + 1
        console.log(beer)
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
