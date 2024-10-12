import { Elysia } from "elysia";
import Song from "./db/model/Song";
import sequelize from "./db/connection";
import { swagger } from '@elysiajs/swagger'
import {apiSongArtworkGet, apiSongArtworkVerify, apiSongMediaGet, apiSongMetadataGet, apiSongDetailsGet} from "./swagger/swagger-details"
import { readdir } from "node:fs/promises";
import {join} from "path"

const app = new Elysia()

await sequelize.sync();

function validateID(id: string): boolean{
	const regex = /^[a-zA-Z0-9]+$/
	return regex.test(id);
}

function validateUUID(uuid: string): boolean{
	const regex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}(\.png)?$/;
	return regex.test(uuid)
}

async function findFile(id: string): Promise<string>{
	try{
		const files = await readdir(join("./files/files/picosong.s3.amazonaws.com", id))
		if(files.length > 0) return join("./files/files/picosong.s3.amazonaws.com", id, files[0])
		else return "None";
	}
	catch(error: any){
		console.log("An error occured\n", error)
		return "None";
	}
}


app.group("/api/song", (app) => 

	app
		.get("/:id/artwork", async ({set, params: {id}}) => {
			if(!validateID(id)) {set.status = "Bad Request"; return {error: "Invalid ID structure!"}}
			const song = await Song.findOne({where: {id: id}});
			if(song == null) {set.status = "Not Found"; return {error: "Song not found!"} }
			const jsonSong = song?.toJSON()
			if(jsonSong.artwork == "Null") { set.status = "Not Found"; return {error: "No artwork found!"}}
			
			return(jsonSong)
			//@ts-ignore
		}, apiSongArtworkGet)

		.get("/:id/verify", async ({set, params: {id}}) => {
			if(!validateUUID(id)) {set.status = "Bad Request"; return {error: "Invalid UUID structure!"}}
			let idFixed = id.endsWith(".png") ? id : id.concat(".png")
			const artwork = await Song.findOne({where: {artwork: idFixed}});
			if(artwork == null) {set.status = "Not Found"; return {error: "Artwork not found!"} }
			const jsonSong = artwork?.toJSON()
		
			return(jsonSong)
			//@ts-ignore
		}, apiSongArtworkVerify )
		
		.get("/:id/media", async ({set, params: {id}}) => { 
			if(!validateID(id)) {set.status = "Bad Request"; return {error: "Invalid ID structure!"}}
			
			let file = await findFile(id)

			if(file == "None") {set.status = "Not Found"; return {error: "Song not found!"}}

			let filename = file.split("\\")[4]
			set.headers["content-type"] = "audio/mpeg"
			set.headers["Content-Disposition"] = `attachment; filename="${filename}"`
			return Bun.file(file)

			//@ts-ignore
		}, apiSongMediaGet)

		.get("/:id/details", async ({set, params: {id}}) => {
			if(!validateID(id)) {set.status = "Bad Request"; return {error: "Invalid ID structure!"}}
			const song = await SongDetails.findByPk(id);
			if(song == null) {set.status = "Not Found"; return {error: "Song not found!"} }
			let jsonSong = song.toJSON();
			return jsonSong;

			//@ts-ignore
		}, apiSongDetailsGet)

		.get("/:id/metadata", async ({set, params:{id}}) => {
			return {error: "TBD"}
		}, apiSongMetadataGet)

)




app.use(swagger({scalarConfig: {theme: "alternate"}, documentation: {info: {title: 'Picosong archive API',version: '0.0.1', description:"[Picosong.com](https://picosong.com) archival project. We try to provide every song uploaded to that platform to be available for easy download using this API."}}}))
//app.use(staticPlugin({assets:"./files/files/picosong.s3.amazonaws.com/", prefix: ""}))
app.listen(3002);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
