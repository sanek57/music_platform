import { Controller, Get } from '@nestjs/common';

@Controller('/tracks')
export class TrackController {
  async create() {}

  @Get()
  async getAll() {
    return 123;
  }

  async getOne() {}

  async delete() {}
}
