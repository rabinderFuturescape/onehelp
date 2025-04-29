import { User, UserRole } from '../../../domain/entities/User';
import { UserRepository } from '../../../domain/repositories/UserRepository';
import { RegisterDto, AuthResponseDto } from '../../dtos/AuthDto';
import { toUserResponseDto } from '../../dtos/UserDto';
import { PasswordService } from '../../services/PasswordService';
import { TokenService } from '../../services/TokenService';
import { ApplicationError } from '../../errors/ApplicationError';

export class RegisterUseCase {
  constructor(
    private userRepository: UserRepository,
    private passwordService: PasswordService,
    private tokenService: TokenService,
  ) {}

  async execute(registerDto: RegisterDto): Promise<AuthResponseDto> {
    const existingUser = await this.userRepository.findByEmail(registerDto.email);

    if (existingUser) {
      throw new ApplicationError('Email already in use', 400);
    }

    const passwordHash = await this.passwordService.hash(registerDto.password);

    const user = User.create(
      registerDto.email,
      passwordHash,
      registerDto.firstName,
      registerDto.lastName,
      UserRole.CUSTOMER, // Default role for self-registration
    );

    const createdUser = await this.userRepository.create(user);

    const token = this.tokenService.generateToken({
      id: createdUser.id,
      email: createdUser.email,
      role: createdUser.role,
    });

    return {
      user: toUserResponseDto(createdUser),
      token,
    };
  }
}
