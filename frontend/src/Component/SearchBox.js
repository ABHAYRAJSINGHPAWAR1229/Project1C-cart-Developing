import React,{useState} from 'react'
import {Form,Button} from 'react-bootstrap'
import {userParams,useNavigate, useParams} from 'react-router-dom'


const SearchBox = () => {
  const navigate=useNavigate();
  const {keyword:urlKeyword} =useParams();
  const [keyword, setKeyword] = useState(urlKeyword || '')
  const submitHandler =(e)=>{
    e.preventDefault();
    if(keyword.trim()){
        setKeyword('');
        navigate(`/{keyword}`);
            }else{
                navigate('/')
                }
                
  }
    return (
    <Form onSubmit={submitHandler} className='d-flex'>
        <Form.Control
        type='text'
        name='q'
        onChange={(e)=>setKeyword(e.target.value)}
        value={keyword}
        placeholder='Search Products...'
        className='mr-sm-2 ml-sm-3'
        style={{backgroundColor:'lightgoldenrodyellow' }}
        ></Form.Control> &nbsp;&nbsp;
        <Button type='submit' variant='outline-dark' className='p-2'>Search</Button>
    </Form>
  )
}

export default SearchBox