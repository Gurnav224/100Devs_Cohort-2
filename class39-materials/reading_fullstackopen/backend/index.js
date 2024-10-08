import express from "express";
import cors from "cors";


import Note from "./models/notes.js";

const app = express();

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// handler of requests with unknown endpoint



const errorHandler =  (error, request , response ,next) =>{
  console.error(error.message)

  if(error.name === 'CastError'){
    return response.status(400).send({error:'mailformed Id'})
  }
  next(error)
}

const logger = (request, response, next) => {
  console.log(`${request.url} ${request.method}  `);
  next();
};

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json());
app.use(logger);



app.get("/", (request, response) => {
  response.send("<h1>Hello World! </h1>");
});


app.post("/api/notes", (request, response) => {
  const body = request.body;

  if (!body.content) {
    return response.status(400).json({
      error: "content missing",
    });
  }
  const note = new Note(
    {
      content: body.content,
      important: Boolean(body.important) || false,
    }
  )

  note.save().then(saveNote => {
    response.json(saveNote)
  })

 
});


app.get("/api/notes", (request, response) => {
  Note.find({}).then((notes) => {
    response.json(notes);
  });
});

app.get("/api/notes/:id", (request, response , next) => {
  const id = request.params.id;
  Note.findById(id).then((note)=>{
    if(note){

      response.json(note)
    }else{
      response.status(404).json({message:'no note found'})
    }
  })
  .catch((error)=>{
    next(error)
  })
});


app.put('/api/notes/:id', (request , response, next) =>{
  const body = request.body;

  const note = {
    content:body.content,
    important:body.important
  }

  Note.findByIdAndUpdate(request.params.id,note , {new:true})
  .then(updateNote =>{
    response.json(updateNote)
  })
  .catch((error)=>next(error))
})

app.delete("/api/notes/:id", (request, response ,next) => {
  const id = request.params.id;
  Note.findByIdAndDelete(id)
  .then((result) =>{

    response.status(204).end();
  })
  .catch((error) => next(error))
});

const port = 3001;


app.use(errorHandler)
app.use(unknownEndpoint)


app.listen(port, () => {
  console.log(`server starting on port ${port}`);
});
