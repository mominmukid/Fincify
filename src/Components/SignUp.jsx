
import Input from './Input'
import { useState } from 'react';
import Button from './Button';
import { auth, db, provider } from '../firebase'
import { doc, setDoc, getDoc } from "firebase/firestore";
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword, signInWithPopup, signInWithEmailAndPassword, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from 'react-router-dom';


function SignUp() {
   const [name, setname] = useState('')
   const [email, setemail] = useState('')
   const [password, setpassword] = useState('')
   const [loading, setloading] = useState(false)
   const [loginForm, setloginForm] = useState(false)
   const [confirmPassword, setConfirmPassword] = useState('')
   const navigate = useNavigate()

   //   ***********************
   // both fugtion use to which from is show login or signup
   const handelAlreadyHaveAccount = () => {
      setloginForm(!loginForm)
   }
   const handelAlreadyDontHaveAccount = () => {
      setloginForm(!loginForm)
   }


   //   ***********************  
   // fugtion for create the new user or sign up user
   const signUpWithEmail = async (e) => {
      e.preventDefault();
      console.log("rech here");
      setloading(true)
      // Authenticate the the user or Create the new accout of user
      if (name !== '' && email !== '' && password !== '' && confirmPassword !== '') {
         if (password === confirmPassword) {
            try {
               const result = await createUserWithEmailAndPassword(auth,
                  email,
                  password);
               const user = result.user;
               setloading(false)
               //create the document the  current userId
               try {
                  await createDoc(user)
               } catch (error) {
                  throw (error);

               }
               toast.success('Account created successfully')
               setname('');
               setemail('');
               setpassword('');
               setConfirmPassword('');
               setloading(false)
               //navigate the user on home or dash board page
               navigate('/dashboard');
            } catch (error) {
               toast.error(error.message)
               setloading(false)
            }

         } else {
            toast.error('password and confirmPassword not match')
            setloading(false)
         }
      } else {
         toast.error("All fileds are mandatory")
         setloading(false)
      }
   }


   //   ***********************
   // fungtion for the user login
   const handelLogin = async (e) => {
      e.preventDefault();
      setloading(true);
      if (email !== '' && password !== '') {
         try {
            const result = await signInWithEmailAndPassword(
               auth,
               email,
               password)
            const user = result.user;
            // navigate the user on home or dash board page
            navigate('/dashboard');
            setloading(false)
            toast.success('Login successfully')
            setemail('')
            setpassword('')
         } catch (error) {
            toast.error(error.message)
            setloading(false)
         }
      } else {
         toast.error("All fileds are mandatory")
         setloading(false)
      }
   }


   //   ***********************
   //  create the document of user 
   const createDoc = async (user) => {
      setloading(true)
      //make sure the user is not exit before 
      //then create the user document
      if (!user) return;
      const userRef = doc(db, 'user', user.uid);
      const userData = await getDoc(userRef)

      if (!userData.exists()) {
         const { displayName, email, photoURL } = user;
         const createdAt = new Date()
         try {
            setloading(!loading);
            await setDoc(userRef, {
               name: displayName ? displayName : name,
               email,
               photoURL: photoURL ? photoURL : "",
               createdAt,
            }

            );
            setloading(false);
            toast.success('document created sucessfully')

         } catch (error) {
            toast.error(e.message)
            console.log("Error hai bhia create doc me", error.message);
            setloading(false)
         }

      } else {
         toast.success('Transactions Fetched!')
         setloading(false)
      }
   }

   const signUpsignInWithGoogle = async (e) => {
      e.preventDefault();
      console.log("rech here google");
      setloading(true)
      try {
         const result = await signInWithPopup(auth, provider);
         const credential = GoogleAuthProvider.credentialFromResult(result);
         const token = credential.accessToken;
         // The signed-in user info.
         const user = result.user;
         navigate('/dashboard');
         toast.success('User Authenticated Successfully!')
         setloading(false)
         try {
            await createDoc(user)
         } catch (error) {
            toast.error(error.message)
         }
      } catch (error) {
         toast.error(error.message)
         const errorCode = error.code;
         const errorMessage = error.message;
         // The email of the user's account used.
         const email = error.customData.email;
         // The AuthCredential type that was used.
         const credential = GoogleAuthProvider.credentialFromError(error);
         setloading(false)
      }
   }

   return (
      <>
         {loginForm ? <>
            <div className=''>
               <div className=' w-[16rem] md:w-[28rem]  p-3 flex justify-center items-center flex-col  shadow-2xl gap-3 shadow-blue-500/80 rounded-lg bg-white'>
                  <h2 className='font-bold text-lg mb-4'>Login on <span className='text-blue-600 cursor-pointer'>Fincify</span></h2>
                  <form className='w-[16rem] md:w-[28rem] p-1 flex justify-center items-center flex-col gap-1  '>


                     <Input placeholder={`Tonystark@gmail.com`} state={email} setState={setemail} label={`Email`} />

                     <Input type={`password`} placeholder={`Example123`} state={password} setState={setpassword} label={`Password`} />


                     <Button type={`submit`}
                        children={loading ? 'Loding...' : 'Login'}
                        onClick={handelLogin}
                     />

                     <p>or</p>

                     <Button children={loading ? 'Loding...' : `Login With Google`}
                        onClick={signUpsignInWithGoogle}
                     />
                     <p className='opacity-80 text-gray-800'>Or Don't Have An Account? <span
                        onClick={handelAlreadyDontHaveAccount}
                        className='border-b border-black cursor-pointer hover:text-blue-800'> Click Here.</span></p>
                  </form>

               </div>
            </div>
         </> : <><div>
            <div className=' w-[16rem] md:w-[28rem]  p-3 flex justify-center items-center flex-col  shadow-2xl gap-3 shadow-blue-500/80 rounded-lg bg-white'>
               <h2 className='font-bold text-lg mb-4'>Sign Up on <span className='text-blue-600 cursor-pointer'>Fincify</span></h2>
               <form className='w-[16rem] md:w-[28rem] p-1 flex justify-center items-center flex-col gap-1  '>
                  <Input placeholder={`Tony stark`} state={name} setState={setname} label={`Full Name`} />

                  <Input placeholder={`Tonystark@gmail.com`} state={email} setState={setemail} label={`Email`} />

                  <Input type={`password`} placeholder={`Example123`} state={password} setState={setpassword} label={`Password`} />

                  <Input type={`password`}
                     disabled={loading}
                     placeholder={`Example123`}
                     state={confirmPassword}
                     setState={setConfirmPassword}
                     label={`Confirm Password`} />

                  <Button type={`submit`}
                     children={loading ? 'Loding...' : 'SignUp'}
                     onClick={signUpWithEmail}
                  />

                  <p>or</p>

                  <Button children={loading ? 'Loding...' : `Sign Up With Google`}
                     onClick={signUpsignInWithGoogle}
                  />
                  <p className='opacity-80 text-gray-800'>Or Have An Account Already? <span
                     onClick={handelAlreadyHaveAccount} className='border-b border-black cursor-pointer hover:text-blue-800'> Click Here.</span></p>
               </form>

            </div>
         </div></>}

      </>
   )
}

export default SignUp