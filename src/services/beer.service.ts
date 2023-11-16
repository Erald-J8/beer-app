import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CreateBeerDto, UpdateBeerDto } from 'src/controllers/beer.dto';
import { Beer } from 'src/database/beer.entity';

@Injectable()
export class BeerService {
  constructor(@InjectRepository(Beer) private beerRepository: Repository<Beer>) { }

  async create(params: CreateBeerDto): Promise<Beer> {
    return this.beerRepository.save(params);
  }

  async update(id: string, params: UpdateBeerDto): Promise<UpdateResult> {
    return this.beerRepository.update({ id }, params);
  }

  async get(name?: string): Promise<Beer[]> {
    if (name) {
        return await this.beerRepository
            .createQueryBuilder('beer')
            .where('beer.name like :name', { name: `%${name}%` })
            .getMany();
    }
    return await this.beerRepository.find();
}
}
