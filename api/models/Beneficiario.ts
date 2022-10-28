import { DataTypes, Model } from 'sequelize';
import db from '../db';
import City from './City';

class Beneficiario extends Model {
  declare id: number;
  declare name: string;
  declare dataNascimento: string;
  declare cpf: string;
  declare agregadoFamiliar: string;
  declare sexo: string;

  static locateBeneficiario = async (name: string, dataNascimento: string, cpf: string, agregadoFamiliar: string, sexo: string, password: string) => {
    return await Beneficiario.findOne({
      where: {
        name: name,
        dataNascimento: dataNascimento,
        cpf: cpf,
        agregadoFamiliar: agregadoFamiliar,
        sexo: sexo,
        password: password
      }
    });
  }
};

Beneficiario.init({
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
  dataNascimento: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cpf: {
    type: DataTypes.STRING,
    allowNull: false
  },
  agregadoFamiliar: {
    type: DataTypes.STRING,
    allowNull: false
  },
  sexo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
},
  {
    sequelize: db,
    tableName: 'beneficiarios',
    modelName: 'Beneficiario'
  });
  City.hasMany(Beneficiario),
  Beneficiario.belongsTo(City)
  

export default Beneficiario;