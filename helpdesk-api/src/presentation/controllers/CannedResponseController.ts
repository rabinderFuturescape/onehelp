import { Request, Response, NextFunction } from 'express';
import { GetCannedResponsesUseCase } from '../../application/usecases/cannedResponses/GetCannedResponsesUseCase';
import { GetCannedResponseByIdUseCase } from '../../application/usecases/cannedResponses/GetCannedResponseByIdUseCase';
import { CreateCannedResponseUseCase } from '../../application/usecases/cannedResponses/CreateCannedResponseUseCase';
import { UpdateCannedResponseUseCase } from '../../application/usecases/cannedResponses/UpdateCannedResponseUseCase';
import { DeleteCannedResponseUseCase } from '../../application/usecases/cannedResponses/DeleteCannedResponseUseCase';
import { CreateCannedResponseDto, UpdateCannedResponseDto } from '../../application/dtos/CannedResponseDto';
import { CannedResponseStatus } from '../../domain/entities/CannedResponse';

export class CannedResponseController {
  constructor(
    private readonly getCannedResponsesUseCase: GetCannedResponsesUseCase,
    private readonly getCannedResponseByIdUseCase: GetCannedResponseByIdUseCase,
    private readonly createCannedResponseUseCase: CreateCannedResponseUseCase,
    private readonly updateCannedResponseUseCase: UpdateCannedResponseUseCase,
    private readonly deleteCannedResponseUseCase: DeleteCannedResponseUseCase,
  ) {}

  getAllCannedResponses = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { status, page, limit } = req.query;
      
      const options = {
        status: status as CannedResponseStatus | undefined,
        page: page ? parseInt(page as string, 10) : undefined,
        limit: limit ? parseInt(limit as string, 10) : undefined,
      };
      
      const result = await this.getCannedResponsesUseCase.execute(options);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  getCannedResponseById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const cannedResponse = await this.getCannedResponseByIdUseCase.execute(id);
      res.status(200).json(cannedResponse);
    } catch (error) {
      next(error);
    }
  };

  createCannedResponse = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dto: CreateCannedResponseDto = req.body;
      const cannedResponse = await this.createCannedResponseUseCase.execute(dto);
      res.status(201).json(cannedResponse);
    } catch (error) {
      next(error);
    }
  };

  updateCannedResponse = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const dto: UpdateCannedResponseDto = req.body;
      const cannedResponse = await this.updateCannedResponseUseCase.execute(id, dto);
      res.status(200).json(cannedResponse);
    } catch (error) {
      next(error);
    }
  };

  deleteCannedResponse = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      await this.deleteCannedResponseUseCase.execute(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}
