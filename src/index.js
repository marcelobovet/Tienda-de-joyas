const app = require('./app');


const joyasRouter = require('./routes/joyas');
app.use('/joyas', joyasRouter);










app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`)
})
