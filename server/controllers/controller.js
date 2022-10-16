require('dotenv').config();
const Model = require('../models/model');
const Teacher = Model.teacher;
const Student = Model.student;
const jwt = require("jsonwebtoken");
const JWTAuth = require('../JWT/jwtAuth');
const bcrypt = require("bcrypt");

function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null) return res.sendStatus(401);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return res.sendStatus(403);
        req.user = user;
        next();
    })
}

//GET '/tea'
const login = (req, res, next) => {
    const email = req.body.loginEmail;
    const password = req.body.loginPass;
    const teacherLogin = req.body.teacherLogin;
    const user = {e_mail: email}
    const accessToken = JWTAuth.generateToken(user);
    console.log(email, password, teacherLogin);
    if(teacherLogin)
    {
    Teacher.findOne({email:email}, async (err, teacher) =>{
        if(teacher){
            if(await bcrypt.compare(password, teacher.password))
            {
                res.send({message: "Teacher Login Successful", TeacherObj: teacher, accessToken: accessToken, isTeacher: true})
            }
            else
            {
                res.send({message: "Password does not match"})
            }
            
        }
        else{
            res.send({message: "Teacher not registered"})
        }
        })
        // res.send({message: "Teacher login"})
    }

    else{
        Student.findOne({roll:email}, async (err, student) =>{
            if(student){
                if(await bcrypt.compare(password, student.password))
                {
                    res.send({message: "Student Login Successful", StudentObj: student, accessToken: accessToken, isTeacher: false})
                }
                else
                {
                    res.send({message: "Password does not match"})
                }
                
            }
            else{
                res.send({message: "Student not added"})
            }
            })
    // res.json({message: "Student login"});
    }
    
};

//POST '/tea'
const home = (req, res, next) => {
    res.json({message: "At home"});
};

const register = (req, res, next) => {

     const name =  req.body.name;
     const phone = req.body.contact;
     const email = req.body.regEmail;
    //  const password = req.body.regPass;
    
     async function hashPass(){
        const password =  await bcrypt.hash(req.body.regPass, 10);
        console.log(name, phone, email, password);
        Teacher.findOne({email: email}, (err, teacher) => {
            // console.log(teacher);
            if(teacher){
                res.send({message: "Teacher already registered"});
            }
            
            else{
                const newTeacher = new Teacher({
                    name,
                    phone,
                    email,
                    password
                })
                newTeacher.save( err => {
                    if(err){
                        res.send(err);
                    }
                    else{
                        res.send({message: "Successfully registered"});
                    }
                })
                
            }
        })


     }
     hashPass();

    
    // console.log(req.body);



    // console.log(req.body);
    // res.json({message: "Teacher Registration"});
};

const addStudent = (req, res, next) => {
     const name =  req.body.name;
     const age = req.body.age;
     const grade = req.body.grade;
     const roll = req.body.roll;
    //  const password = req.body.pass;
    
     async function hashPass(){
        const password =  await bcrypt.hash(req.body.pass, 10);
        // console.log(name, phone, email, password);
       Student.findOne({roll: roll}, (err, student) => {
            // console.log(teacher);
            if(student){
                res.send({message: "Student already registered"});
            }
            
            else{
                const newStudent = new Student({
                    name,
                    age,
                    grade,
                    roll,
                    password
                })
                newStudent.save( err => {
                    if(err){
                        res.send(err);
                    }
                    else{
                        res.send({message: "Successfully registered"});
                    }
                })
                
            }
        })


     }
     hashPass();


};



const getAllTeachers = (req, res, next) => {


            Teacher.find({}, function(err, Teachers) {
                if (!err) { 
                    // console.log(docs);
                    let teachers = [];
                    Teachers.forEach(element => {
                        teachers.push(element.name);
                    });
                    res.send({message: "retrieved all", allTeachers: teachers});
                }
                else {
                    res.send({message: err});
                }
            });
        
    

    
    
}

const getFavTeachers = (req, res, next) => {
    const roll_no = req.body.roll_no;

           
            Student.findOne({roll:roll_no}, async (err, student) =>{
                if(student)
                {
                    res.send({message: "retrieved favs", favTeachers: student.favTeachers})
                }
                else
                {
                    res.send({message: err})
                }
                });
        
      

    
    

}


const addTeacher = (req, res, next) => {
    console.log("Helllo add-favs")
    const teachers = req.body.teachers;
    const roll_no = req.body.roll;
    console.log(req.body);
    Student.findOneAndUpdate({roll:roll_no},{favTeachers:teachers},
        function (error, success) {
            if (error) {
                
                res.send({message: "Error"});
            } else {
                
                res.send({message: "List Updated"});
            }
        });

    
}

const getAggScore = (req, res, next) => {
     Student.aggregate([
        {
          $unwind: "$favTeachers"
        },
        {
          $group: {
            _id: {
              year: "$year",
              favTeachers: "$favTeachers"
            },
            favTeachers: {
              $push: "$favTeachers"
            }
          }
        },
        {
          "$group": {
            _id: "$_id.name",
            favTeachers: {
              $push: {
                k: "$_id.favTeachers",
                v: {
                  $size: "$favTeachers"
                }
              }
            }
          }
        },
        {
          $project: {
            _id: 0,
            name: "$_id",
            favTeachers: {
              $arrayToObject: "$favTeachers"
            }
          }
        }
      ]).exec((err, score) => {
        if (err) throw err;
        console.log(score);
        scoreObj = score[0].favTeachers;
        let maxVal = Number.MIN_VALUE;
        let mostFav = "";
        for (var key in scoreObj)
        {
            if (scoreObj[key] >= maxVal)
            {
                maxVal = scoreObj[key];
                mostFav = key;
                
            }
        }
        console.log(mostFav);
        res.send({message: "Aggregated!", mostfav: mostFav})
    })
}


//export controller functions
module.exports = {
    login,
    home,
    register,
    addStudent,
    addTeacher,
    getAllTeachers,
    getFavTeachers,
    getAggScore
};
