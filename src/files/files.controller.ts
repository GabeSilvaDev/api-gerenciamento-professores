import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Req, UploadedFiles } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import multerConfig from './multer-config';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('arquivo', multerConfig))
  uploadArquivo(@UploadedFile() file: Express.MulterS3.File) {
    console.log(file);
    return this.filesService.salvarDados(file);
  }

  @Post('varios')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'arquivos' }], multerConfig))
  async uploadVariosArquivos(
    @UploadedFiles()
    files: Express.MulterS3.File[],
  ) {
    return await this.filesService.salvarVariosDados(files['arquivos']);
  }
}
