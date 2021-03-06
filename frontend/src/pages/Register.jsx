import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaUser } from 'react-icons/fa';
import { register, reset } from '../features/auth/authSlice';
import Spinner from '../components/Spinner';


function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordchk: ''
  });

  const { name, email, password, passwordchk } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {user, isLoading, isSuccess, isError, message } = useSelector((state) => state.auth)

  useEffect(() => {
      if(isError) {
        toast.error(message);
      }
      if(isSuccess || isError) {
        navigate('/');
      }
      dispatch(reset());
  }, [ user, isSuccess, isError, message, navigate, dispatch ])

  const onChange = (e) => {
    setFormData((prevState) => ({ 
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  };
  const onSubmit = (e) => {
    e.preventDefault()

    if (password !== passwordchk) {
      toast.error('Passwords do not match');
    } else {
      const userData = {
        name,
        email,
        password,    
      }
      dispatch(register(userData));
    }
  };

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
        <section className="heading">
          <h1>
            <FaUser /> Register
          </h1>
          <p>Create your Bug Tracker account...</p>
        </section>
        <section className="form">
            <form onSubmit={ onSubmit }>
              <div className="form-group">
              <input  type="text" 
                      name="name" 
                      id="name" 
                      className="form-control" 
                      value={ name } 
                      placeholder="Name" 
                      onChange={ onChange }
              />
              </div>
              <div className="form-group">
              <input  type="email" 
                      name="email" 
                      id="email" 
                      className="form-control" 
                      value={ email } 
                      placeholder="Email" 
                      onChange={ onChange }
              />
              </div>
              <div className="form-group">
              <input  type="password" 
                      name="password" 
                      id="password" 
                      className="form-control" 
                      value={ password } 
                      placeholder="Password" 
                      onChange={ onChange }
              />
              </div>
              <div className="form-group">
              <input  type="password" 
                      name="passwordchk" 
                      id="passwordchk" 
                      className="form-control" 
                      value={ passwordchk } 
                      placeholder="Confirm password" 
                      onChange={ onChange }
              />
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-block">
                  Submit
                </button>
              </div>
            </form>
        </section>
    </>
  )
}

export default Register