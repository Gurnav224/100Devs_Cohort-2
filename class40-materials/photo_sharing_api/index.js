import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

dotenv.config();


/*
image_url
caption
likes
*/

const PhotoSchema = new mongoose.Schema({
	image_url: String,
	caption: String,
	likes:{
		type:Number,
		default:0
	}
},{timestamps:true})


const Photo = mongoose.model('Photo', PhotoSchema);


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.set('view engine', 'ejs');




app.get("/", async (_req, res) => {
	const photos = await Photo.find().lean();
	res.render('index', {photos})
});

app.post('/', async (req , res) => {
	const {image_url, caption} = req.body;
	const photo = new Photo({image_url, caption});
	await photo.save()
	res.json(photo)
})



app.get('/photos/:id', async (req, res) => {
	const photoId = req.params.id
	const photo = await Photo.findById(photoId).lean();
	res.render('photo-details',{photo})
})

app.put('/photos/:id', async (req, res) => {
	const id = req.params.id;
	const updatedPost = await Photo.findByIdAndUpdate(id, {$inc:{likes:1}}, {new:true})
	  console.log('Post likes updated:', updatedPost);
	  res.json(updatedPost)
})

const PORT = process.env.PORT || 5000;

mongoose
	.connect(process.env.DB_URI, { dbName: "photo_sharing_db" })
	.then(() => {
		console.log("connected to database");
		app.listen(PORT, () => {
			console.log(`server started on the http://localhost:${PORT}`);
		});
	})
	.catch((error) => {
		console.error("failed to connect to database", error);
		process.exit(1);
	});
