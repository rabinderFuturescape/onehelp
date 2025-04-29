import { Request, Response, NextFunction } from 'express';
import { GetVerificationsUseCase } from '../../application/usecases/verification/GetVerificationsUseCase';
import { GetVerificationByIdUseCase } from '../../application/usecases/verification/GetVerificationByIdUseCase';
import { CreateVerificationUseCase } from '../../application/usecases/verification/CreateVerificationUseCase';
import { UpdateVerificationUseCase } from '../../application/usecases/verification/UpdateVerificationUseCase';
import { DeleteVerificationUseCase } from '../../application/usecases/verification/DeleteVerificationUseCase';
import { CreateVerificationDto, UpdateVerificationDto } from '../../dtos/VerificationDto';
import { VerificationStatus } from '../../domain/entities/Verification';

export class VerificationController {
  constructor(
    private readonly getVerificationsUseCase: GetVerificationsUseCase,
    private readonly getVerificationByIdUseCase: GetVerificationByIdUseCase,
    private readonly createVerificationUseCase: CreateVerificationUseCase,
    private readonly updateVerificationUseCase: UpdateVerificationUseCase,
    private readonly deleteVerificationUseCase: DeleteVerificationUseCase,
  ) {}

  getAllVerifications = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { status } = req.query;
      const verifications = await this.getVerificationsUseCase.execute(status as VerificationStatus | undefined);
      res.status(200).json({ verifications });
    } catch (error) {
      next(error);
    }
  };

  getVerificationById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const verification = await this.getVerificationByIdUseCase.execute(id);
      res.status(200).json(verification);
    } catch (error) {
      next(error);
    }
  };

  createVerification = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dto: CreateVerificationDto = req.body;
      const verification = await this.createVerificationUseCase.execute(dto);
      res.status(201).json(verification);
    } catch (error) {
      next(error);
    }
  };

  updateVerification = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const dto: UpdateVerificationDto = req.body;
      const verification = await this.updateVerificationUseCase.execute(id, dto);
      res.status(200).json(verification);
    } catch (error) {
      next(error);
    }
  };

  deleteVerification = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      await this.deleteVerificationUseCase.execute(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}
