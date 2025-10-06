import { Controller, Get } from '@nestjs/common';

@Controller('/albums')
export class AlbumController {
  async create() {}

  @Get()
  async getAll() {}

  async getOne() {}

  async delete() {}
}
