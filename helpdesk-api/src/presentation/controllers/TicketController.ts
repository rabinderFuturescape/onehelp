import { Request, Response, NextFunction } from 'express';
import { GetTicketsUseCase } from '../../application/usecases/tickets/GetTicketsUseCase';
import { GetTicketByIdUseCase } from '../../application/usecases/tickets/GetTicketByIdUseCase';
import { CreateTicketUseCase } from '../../application/usecases/tickets/CreateTicketUseCase';
import { UpdateTicketUseCase } from '../../application/usecases/tickets/UpdateTicketUseCase';
import { DeleteTicketUseCase } from '../../application/usecases/tickets/DeleteTicketUseCase';
import { TicketStatus, TicketPriority } from '../../domain/entities/Ticket';
import { upload, saveFileBuffer } from '../../infrastructure/utils/fileUpload';

// Controller factory to create controller functions with dependency injection
export const createTicketController = (
  getTicketsUseCase: GetTicketsUseCase,
  getTicketByIdUseCase: GetTicketByIdUseCase,
  createTicketUseCase: CreateTicketUseCase,
  updateTicketUseCase: UpdateTicketUseCase,
  deleteTicketUseCase: DeleteTicketUseCase
) => {
  // Get all tickets
  const getAllTickets = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { status, priority, createdBy, assignedTo, page, limit } = req.query;

      const result = await getTicketsUseCase.execute({
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

  // Get ticket by ID
  const getTicketById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const result = await getTicketByIdUseCase.execute(id);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  // Create a new ticket
  const createTicket = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user.id;

      // Handle file uploads if any
      if (req.file) {
        const { buffer, originalname, mimetype } = req.file;
        const filePath = await saveFileBuffer(buffer, originalname, mimetype);

        // Add file path to request body
        req.body.attachments = [filePath];
      } else if (req.files && Array.isArray(req.files)) {
        // Handle multiple file uploads
        const filePaths = await Promise.all(
          req.files.map(async (file) => {
            const { buffer, originalname, mimetype } = file;
            return saveFileBuffer(buffer, originalname, mimetype);
          })
        );

        // Add file paths to request body
        req.body.attachments = filePaths;
      }

      const result = await createTicketUseCase.execute(req.body, userId);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  };

  // Update an existing ticket
  const updateTicket = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      const isAdmin = req.user.role === 'admin'; // Adjust based on your role implementation

      // Handle file uploads if any
      if (req.file) {
        const { buffer, originalname, mimetype } = req.file;
        const filePath = await saveFileBuffer(buffer, originalname, mimetype);

        // Add file path to request body
        req.body.attachments = [filePath];
      } else if (req.files && Array.isArray(req.files)) {
        // Handle multiple file uploads
        const filePaths = await Promise.all(
          req.files.map(async (file) => {
            const { buffer, originalname, mimetype } = file;
            return saveFileBuffer(buffer, originalname, mimetype);
          })
        );

        // Add file paths to request body
        req.body.attachments = filePaths;
      }

      const result = await updateTicketUseCase.execute(id, req.body, userId, isAdmin);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  // Delete a ticket
  const deleteTicket = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      const isAdmin = req.user.role === 'admin'; // Adjust based on your role implementation

      await deleteTicketUseCase.execute(id, userId, isAdmin);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };

  // Upload middleware for ticket attachments
  const uploadAttachments = upload.array('attachments', 5); // Allow up to 5 attachments

  return {
    getAllTickets,
    getTicketById,
    createTicket,
    updateTicket,
    deleteTicket,
    uploadAttachments
  };
};
