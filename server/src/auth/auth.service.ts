import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAccountInput } from 'src/users/dtos/create-account.dto';
import { LoginInput } from 'src/users/dtos/login.dto';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '../jwt/jwt.service';
import { VerificationsService } from '../verifications/verifications.service';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly verificationService: VerificationsService,
    private readonly mailerService: MailerService,
  ) {}
  async login({ email, password }: LoginInput) {
    const user = await this.userRepository.findOne({ email });
    if (!user) this.buildWrongCredentialsResponse();
    const passwordCorrect = await user.checkPasswords(password);
    if (!passwordCorrect) this.buildWrongCredentialsResponse();
    const id = user && user.id;

    return {
      access_token: this.jwtService.sign({ id }),
    };
  }
  async register({ email, password }: CreateAccountInput) {
    const exists = await this.userRepository.findOne({ email });
    if (exists) return this.buildUserExistsResponse();
    const user = await this.userRepository.save(
      this.userRepository.create({ email, password }),
    );
    const activationLink =
      await this.verificationService.buildActivationLinkFor(user);

    this.mailerService
      .sendMail({
        to: 'victorbiletskiy82@gmail.com', // list of receivers
        html: `<b>${activationLink}</b>`, // HTML body content
      })
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });

    return user.excludePassword();
  }
  buildUserExistsResponse() {
    throw new HttpException(
      'User with this email is already exists',
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
  buildWrongCredentialsResponse() {
    throw new HttpException(
      'Wrong Credentials',
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
  async updateProfile(authUserId: number) {
    // return await this.userRepository.save(
    //   this.userRepository.create({ id: authUserId, ...updateProfileInput }),
    // );
  }
  findById(id) {
    return this.userRepository.findOne({ id });
  }
}
