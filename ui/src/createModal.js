import React, { Component } from 'react'
import {Modal,Button,Form} from 'react-bootstrap';

export default class CreateModal extends Component {
    state = {
        title:'',
        body:''
    }

    componentDidUpdate(prevProps){
        if(this.props.type==='edit' && this.props !== prevProps){
            this.setState({title:this.props.data.title,body:this.props.data.body})
        }
    }

    handleChange = (e) =>{
        this.setState({[e.target.name] : e.target.value})
    }

    handleSubmit = ()=>{
        this.props.submitNote({title:this.state.title,body:this.state.body})
        this.setState({title:'',body:''})
    }

    handleUpdate = ()=>{
        this.props.updateNote({id:this.props.data.id,title:this.state.title,body:this.state.body})
        this.setState({title:'',body:''})
    }

    render() {
            return(
                <Modal
                    show={this.props.show}
                    onHide={this.props.onHide}
                    data ={this.props.data}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            {this.props.type==='edit'? 'Edit Notes': 'Create Notes'}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.props.type === 'edit'? 
                            <Form>
                                <Form.Group >
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control value={this.state.title} name='title' onChange={this.handleChange} type="text" placeholder="Enter the title of Your Note" />
                                </Form.Group>
                                <Form.Group >
                                    <Form.Label>Enter your Notes</Form.Label>
                                    <Form.Control name='body' value={this.state.body} onChange={this.handleChange} as="textarea" rows="3" />
                                </Form.Group>
                            </Form>
                            :
                            <Form>
                                <Form.Group >
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control name='title' onChange={this.handleChange} type="text" placeholder="Enter the title of Your Note" />
                                </Form.Group>
                                <Form.Group >
                                    <Form.Label>Enter your Notes</Form.Label>
                                    <Form.Control name='body' onChange={this.handleChange} as="textarea" rows="3" />
                                </Form.Group>
                            </Form>
                        }
                    </Modal.Body>
                    <Modal.Footer>
                        {this.props.type ==='edit'?
                            (
                            <>
                            <Button variant='dark' onClick={this.props.onHide}>Cancel</Button>
                            <Button variant='dark' type='submit' onClick = {()=>{
                                this.handleUpdate()
                                this.props.onHide() 
                            }}>Update
                            </Button>
                            </>)
                        :
                            (
                            <>
                            <Button variant='dark' onClick={this.props.onHide}>Cancel</Button>
                            <Button variant='dark' type='submit' onClick = {()=>{
                                this.handleSubmit()
                                this.props.onHide() 
                            }}>Save</Button>
                            </>)
                        }
                        
                    </Modal.Footer>
                </Modal>
            );
            }
        }
