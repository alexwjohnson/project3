import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createBug } from '../features/bugs/bugSlice';

// description: req.body.description,
// state: req.body.state,     //Todo dropdown
// priority: req.body.priority, //todo dropdown

function BugForm() {
    const [ description, setDescription ] = useState('');
    const [ bugState, setBugState ] = useState('');
    const [ priority, setPriority ] = useState('');
    const dispatch = useDispatch();

    const onSubmit = (e) => {
        e.preventDefault()

        dispatch(createBug({
            description,
            bugState,
            priority,
        }))
        setDescription('')
        setBugState('')
        setPriority('')
    }
  return <section className='form'>
            <form onSubmit={ onSubmit }>
                <div className='form-group'>
                    <label htmlFor='description'>Bug</label>
                    <input  type='text' 
                            name='description' 
                            id='description'
                            placeholder='Description' 
                            value={ description } 
                            onChange={ (e) => setDescription(e.target.value) } 
                    />
                    <input  type='text' 
                            name='bugState' 
                            id='bugState'
                            placeholder='New' 
                            value={ bugState } 
                            onChange={ (e) => setBugState(e.target.value) } 
                    />
                    <input  type='text' 
                            name='priority' 
                            id='priority' 
                            placeholder='Low'
                            value={ priority } 
                            onChange={ (e) => setPriority(e.target.value) } 
                    />
                </div>
                <div className='form-group'>
                    <button className='btn btn-block' type='submit'>
                      Submit Bug
                    </button>
                </div>
            </form>
         </section>

}

export default BugForm