import generateToken from "../Functionality/genrateToken.js";
import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userSchema.js"
import jwt from 'jsonwebtoken'



//Authenticate user
//POST http://localhost:port/users/login
//Access public
const authUser=asyncHandler(async(req,res)=>{
    // console.log(req.body)
    // console.log(process.env.JWT_SECRET)
    // console.log(process.env.NODE_ENV)
    const {email,password}=req.body;
  const user=await User.findOne({email});
  if(user && (await user.matchPassword(password))){
       generateToken(res,user._id);

      //--------------------------------------------------------------------------------------------------
// transfer it to functionality to reuse and segregation
   //------------------------------------------------------------------------------------------ 
    // const token=jwt.sign({userId:user._id},process.env.JWT_SECRET,{
    //     expiresIn:'30d'
    // });

    // //set jwt as http only
    // res.cookie('jwt',token,{
    //     httpOnly:true,
    //     secure:process.env.NODE_ENV !== 'development',
    //     sameSite:'strict',
    //     maxAge:30 * 24 * 60 * 60 *1000
    // })
    res.status(200).json({
        _id:user._id,
        name:user.name,
        email:user.email,
        contactNumber:user.contactNumber,
        address:user.address,
        city:user.city,
        postalCode:user.postalCode,
        state:user.state,
        country:user.country,
        isAdmin:user.isAdmin,

    });
    }else{
        res.status(401);
        throw new Error("Invalid email or password");
        }
  
})

//Register user
//POST http://localhost:port/users/register
//Access public
const registerUser=asyncHandler(async(req,res)=>{
    const {name,email,password,addharNumber,contactNumber,address}=req.body;
    const userExist=await User.findOne({email});
    if(userExist){
        res.status(400);
        throw new Error("User already exists");
        }
        const user=await User.create({
            name,
            email,
            password,
            addharNumber,
            contactNumber,
            address,
            });

            if(user){
                generateToken(res,user._id);
                res.status(201).json({
                    _id:user._id,
                    name:user.name,
                    email:user.email,
                    contactNumber:user.contactNumber,
                    address:user.address,
                    isAdmin:user.isAdmin,
                    status:"registered"
                    });
                    }else{
                        res.status(400);
                        throw new Error("Invalid user data");
                        }

    })

    //logout user remove cookie
    //POST http://localhost:port/users/logout
    //Access private
    const logoutUser=asyncHandler(async(req,res)=>{
        res.cookie('jwt','', {
            // expires: new Date(Date.now() + 10 * 1000),
            httpOnly: true,
            expires: new Date(0)
            });
            res.status(200).json({ success: true,status:"logout" });
         })




                //get user profile
                //Get localhost:port/users/profile
                //Access private
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//Not Working
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

     const getUserProfile=asyncHandler(async(req,res)=>{
      
       
        // console.log(req.user._id +"checking id")
        // const user=await User.findById(req.user._id);
        // if(user){
        //     res.status(200).json({
        //         _id:user._id,
        //         name:user.name,
        //         email:user.email,
        //         addharNumber:user.addharNumber,
        //         contactNumber:user.contactNumber,
        //         address:user.address,
        //         isAdmin:user.isAdmin,
        //         status:"profile"
        //     })
        // }else{
        //     res.status(404);
        //     throw new Error("User not found");
        // }
    });

                //update user profile
                //PUT localhost:port/users/profile
                //Access private
              //  const updateUserProfile = asyncHandler(async (req, res) => {
                //     res.send("update user")
                    // const user = await User.findById(req.user._id);
                  
                    // if (user) {
                    //   //update user or leave user as it was
                    //   user.name = req.body.name || user.name;
                    //   user.email = req.body.email || user.email;
                  
                    //   //only do it if you are updating the password
                    //   if (req.body.password) {
                    //     user.password = req.body.password;
                    //   }
                    //   const updated = await user.save();
                    //   res.status(200).json({
                    //     _id: updated._id,
                    //     name: updated.name,
                    //     email: updated.email,
                    //     password:updated.password,
                    //     contactNumber:updated.contactNumber,
                    //     address:updated.address, 
                    //     isAdmin: updated.isAdmin,
                    //   });
                    // } else {
                    //   res.status(404);
                    //   throw new Error("User not found");
                    // }
             //     });    

     const updateUserProfile=asyncHandler(async(req,res)=>{
        //   res.send("update user profile");
        // console.log(req.body._id +"check");
        const {name,email,password,addharNumber,contactNumber,address}=req.body;
        
         const userExist=await User.findById(req.body._id);
        //  console.log(userExist)
        if(userExist){

                
                const userExist=await User.updateOne({
                    name,
                    email,
                    password,
                    addharNumber,
                    contactNumber,
                    address,
                    })

                    console.log("updated")
            
        }else{
            res.status(404);
            throw new Error("User not found");
        }

     });

                //get all users
                //GET localhost:port/users/
                //Access private/Admin
        const getAllUsers=asyncHandler(async(req,res)=>{
            const user=await User.find();
            console.log(user)
            res.send(user);
       });

                //delete user
                //DELETE localhost:port/users/:id
                //Access private/Admin
        const deleteUser=asyncHandler(async(req,res)=>{
            res.send("delete user");
        });

                //get user by Id
                //GET localhost:port/users/:id
                //Access private/Admin
       const getUserById=asyncHandler(async(req,res)=>{
                    res.send("get user by id");
       })

                //update user
                //Put localHost:port/users/:id
                //Access private/Admin

                const updateUser=asyncHandler(async(req,res)=>{
                    res.send("update user");
                })

                export {
                    authUser,
                    registerUser,
                    logoutUser,
                    getUserProfile,
                    updateUserProfile,
                    getAllUsers,
                    deleteUser,
                    getUserById,
                    updateUser
                }