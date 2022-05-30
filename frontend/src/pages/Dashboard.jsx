import { useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import BugForm from '../components/BugForm';
import BugItem from '../components/BugItem';
import Spinner from '../components/Spinner';
import { getBugs, reset } from '../features/bugs/bugSlice'

function Dashboard() {

  const navigate = useNavigate(); 
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { bugs, isLoading, IsError, message } = useSelector((state) => state.bugs);

  useEffect(() => {
    if (IsError) {
      console.log(message);
    }
    if (!user) {
      navigate('/login')
    }

    dispatch(getBugs())

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, IsError, message, dispatch]);

  if(isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='heading'>
        <h1>Welcome { user && user.name }</h1>
        <p>Bug Dashboard</p>
      </section>
      <BugForm />

      <section className='content'>
        { bugs.length > 0 ? (
        <div className='bugs'>
          { bugs.map((bug) => (
            <BugItem key={bug._id} bug={ bug } />
          ))}
        </div>

        ) : (
        <h3>You have no assigned bugs</h3>
        )}  
      </section> 
    </>
  )
}

export default Dashboard