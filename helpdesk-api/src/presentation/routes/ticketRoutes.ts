import { Router } from 'express';
import { createTicketController } from '../controllers/TicketController';
import { GetTicketsUseCase } from '../../application/usecases/tickets/GetTicketsUseCase';
import { GetTicketByIdUseCase } from '../../application/usecases/tickets/GetTicketByIdUseCase';
import { CreateTicketUseCase } from '../../application/usecases/tickets/CreateTicketUseCase';
import { UpdateTicketUseCase } from '../../application/usecases/tickets/UpdateTicketUseCase';
import { DeleteTicketUseCase } from '../../application/usecases/tickets/DeleteTicketUseCase';
import { TypeOrmTicketRepository } from '../../infrastructure/persistence/repositories/TypeOrmTicketRepository';
import { authenticate } from '../middlewares/authMiddleware';

const router = Router();

// Dependencies
const ticketRepository = new TypeOrmTicketRepository();

// Use cases
const getTicketsUseCase = new GetTicketsUseCase(ticketRepository);
const getTicketByIdUseCase = new GetTicketByIdUseCase(ticketRepository);
const createTicketUseCase = new CreateTicketUseCase(ticketRepository);
const updateTicketUseCase = new UpdateTicketUseCase(ticketRepository);
const deleteTicketUseCase = new DeleteTicketUseCase(ticketRepository);

// Create controller functions
const ticketController = createTicketController(
  getTicketsUseCase,
  getTicketByIdUseCase,
  createTicketUseCase,
  updateTicketUseCase,
  deleteTicketUseCase
);

// Routes
router.get('/', ticketController.getAllTickets);
router.get('/:id', ticketController.getTicketById);
router.post('/', authenticate, ticketController.uploadAttachments, ticketController.createTicket);
router.put('/:id', authenticate, ticketController.uploadAttachments, ticketController.updateTicket);
router.delete('/:id', authenticate, ticketController.deleteTicket);

export default router;
