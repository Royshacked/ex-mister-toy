import { Button, TextField } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import { userService } from '../services/user.service.js';
import { login, logout, signup } from '../store/actions/user.actions.js';
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service';
import { CommitSharp } from '@mui/icons-material';



export function LoginSignup() {
    const user = useSelector(state => state.userModule.loggedInUser)
    const [isLogin, setIsLogin] = useState(true)

    function onLoginSignup(isLogin) {
        setIsLogin(isLogin)
    }

    async function onHandleSubmit(ev, values) {
        ev.preventDefault()
        if (isLogin) {
            delete values.fullname
            var action = login
        } else {
            action = signup
        }

        try {
            await action(values)
            showSuccessMsg(`${values.username} logged in successfully`)
        } catch (error) {
            console.log(error)
            showErrorMsg('There was a problem')
        }
    }

    async function onLogout() {
        try {
            await logout()
            showSuccessMsg(`See ya`)
        }
        catch (error) {
            showErrorMsg('There was a problem')
        }
    }

    if (user) return <section className="main-user-loggedin">
        <h3>{user.fullname} logged in</h3>
        <button className='user-button' onClick={onLogout}>Logout</button>
    </section>

    return <section className="user-main">
        <Formik
            initialValues={{
                username: '',
                password: '',
                fullname: '',
            }}
            validationSchema={EditSchema}
        >
            {({ errors, touched, values }) => (

                <Form onSubmit={(ev) => onHandleSubmit(ev, values)} >

                    <label htmlFor="username">
                        <Field type="text" id="username" name="username" placeholder="Username" required />
                        {/* {errors.username && touched.username && <span>{errors.username}</span>} */}
                    </label>


                    <label htmlFor="password">
                        <Field type="password" id="password" name="password" placeholder="Password" required />
                        {/* {errors.password && touched.password && <div>{errors.password}</div>} */}
                    </label>


                    {!isLogin && <label htmlFor="fullname">
                        <Field type="text" id="fullname" name="fullname" placeholder="Fullname" required />
                        {/* {errors.fullname && touched.fullname && <div>{errors.fullname}</div>} */}
                    </label>}
                    <button className='user-button' variant='outlined' type="submit" sx={{ color: 'gray', borderColor: 'gray' }}>{isLogin ? 'Login' : 'Signup'}</button>
                </Form>)}
        </Formik>
        <span>Would you like to <span className="user-log" onClick={() => onLoginSignup(!isLogin)}>{isLogin ? 'Signup' : 'Login'}?</span></span>
    </section>
}

const EditSchema = Yup.object().shape({
    username: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long')
        .required('Required'),
    fullname: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long')
        .required('Required'),
    password: Yup.number()
        .min(10, 'Too Low!')
        .max(1000, 'Too High!')
        .required('Required'),
})


function CustomUserInput(props) {
    return <TextField {...props} sx={{ height: 20 }} />
}
