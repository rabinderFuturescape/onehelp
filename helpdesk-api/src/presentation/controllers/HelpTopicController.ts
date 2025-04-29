import { Request, Response, NextFunction } from 'express';
import { GetHelpTopicsUseCase } from '../../application/usecases/helpTopics/GetHelpTopicsUseCase';
import { GetHelpTopicByIdUseCase } from '../../application/usecases/helpTopics/GetHelpTopicByIdUseCase';
import { CreateHelpTopicUseCase } from '../../application/usecases/helpTopics/CreateHelpTopicUseCase';
import { UpdateHelpTopicUseCase } from '../../application/usecases/helpTopics/UpdateHelpTopicUseCase';
import { DeleteHelpTopicUseCase } from '../../application/usecases/helpTopics/DeleteHelpTopicUseCase';
import { CreateHelpTopicDto, UpdateHelpTopicDto } from '../../application/dtos/HelpTopicDto';
import { HelpTopicStatus, HelpTopicVisibility } from '../../domain/entities/HelpTopic';

export class HelpTopicController {
  constructor(
    private readonly getHelpTopicsUseCase: GetHelpTopicsUseCase,
    private readonly getHelpTopicByIdUseCase: GetHelpTopicByIdUseCase,
    private readonly createHelpTopicUseCase: CreateHelpTopicUseCase,
    private readonly updateHelpTopicUseCase: UpdateHelpTopicUseCase,
    private readonly deleteHelpTopicUseCase: DeleteHelpTopicUseCase,
  ) {}

  getAllHelpTopics = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { status, visibility, page, limit } = req.query;
      
      const options = {
        status: status as HelpTopicStatus | undefined,
        visibility: visibility as HelpTopicVisibility | undefined,
        page: page ? parseInt(page as string, 10) : undefined,
        limit: limit ? parseInt(limit as string, 10) : undefined,
      };
      
      const result = await this.getHelpTopicsUseCase.execute(options);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  getHelpTopicById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const helpTopic = await this.getHelpTopicByIdUseCase.execute(id);
      res.status(200).json(helpTopic);
    } catch (error) {
      next(error);
    }
  };

  createHelpTopic = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dto: CreateHelpTopicDto = req.body;
      const helpTopic = await this.createHelpTopicUseCase.execute(dto);
      res.status(201).json(helpTopic);
    } catch (error) {
      next(error);
    }
  };

  updateHelpTopic = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const dto: UpdateHelpTopicDto = req.body;
      const helpTopic = await this.updateHelpTopicUseCase.execute(id, dto);
      res.status(200).json(helpTopic);
    } catch (error) {
      next(error);
    }
  };

  deleteHelpTopic = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      await this.deleteHelpTopicUseCase.execute(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}
