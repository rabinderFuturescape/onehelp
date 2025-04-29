import { Request, Response, NextFunction } from 'express';
import { GetEscalationRulesUseCase } from '../../application/usecases/escalation/GetEscalationRulesUseCase';
import { GetEscalationRuleByIdUseCase } from '../../application/usecases/escalation/GetEscalationRuleByIdUseCase';
import { CreateEscalationRuleUseCase } from '../../application/usecases/escalation/CreateEscalationRuleUseCase';
import { UpdateEscalationRuleUseCase } from '../../application/usecases/escalation/UpdateEscalationRuleUseCase';
import { DeleteEscalationRuleUseCase } from '../../application/usecases/escalation/DeleteEscalationRuleUseCase';
import { CreateEscalationRuleDto, UpdateEscalationRuleDto } from '../../application/dtos/EscalationRuleDto';

export class EscalationRuleController {
  constructor(
    private readonly getEscalationRulesUseCase: GetEscalationRulesUseCase,
    private readonly getEscalationRuleByIdUseCase: GetEscalationRuleByIdUseCase,
    private readonly createEscalationRuleUseCase: CreateEscalationRuleUseCase,
    private readonly updateEscalationRuleUseCase: UpdateEscalationRuleUseCase,
    private readonly deleteEscalationRuleUseCase: DeleteEscalationRuleUseCase,
  ) {}

  getAllRules = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const rules = await this.getEscalationRulesUseCase.execute();
      res.status(200).json(rules);
    } catch (error) {
      next(error);
    }
  };

  getRuleById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const rule = await this.getEscalationRuleByIdUseCase.execute(id);
      res.status(200).json(rule);
    } catch (error) {
      next(error);
    }
  };

  createRule = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dto: CreateEscalationRuleDto = req.body;
      const rule = await this.createEscalationRuleUseCase.execute(dto);
      res.status(201).json(rule);
    } catch (error) {
      next(error);
    }
  };

  updateRule = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const dto: UpdateEscalationRuleDto = req.body;
      const rule = await this.updateEscalationRuleUseCase.execute(id, dto);
      res.status(200).json(rule);
    } catch (error) {
      next(error);
    }
  };

  deleteRule = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      await this.deleteEscalationRuleUseCase.execute(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}
