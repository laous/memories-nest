import { Controller } from '@nestjs/common';
import { MemorieService } from './memorie.service';

@Controller('memorie')
export class MemorieController {
  constructor(private memorieService: MemorieService) {}
}
