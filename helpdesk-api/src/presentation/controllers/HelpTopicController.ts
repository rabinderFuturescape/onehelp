import { Request, Response, NextFunction } from 'express';
import { GetHelpTopicsUseCase } from '../../application/usecases/helpTopics/GetHelpTopicsUseCase';
import { GetHelpTopicByIdUseCase } from '../../application/usecases/helpTopics/GetHelpTopicByIdUseCase';
import { CreateHelpTopicUseCase } from '../../application/usecases/helpTopics/CreateHelpTopicUseCase';
import { UpdateHelpTopicUseCase } from '../../application/usecases/helpTopics/UpdateHelpTopicUseCase';
import { DeleteHelpTopicUseCase } from '../../application/usecases/helpTopics/DeleteHelpTopicUseCase';
import { CreateHelpTopicDto, UpdateHelpTopicDto } from '../../application/dtos/HelpTopicDto';
import { HelpTopicStatus, HelpTopicVisibility } from '../../domain/entities/HelpTopic';

// Controller factory to create controller functions with dependency injection
export const createHelpTopicController = (
  getHelpTopicsUseCase: GetHelpTopicsUseCase,
  getHelpTopicByIdUseCase: GetHelpTopicByIdUseCase,
  createHelpTopicUseCase: CreateHelpTopicUseCase,
  updateHelpTopicUseCase: UpdateHelpTopicUseCase,
  deleteHelpTopicUseCase: DeleteHelpTopicUseCase
) => {
  // Get all help topics
  const getAllHelpTopics = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { status, visibility, page, limit } = req.query;

      const options = {
        status: status as HelpTopicStatus | undefined,
        visibility: visibility as HelpTopicVisibility | undefined,
        page: page ? parseInt(page as string, 10) : undefined,
        limit: limit ? parseInt(limit as string, 10) : undefined,
      };

      const result = await getHelpTopicsUseCase.execute(options);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  // Get help topic by ID
  const getHelpTopicById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const helpTopic = await getHelpTopicByIdUseCase.execute(id);
      res.status(200).json(helpTopic);
    } catch (error) {
      next(error);
    }
  };

  // Create a new help topic
  const createHelpTopic = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dto: CreateHelpTopicDto = req.body;
      const helpTopic = await createHelpTopicUseCase.execute(dto);
      res.status(201).json(helpTopic);
    } catch (error) {
      next(error);
    }
  };

  // Update an existing help topic
  const updateHelpTopic = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const dto: UpdateHelpTopicDto = req.body;
      const helpTopic = await updateHelpTopicUseCase.execute(id, dto);
      res.status(200).json(helpTopic);
    } catch (error) {
      next(error);
    }
  };

  // Delete a help topic
  const deleteHelpTopic = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      await deleteHelpTopicUseCase.execute(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };

  return {
    getAllHelpTopics,
    getHelpTopicById,
    createHelpTopic,
    updateHelpTopic,
    deleteHelpTopic
  };
};
