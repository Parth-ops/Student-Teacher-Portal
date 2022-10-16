const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/stud-app", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log("DB connected")
})

const studentSchema = new mongoose.Schema({
    name: String,
    age: Number,
    grade: Number,
    roll: Number,
    password: String,
    favTeachers: Array
})

const teacherSchema = new mongoose.Schema(
    {
        name: String,
        phone: Number,
        email: String,
        password: String,
        favScore: Number

    }
)

const student = new mongoose.model("Student", studentSchema);
const teacher = new mongoose.model("Teacher", teacherSchema);

module.exports = {
    student,
    teacher
};