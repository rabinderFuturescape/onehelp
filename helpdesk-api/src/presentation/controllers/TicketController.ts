import { Request, Response, NextFunction } from 'express';
import { GetTicketsUseCase } from '../../application/usecases/tickets/GetTicketsUseCase';
import { GetTicketByIdUseCase } from '../../application/usecases/tickets/GetTicketByIdUseCase';
import { CreateTicketUseCase } from '../../application/usecases/tickets/CreateTicketUseCase';
import { UpdateTicketUseCase } from '../../application/usecases/tickets/UpdateTicketUseCase';
import { DeleteTicketUseCase } from '../../application/usecases/tickets/DeleteTicketUseCase';
import { TicketStatus, TicketPriority } from '../../domain/entities/Ticket';

export class TicketController {
  constructor(
    private getTicketsUseCase: GetTicketsUseCase,
    private getTicketByIdUseCase: GetTicketByIdUseCase,
    private createTicketUseCase: CreateTicketUseCase,
    private updateTicketUseCase: UpdateTicketUseCase,
    private deleteTicketUseCase: DeleteTicketUseCase,
  ) {}

  getAllTickets = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { status, priority, createdBy, assignedTo, page, limit } = req.query;

      const result = await this.getTicketsUseCase.execute({
        status: status as TicketStatus,
        priority: priority as TicketPriority,
        createdById: createdBy as string,
        assignedToId: assignedTo as string,
        page: page ? parseInt(page as string, 10) : undefined,
        limit: limit ? parseInt(limit as string, 10) : undefined,
      });

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  getTicketById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const result = await this.getTicketByIdUseCase.execute(id);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  createTicket = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user.id;
      const result = await this.createTicketUseCase.execute(req.body, userId);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  };

  updateTicket = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      const isAdmin = req.user.role === 'admin'; // Adjust based on your role implementation
      
      const result = await this.updateTicketUseCase.execute(id, req.body, userId, isAdmin);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  deleteTicket = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      const isAdmin = req.user.role === 'admin'; // Adjust based on your role implementation
      
      await this.deleteTicketUseCase.execute(id, userId, isAdmin);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}
