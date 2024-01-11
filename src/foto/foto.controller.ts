import { Controller, Post, UploadedFile, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { FotoService } from './foto.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { Professor } from 'src/professores/entities/professor.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import multerConfig from './multer-config';
import { FotoExceptionFilter } from './foto-exception.filter';

@Controller('api/professores/foto')
export class FotoController {
  constructor(private readonly fotoService: FotoService) { }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @UseFilters(FotoExceptionFilter)
  @UseInterceptors(FileInterceptor('foto_perfil', multerConfig))
  async updateFoto(@GetUser() professor: Professor, @UploadedFile() file: Express.MulterS3.File) {
    return await this.fotoService.create(professor, file);
  }
}
