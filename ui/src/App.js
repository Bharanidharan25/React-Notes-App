import React from 'react';
import './App.css';
import {Navbar,Nav,Button,Card, ButtonGroup} from 'react-bootstrap';
import CreateModal from './createModal';
import axios from 'axios';
import ShowModal from './ShowModal';
import Swal from 'sweetalert2'

class App extends React.Component{
  state = {
    modalShow:false,
    notes:[],
    notesToDisplay:[],
    modal2Show : false,
    modalType :'',
    id:'',
    title:'',
    body:'',
    searchString:''
  }


  componentDidMount(){
    axios.get('http://localhost:3010/notes')
      .then((Response)=>{
        this.setState({notes:Response.data})
      })
  }

  submitNote = (data) =>{
    axios.post('http://localhost:3010/notes',data)
    .then((response)=>{
      this.setState(()=>{
        const notes = [...this.state.notes, response.data]
        return {notes}
      })
      Swal.fire(
        'Success',
        'Record created successfully',
        'success'
      )
    })
    .catch(err=>
      Swal.fire(
        'Failure',
        err,
        'error'
      )
      )
    
  }

  deleteItem = (id)=>{
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    })
    .then((result) => {
        if(result.value){
          axios.delete(`http://localhost:3010/notes/${id}`)
        .then((response)=>{
          Swal.fire(
            'Deleted!',
            'Record is Deleted',
            'success'
          )
        })
        .catch(err=>{
          Swal.fire(
            'Failed!',
            err,
            'Error'
          )
        })
        const notes = [...this.state.notes].filter(note=>note._id !== id)
        this.setState({notes})
      }
    })
  }
    

  updateNote = (data) =>{
    axios.put(`http://localhost:3010/notes/${data.id}`,{title:data.title,body:data.body})
    .then(respose=>{
      const notes = [...this.state.notes]
      notes.map((note) =>{
        if(note._id === data.id){
          note.title = data.title
          note.body = data.body
        }
        return note
      })
      this.setState(notes)
      Swal.fire(
        'Updated!',
        'Record is Updated',
        'success'
      )
    })
    .catch(err=>{
      Swal.fire(
        'failed!',
        err,
        'Error'
      )
    })
    
  }


  render(){
    return(
      <>
      <Navbar sticky="top" expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="#home">Keep Notes</Navbar.Brand>
        <Nav.Link onClick={() => this.setState({modalShow:true, modalType:''})} style={{color:'white',textDecoration:'none',position:'absolute',right:0,fontSize:'20px'}}><i className="fa fa-plus"></i></Nav.Link>
      </Navbar>

      {/* <Form className='searchInput'>
        <FormControl type="text" value={this.state.searchString} onChange={(e) => this.setState({searchString:e.target.value})} placeholder="Filter by title..." className="mr-sm-2" />
      </Form> */}

      <CreateModal
          className='modal-content'
          show={this.state.modalShow}
          onHide={() => this.setState({modalShow:false})}
          submitNote={this.submitNote}
          updateNote={this.updateNote}
          data={{id:this.state.id,title:this.state.title,body:this.state.body}}
          type={this.state.modalType}
      ></CreateModal>

      <ShowModal
        className='modal-content'
        show={this.state.modal2Show}
        onHide={() =>this.setState({modal2Show:false})}
        data={{id:this.state.id,title:this.state.title,body:this.state.body}}
      ></ShowModal>


      <div style={{width:'90%',margin:'auto'}}>
        <div className='cardList'>
          {this.state.notes.map( content => (
            <Card key={content._id} style={{ marginTop:'20px',width: '18rem',boxShadow:'0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',borderRadius:'0.7rem'}}>
              <Card.Body>
                <Card.Title style={{display:'flex',justifyContent:'space-between'}}>
                  <div style={{height:'1.5rem',width:'75%',overflow:'hidden',textOverflow: 'ellipsis',whiteSpace:'nowrap'}}>
                    {content.title}
                  </div>
                  <span style={{fontSize:'20px',color:'grey'}}>
                    <a className='edit' href=" #" onClick={(e)=>{
                      e.preventDefault(); 
                      this.setState({id:content._id,title:content.title,body:content.body});
                      this.setState({modalType:'edit'});
                      this.setState({modalShow:true});

                      }}
                    >
                      <i className='fa fa-edit'></i>
                    </a>
                  </span>
                </Card.Title>
                <hr/>
                <Card.Text>
                  <span style={{display:'block', height:'10.5rem',overflow:'hidden',overflowWrap:' break-word',wordWrap: 'break-word',hyphens: 'auto',whiteSpace: 'pre-wrap'}}>
                    {content.body}
                  </span>
                </Card.Text>
                <ButtonGroup style={{float:'right'}}>
                  <Button variant='danger' onClick={(e) =>{e.preventDefault() ; this.deleteItem(content._id)}}>Delete</Button>
                  <Button variant='primary' onClick={()=>{
                    this.setState({modal2Show:true}); 
                    this.setState({id:content._id,title:content.title,body:content.body})
                    }}
                  >View</Button>
                </ButtonGroup>
              </Card.Body>
            </Card>
            )
          )}
        </div> 
      </div>
      </>
    );
  }
}
export default App;
