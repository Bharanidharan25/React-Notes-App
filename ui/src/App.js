import React from 'react';
import './App.css';
import {Navbar,Nav,Card, OverlayTrigger, Popover} from 'react-bootstrap';
import CreateModal from './createModal';
import axios from 'axios';
import ShowModal from './ShowModal';
import Swal from 'sweetalert2'
import { CirclePicker } from 'react-color';
import socketIOClient from 'socket.io-client'
const endPoint = "http://localhost:3010"

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
    searchString:'',
    color:''
  }


  componentDidMount(){
    const socket = socketIOClient(endPoint);
    socket.on('connect', ()=>console.log('connected successfully'))
    socket.on('added',response => {
      this.setState({notes:[...this.state.notes,response]})
    })
    socket.on('updated',response => {
      const notes = [...this.state.notes]
      notes.map((note) =>{
        if(note._id === response._id){
          note.title = response.title
          note.body = response.body
          note.color = response.color
        }
        return note
      })
      this.setState(notes)
    })
    socket.on('deleted',response=>{
      console.log('called')
      const notes = [...this.state.notes].filter(note=>note._id !== response._id)
      this.setState({notes})
    })
    axios.get('http://localhost:3010/notes')
      .then((Response)=>{
        this.setState({notes:Response.data})
      })
  }


  
  submitNote = (data) =>{
    axios.post('http://localhost:3010/notes',data)
    .then((response)=>{
      // this.setState(()=>{
      //   const notes = [...this.state.notes, response.data]
      //   return {notes}
      // })
      Swal.fire(
        'Success',
        'Record created successfully',
        'success'
      )
    })
    .catch(err=>
      Swal.fire(
        'Failure',
        JSON.stringify(err.message),
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
            err.message,
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
        err.message,
        'Error'
      )
    })
    
  }

  colorChangeHandler = (color,id)=>{
    axios.put(`http://localhost:3010/notes/${id}`,{color:{...color.rgb,a:0.4}})
    .then(respose=>{
      console.log(respose.data)
      const notes = [...this.state.notes]
      notes.map((note) =>{
        if(note._id === id){
          note.color = {...color.rgb,a:0.4}
        }
        return note
      })
      this.setState(notes)})
      .catch(err=>console.log(err))
  }


  render(){
    // console.log(this.state.notes)
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
            <Card key={content._id} className ="cardCustom" style={{backgroundColor:`rgba(${content.color.r},${content.color.g},${content.color.b},${content.color.a})`}}>
              <Card.Body>
                <Card.Title style={{display:'flex',justifyContent:'space-between'}}>
                  <div style={{height:'1.5rem',width:'75%',overflow:'hidden',textOverflow: 'ellipsis',whiteSpace:'nowrap'}}>
                    {content.title}
                  </div>
                </Card.Title>
                <Card.Text>
                  <span style={{display:'block', height:'10.5rem',overflow:'hidden',overflowWrap:' break-word',wordWrap: 'break-word',hyphens: 'auto',whiteSpace: 'pre-wrap'}}>
                    {content.body}
                  </span>
                </Card.Text>

                <div className='footerButton'>
                  <OverlayTrigger
                    trigger="click"
                    key="bottom"
                    placement="bottom"
                    rootClose
                    overlay={
                      <Popover id={`popover-positioned-bottom`}>
                        <Popover.Content>
                        <CirclePicker width='150px' circleSpacing={10} circleSize={25} colors= {["#ffffff","#c4e3f8", "#ded5f6", "#fcf4d1", "#f6bfbf", "#cfd8dc", "#b2dfdb", "#f5c9d8"]} onChangeComplete={(color) => this.colorChangeHandler(color,content._id)}/>
                        </Popover.Content>
                      </Popover>
                    }
                  >
                    <i className="fa fa-paint-brush" aria-hidden="true"></i>
                  </OverlayTrigger>
                  <i className="fa fa-trash-o" aria-hidden="true" onClick={(e) =>{e.preventDefault() ; this.deleteItem(content._id)}}></i>
                  <i className='fa fa-edit' onClick={(e)=>{
                      e.preventDefault(); 
                      this.setState({id:content._id,title:content.title,body:content.body});
                      this.setState({modalType:'edit'});
                      this.setState({modalShow:true});

                      }}
                  ></i>
                  <i className="fa fa-folder-open-o" aria-hidden="true" onClick={()=>{
                    this.setState({modal2Show:true}); 
                    this.setState({id:content._id,title:content.title,body:content.body})
                    }}
                  ></i>
                </div>

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
