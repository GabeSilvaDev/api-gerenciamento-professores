import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { File } from './entities/file.entity';
import { Request } from 'express';
import { Repository } from 'typeorm';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(File)
    private fotoRepository: Repository<File>,
  ) { }

  async salvarDados(file: Express.MulterS3.File) {
    const arquivo = new File();
    arquivo.fileName = file.key;
    arquivo.contentLength = file.size;
    arquivo.contentType = file.mimetype;
    arquivo.url = file.location;

    return await this.fotoRepository.save(arquivo);
  }

  async salvarVariosDados(files: Express.MulterS3.File[]) {
    const arrayArquivos = files.map((file) => {
      const arquivo = new File();
      arquivo.fileName = file.key;
      arquivo.contentLength = file.size;
      arquivo.contentType = file.mimetype;
      arquivo.url = file.location;
      return arquivo;
    });

    return await this.fotoRepository.save(arrayArquivos);
  }
}
