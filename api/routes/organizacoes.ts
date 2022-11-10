import express, { Request, Response } from 'express';
import OrganizacaoModel from '../models/Organizacao';
import OrganizacoesController from '../controllers/OrganizacoesController';

const routerOrganizacoes = express.Router();

const validateOrganizacaoId = async (req: Request, res: Response, next: any) => {
    const organizacao = await OrganizacaoModel.findByPk(req.params.organizacaoId);

    if (!organizacao) {
        return res.status(404).json({ error: 'Organizacao not found' });
    }

    next();
}

routerOrganizacoes.post('/organizacoes', OrganizacoesController.create);
routerOrganizacoes.get('/organizacoes', OrganizacoesController.index);
routerOrganizacoes.get('/organizacoes/:organizacaoId', validateOrganizacaoId, OrganizacoesController.show);
routerOrganizacoes.put('/organizacoes/:organizacaoId', validateOrganizacaoId, OrganizacoesController.update);
routerOrganizacoes.delete('/organizacoes/:organizacaoId', validateOrganizacaoId, OrganizacoesController.delete);

export default routerOrganizacoes;