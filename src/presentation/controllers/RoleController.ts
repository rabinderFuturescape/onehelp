import { Request, Response, NextFunction } from 'express';

// Mock roles data
const roles = [
  { id: 'support_agent', name: 'Support Agent', description: 'First-line support staff' },
  { id: 'team_lead', name: 'Team Lead', description: 'Team leader responsible for a group of agents' },
  { id: 'manager', name: 'Manager', description: 'Department manager' },
  { id: 'admin', name: 'Administrator', description: 'System administrator with full access' },
];

export class RoleController {
  getAllRoles = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      res.status(200).json(roles);
    } catch (error) {
      next(error);
    }
  };

  getRoleById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const role = roles.find(r => r.id === id);
      
      if (!role) {
        res.status(404).json({ message: `Role with ID ${id} not found` });
        return;
      }
      
      res.status(200).json(role);
    } catch (error) {
      next(error);
    }
  };
}
