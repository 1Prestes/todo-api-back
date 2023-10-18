import { DataTypes, Model } from 'sequelize'

import { db } from '../config/database.config'

interface TaskAttributes {
  id: 'string',
  title: 'string',
  description: 'string',
  completed: boolean
}

class TasksInstance extends Model<TaskAttributes> { }

TasksInstance.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true
  },
  completed: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
}, {
  sequelize: db,
  tableName: 'tasks',
  timestamps: true,
})

TasksInstance.sync()

export default TasksInstance
