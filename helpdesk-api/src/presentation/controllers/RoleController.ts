import { Request, Response, NextFunction } from 'express';
import { GetRolesUseCase } from '../../application/usecases/roles/GetRolesUseCase';
import { GetRoleByIdUseCase } from '../../application/usecases/roles/GetRoleByIdUseCase';
import { CreateRoleUseCase } from '../../application/usecases/roles/CreateRoleUseCase';
import { UpdateRoleUseCase } from '../../application/usecases/roles/UpdateRoleUseCase';
import { DeleteRoleUseCase } from '../../application/usecases/roles/DeleteRoleUseCase';
import { CreateRoleDto, UpdateRoleDto } from '../../application/dtos/RoleDto';

export class RoleController {
  constructor(
    private readonly getRolesUseCase: GetRolesUseCase,
    private readonly getRoleByIdUseCase: GetRoleByIdUseCase,
    private readonly createRoleUseCase: CreateRoleUseCase,
    private readonly updateRoleUseCase: UpdateRoleUseCase,
    private readonly deleteRoleUseCase: DeleteRoleUseCase,
  ) {}

  getAllRoles = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { page, limit } = req.query;
      
      const options = {
        page: page ? parseInt(page as string, 10) : undefined,
        limit: limit ? parseInt(limit as string, 10) : undefined,
      };
      
      const result = await this.getRolesUseCase.execute(options);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  getRoleById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const role = await this.getRoleByIdUseCase.execute(id);
      res.status(200).json(role);
    } catch (error) {
      next(error);
    }
  };

  createRole = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dto: CreateRoleDto = req.body;
      const role = await this.createRoleUseCase.execute(dto);
      res.status(201).json(role);
    } catch (error) {
      next(error);
    }
  };

  updateRole = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const dto: UpdateRoleDto = req.body;
      const role = await this.updateRoleUseCase.execute(id, dto);
      res.status(200).json(role);
    } catch (error) {
      next(error);
    }
  };

  deleteRole = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      await this.deleteRoleUseCase.execute(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}
