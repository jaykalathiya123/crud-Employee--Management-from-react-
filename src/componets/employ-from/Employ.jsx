import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import { useState, useEffect } from 'react';
import getdata from '../js/main';
import generateUniqueId from 'generate-unique-id';

function FromEmploy() {


  const [input, setInput] = useState({
    id: '',
    fname: '',
    lname: '',
    email: '',
    pass: '',
    address: '',

  })

  const [storage, setStorage] = useState(getdata());

  const handleForm = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setInput({
      ...input,
      [name]: value,
    })
  }
  const handleEdit = (id) => {
    console.log("id", id);
    
    let record = storage.find((rec) => rec.id === id);
  
      setInput(record);
  }

  const handleRemove = (id) => {
    console.log("id", id);
    let record =  storage ;
    let removeData = record.filter((rec) => {
      return rec.id !== id ;
    })

    setStorage(removeData) ;

  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.id) {
      let newRecord = storage.map((record) => 
        record.id === input.id ? input : record
      );
      setStorage(newRecord);
    } else {
      let obj = {
        ...input,
        id: generateUniqueId({
          length: 3,
          useLetters: false,
        }),
      };
      setStorage([...storage, obj]);
    }
  
    setInput({
      fname: '',
      lname: '',
      email: '',
      pass: '',
      address: '',
    });
  }
  

  useEffect(() => {
    localStorage.setItem('EmployeeData', JSON.stringify(storage))
  }, [storage])



  return (
    <div className="container py-4">
      <h3 className="text-center mb-4 text-primary">Employee Management System </h3>
      
      <Form onSubmit={handleSubmit} className="p-4 shadow-sm bg-light rounded">
        <Row className="mb-3">
          {/* Hidden Field for ID */}
          <Form.Group controlId="id" className="d-none">
            <Form.Control type="text" name="id" value={input.id} onChange={handleForm} />
          </Form.Group>
  
          {/* First Name */}
          <Form.Group as={Col} controlId="fname" className="mb-3">
            <Form.Label>First Name</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="First Name" 
              name="fname" 
              value={input.fname} 
              onChange={handleForm} 
              className="border-primary"
            />
          </Form.Group>
  
          {/* Last Name */}
          <Form.Group as={Col} controlId="lname" className="mb-3">
            <Form.Label>Last Name</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Last Name" 
              name="lname" 
              value={input.lname} 
              onChange={handleForm} 
              className="border-primary"
            />
          </Form.Group>
        </Row>
  
        <Row className="mb-3">
          {/* Email */}
          <Form.Group as={Col} controlId="formGridEmail" className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control 
              type="email" 
              placeholder="Enter email" 
              name="email" 
              value={input.email} 
              onChange={handleForm} 
              className="border-primary"
            />
          </Form.Group>
  
          {/* Password */}
          <Form.Group as={Col} controlId="formGridPassword" className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control 
              type="password" 
              placeholder="Password" 
              name="pass" 
              value={input.pass} 
              onChange={handleForm} 
              className="border-primary"
            />
          </Form.Group>
        </Row>
  
        {/* Address */}
        <Form.Group className="mb-3" controlId="formGridAddress1">
          <Form.Label>Address</Form.Label>
          <Form.Control 
            placeholder="Enter Address" 
            name="address" 
            value={input.address} 
            onChange={handleForm} 
            className="border-primary"
          />
        </Form.Group>
  
        <div className="d-flex justify-content-center">
          <Button variant="primary" type="submit" className="px-5">
            Submit
          </Button>
        </div>
      </Form>
  
      <h3 className="text-center mt-5 text-primary">User Records</h3>
      <Table responsive="md" className="table-striped table-bordered mt-4 shadow-sm">
        <thead className="bg-primary text-white">
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {storage.map((rec, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{rec.fname}</td>
              <td>{rec.lname}</td>
              <td>{rec.email}</td>
              <td>{rec.pass}</td>
              <td>{rec.address}</td>
              <td>
                <Button variant="warning" size="sm" onClick={() => handleEdit(rec.id)}>
                  <i className="bi bi-pencil-square"></i>
                </Button>
                <Button variant="danger" size="sm" onClick={() => handleRemove(rec.id)} className="ms-2">
                  <i className="bi bi-trash-fill"></i>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default FromEmploy;