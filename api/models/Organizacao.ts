import { DataTypes, Model } from 'sequelize';
import db from '../db';
import City from './City';
import Beneficiario from './Beneficiario';

class Organizacao extends Model {
  declare id: number;
  declare name: string;
  declare cnpj: string;
  declare cityId: number;
};

Organizacao.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cnpj: {
    type: DataTypes.STRING,
    allowNull: false
  },
  city_id: {
    type: DataTypes.INTEGER,
      references: {
       model: City,
       key: 'id'
      },
     },
     beneficiario_id: {
      type: DataTypes.INTEGER,
        references: {
         model: Beneficiario,
         key: 'id'
        },
       }

}, {
  sequelize: db,
  tableName: 'organizacoes',
  modelName: 'Organizacao'
});

City.hasMany(Organizacao);
Organizacao.belongsTo(City);
Organizacao.hasMany(Beneficiario);
Beneficiario.belongsTo(Organizacao);

export default Organizacao;