import {Model, DataTypes} from "sequelize"
import sequelize from "../connection"


class Song extends Model{}
Song.init({
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    artwork: {
        type: DataTypes.STRING
    }
}, {sequelize, modelName: "Song", timestamps: false, tableName: "songs"})

export default Song