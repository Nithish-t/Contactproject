import React, { useEffect, useState } from 'react'
import { Link, useParams ,useNavigate } from 'react-router-dom'
import { ContactService } from '../Services/ContactService';
import { upload } from '@testing-library/user-event/dist/upload';
const EditContact = () => {
    let navigate= useNavigate()
    let { contactId } = useParams();
    let [State, setState] = useState({
        loading: false,
        contact: {
            name: '',
            photo: '',
            mobile: '',
            email: '',
            company: '',
            title: '',
            groupId: ''
        },
        groups: [],
        errormessage: ''
    })
    useEffect(() => {
        setState({
            ...State,
            loading: true
        })
        ContactService.getContact(contactId).then((result) => {
            ContactService.getAllGroups().then((groupresponse)=>{
            setState({
                ...State,
                loading: false,
                contact: result.data,
                groups:groupresponse.data
            })
        })
        }).catch((err) => {
            setState({
                ...State,
                loading: false,
                errormessage: err.message
            })
        });
    }, [contactId])
    let uPdateInput = (event) => {
        setState({
            ...State,
            contact: {
                ...State.contact,
                [event.target.name]: event.target.value
            }
        })
    }
    let submitForm=(event)=>{
      event.preventDefault();
      ContactService.uPdateContact(State.contact,contactId).then((result) => {
        if (result) {
            navigate('/contacts/list',{replace:true})
        }        
      }).catch((err) => {
          setState({
            ...State,
            errormessage:err.message,
          })
          navigate('/contacts/edit/${contactId}',{replace:false})
      });
    }
    let { loading, contact, groups, errormessage } = State
    return (
        <>
            <section className='add-contact p-3'>
                <div className='container'>
                    <div className='row'>
                        <div className='col'>
                            <p className='h4 text-success fw-bold'>Edit Contact</p>
                            <p className='fst-italic'>Nithish adsjhfgasnasfag g fgasjdf asidgagdfyhhfiawgyfudw as fwuyfgdsgfsggfjw fgweefjwfghdasgfywggfjasjfgyuedhjafjasgfasfjadsgfjgsjfjhfgasgfjsdfhgajfsjdgfhsdfhagdjfhsadf s fsgfjhsag fsas fy wefg w egfsdgfiuawe gfigaew fweuffwe f wef weyfwe    egf ua ef a</p>
                        </div>
                    </div>
                    <div className='row align-items-center'>
                        <div className='col-md-4'>
                            <form onSubmit={submitForm}>
                                <div className='mb-2'>
                                    <input
                                        required='true'
                                        name='name'
                                        value={contact.name}
                                        onChange={uPdateInput}
                                        type='text' className='form-control' placeholder='Name' />
                                </div>
                                <div className='mb-2'>
                                    <input
                                        required='true'
                                        name='photo'
                                        value={contact.photo}
                                        onChange={uPdateInput}
                                        type='text' className='form-control' placeholder='Photo URl' />
                                </div>
                                <div className='mb-2'>
                                    <input
                                        required='true'
                                        name='mobile'
                                        value={contact.mobile}
                                        onChange={uPdateInput}
                                        type='Number' className='form-control' placeholder='Mobile' />
                                </div>
                                <div className='mb-2'>
                                    <input
                                        required='true'
                                        name='email'
                                        value={contact.email}
                                        onChange={uPdateInput}
                                        type='email' className='form-control' placeholder='Email' />
                                </div>
                                <div className='mb-2'>
                                    <input
                                        required='true'
                                        name='company'
                                        value={contact.company}
                                        onChange={uPdateInput}
                                        type='text' className='form-control' placeholder='Company' />
                                </div>
                                <div className='mb-2'>
                                    <input
                                        required='true'
                                        name='title'
                                        value={contact.title}
                                        onChange={uPdateInput}
                                        type='text' className='form-control' placeholder='Title' />
                                </div>
                                <div className='mb-2'>
                                    <select
                                        required='true'
                                        name='groupId'
                                        value={contact.groupId}
                                        onChange={uPdateInput}
                                        className='form-control'>
                                        <option value="">Select Group</option>
                                        {
                                            groups.length > 0 && groups.map(group => {
                                                return (
                                                    <option key={group.id} value={group.id}>{group.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className='mb-2'>
                                    <input type='Submit' className='btn btn-primary' value="Update" />
                                    <Link to={'/contacts/list'} className='btn btn-dark ms-2'>Cancel</Link>
                                </div>
                            </form>
                        </div>
                        <div className='col-md-6'>
                            <img src={contact.photo} alt="" className='img-fluid' />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default EditContact
