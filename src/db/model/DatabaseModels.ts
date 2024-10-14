import {Model, DataTypes} from "sequelize"
import sequelize from "../connection"


class SongArtwork extends Model{}
SongArtwork.init({
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    artwork: {
        type: DataTypes.STRING
    }
}, {sequelize, modelName: "SongArtwork", timestamps: false, tableName: "songs"})


class SongDetails extends Model{}
SongDetails.init({
    id:{
        type: DataTypes.STRING,
        primaryKey: true,
    },
    filename: {
        type: DataTypes.STRING,
    },
    url: {
        type: DataTypes.STRING,
    },
    filesize: {
        type: DataTypes.STRING,
    },
    encoder: {
        type: DataTypes.STRING
    },
    uploaddate: {
        type: DataTypes.STRING
    },
    length: {
        type: DataTypes.NUMBER
    }
}, {sequelize, modelName: "SongDetails", timestamps: false, tableName: "files"})

class ApiKeys extends Model{}
ApiKeys.init({
    api_key: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    user_ip: {
        type: DataTypes.STRING,
    },
    quota: {
        type: DataTypes.NUMBER
    },
    timestamp:{
        type: DataTypes.DATE
    }
}, {sequelize, modelName:"ApiKeys",timestamps: false, tableName: "api_keys"})

export {SongArtwork, SongDetails, ApiKeys}