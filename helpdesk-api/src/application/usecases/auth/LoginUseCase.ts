import { UserRepository } from '../../../domain/repositories/UserRepository';
import { LoginDto, AuthResponseDto } from '../../dtos/AuthDto';
import { toUserResponseDto } from '../../dtos/UserDto';
import { PasswordService } from '../../services/PasswordService';
import { TokenService } from '../../services/TokenService';
import { ApplicationError } from '../../errors/ApplicationError';

export class LoginUseCase {
  constructor(
    private userRepository: UserRepository,
    private passwordService: PasswordService,
    private tokenService: TokenService,
  ) {}

  async execute(loginDto: LoginDto): Promise<AuthResponseDto> {
    const user = await this.userRepository.findByEmail(loginDto.email);

    if (!user) {
      throw new ApplicationError('Invalid email or password', 401);
    }

    const isPasswordValid = await this.passwordService.compare(loginDto.password, user.passwordHash);

    if (!isPasswordValid) {
      throw new ApplicationError('Invalid email or password', 401);
    }

    const token = this.tokenService.generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    return {
      user: toUserResponseDto(user),
      token,
    };
  }
}
