import { Request, Response, NextFunction } from 'express';
import BeneficiarioModel from '../models/Beneficiario';

class BeneficiariosController {

  index = async (req: Request, res: Response, next: NextFunction) => {
    const beneficiario = await BeneficiarioModel.findAll({});
    res.json(beneficiario);
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this._validateData(req.body);
      const beneficiario = await BeneficiarioModel.create(data);
      res.json(beneficiario);
    }
    catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  show = async (req: Request, res: Response, next: NextFunction) => {
    const beneficiario = await BeneficiarioModel.findByPk(req.params.beneficiarioId);
    res.json(beneficiario);
  }

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: any = req.params.beneficiarioId;
      const data = await this._validateData(req.body);
      await BeneficiarioModel.update(data, {
        where: {
          id: id
        }
      });
      res.json(await BeneficiarioModel.findByPk(id));
    }
    catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  delete = async (req: Request, res: Response, next: NextFunction) => {
    await BeneficiarioModel.destroy({
      where: {
        id: req.params.beneficiarioId
      }
    });
    res.json({});
  }

  _validateData = async (data: any) => {
    const attributes = ['name', 'dataNascimento', 'cpf', 'agregadoFamiliar', 'sexo'];
    const beneficiario: any = {};

    for (const attribute of attributes) {
      if (!data[attribute]) {
        throw new Error(`The attribute "${attribute}" is required.`);
      }

      beneficiario[attribute] = data[attribute];
    }

    return beneficiario;
  }

}

export default new BeneficiariosController();