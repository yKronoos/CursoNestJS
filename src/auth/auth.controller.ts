import { BadRequestException, Body, Controller, FileTypeValidator, Headers, MaxFileSizeValidator, ParseFilePipe, Post, Req, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { AuthForgetDTO } from "./dto/auth-forget.dto";
import { AuthLoginDTO } from "./dto/auth-login.dto";
import { CreateUserDTO } from "src/user/dto/create-user.dto";
import { AuthResetDTO } from "./dto/auth-reset.dto";
import { UserService } from "src/user/user.service";
import { AuthService } from "./auth.service";
import { AuthGuard } from "src/guards/auth.guard";
import { User } from "src/decorators/user.decorator";
import { FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { writeFile } from "fs/promises";
import { join } from "path";
import { FileService } from "src/file/file.service";

@Controller('auth')
export class AuthController{

    constructor(
        private readonly authService: AuthService,
        private readonly fileService: FileService,
    ){}

    @Post('login')
    async login(@Body() {email, password}: AuthLoginDTO){
        return this.authService.login(email, password)
    }

    @Post('register')
    async register(@Body() body: CreateUserDTO){
        return this.authService.register(body)
    }

    @Post('forget')
    async forget(@Body() {email}: AuthForgetDTO){
        return this.authService.forget(email)
    }

    @Post('reset')
    async reset(@Body() {passwoord, token}: AuthResetDTO){
        return this.authService.reset(passwoord, token)
    }

    @UseGuards(AuthGuard)
    @Post('me')
    async me(@User() req){

        return {user: req}

        //return this.authService.checkToken((token ?? '').split(' ')[1])
    }

    @UseInterceptors(FileInterceptor('file'))
    @UseGuards(AuthGuard)
    @Post('photo')
    async uploadPhoto(
        @User() user, 
        @UploadedFile(new ParseFilePipe({
            validators: [
               new FileTypeValidator({fileType: 'image/png'}),
               new MaxFileSizeValidator({maxSize: 1024 * 50})
            ]
        })) photo: Express.Multer.File
    ){

        const path = join(__dirname, '..', '..', 'storage', 'photos', `photo-${user.id}.png`)
        try{
           await this.fileService.upload(photo, path)
        }catch(e){
           throw new BadRequestException(e)
        }
        
        return {success: true}
    }

    @UseInterceptors(FilesInterceptor('files'))
    @UseGuards(AuthGuard)
    @Post('files')
    async uploadFiles(@User() user, @UploadedFiles() files: Express.Multer.File[]){
       return files
    }

    @UseInterceptors(FileFieldsInterceptor([{
        name: 'photo',
        maxCount: 1
    },{
        name: 'documents',
        maxCount: 10
    }]))
    @UseGuards(AuthGuard)
    @Post('files-fields')
    async uploadFilesFields(@User() user, @UploadedFiles() files: {photo: Express.Multer.File, documents: Express.Multer.File[]}){
       return {files}
    }
}