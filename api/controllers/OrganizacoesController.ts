import { Request, Response, NextFunction } from 'express';
import OrganizacaoModel from '../models/Organizacao';

class OrganizacoesController {

  index = async (req: Request, res: Response, next: NextFunction) => {
    const organizacoes = await OrganizacaoModel.findAll({});
    res.json(organizacoes);
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this._validateData(req.body);
      const organizacao = await OrganizacaoModel.create(data);
      res.json(organizacao);
    }
    catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  show = async (req: Request, res: Response, next: NextFunction) => {
    const organizacao = await OrganizacaoModel.findByPk(req.params.organizacaoId);
    res.json(organizacao);
  }

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: any = req.params.organizacaoId;
      const data = await this._validateData(req.body);
      await OrganizacaoModel.update(data, {
        where: {
          id: id
        }
      });
      res.json(await OrganizacaoModel.findByPk(id));
    }
    catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  delete = async (req: Request, res: Response, next: NextFunction) => {
    await OrganizacaoModel.destroy({
      where: {
        id: req.params.organizacaoId
      }
    });
    res.json({});
  }

  _validateData = async (data: any) => {
    const attributes = ['name', 'cnpj'];
    const organizacao: any = {};

    for (const attribute of attributes) {
      if (!data[attribute]) {
        throw new Error(`The attribute "${attribute}" is required.`);
      }

      organizacao[attribute] = data[attribute];
    }

    return organizacao;
  }

}

export default new OrganizacoesController();