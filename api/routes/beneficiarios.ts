import express, { Request, Response } from 'express';
import BeneficiarioModel from '../models/Beneficiario';
import beneficiariosController from '../controllers/BeneficiariosController';
const routerBeneficiarios = express.Router();

const validateBeneficiarioId = async (req: Request, res: Response, next: any) => {
  const Beneficiario = await BeneficiarioModel.findByPk(req.params.beneficiarioId);

  if (!Beneficiario) {
    return res.status(404).json({ error: 'Beneficiario not found' });
  }

  next();
}

routerBeneficiarios.get('/beneficiarios', beneficiariosController.index);
routerBeneficiarios.post('/beneficiarios', beneficiariosController.create);
routerBeneficiarios.get('/beneficiarios/:beneficiarioId', validateBeneficiarioId, beneficiariosController.show);
routerBeneficiarios.put('/beneficiarios/:beneficiarioId', validateBeneficiarioId, beneficiariosController.update);
routerBeneficiarios.delete('/beneficiarios/:beneficiarioId', validateBeneficiarioId, beneficiariosController.delete);

export default routerBeneficiarios;