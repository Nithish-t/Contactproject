import React, { useEffect, useState } from 'react'
import { Link , useNavigate } from 'react-router-dom'
import { ContactService } from '../Services/ContactService'

const AddContact = () => {
    let navigate=useNavigate();
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
        groups: '',
        errormessage: ''
    })
    let uPdateContact = (event) => {
        setState({
            ...State,
            contact: {
                ...State.contact,
                [event.target.name]: event.target.value
            }
        })
    }
    useEffect(() => {
        setState({
            ...State,
            loading: true
        })
        ContactService.getAllGroups().then((response) => {
            setState({
                ...State,
                groups: response.data
            })
        }).catch((err) => {

        });
    },[])
    let submitform=(event)=>{
        event.preventDefault();
        ContactService.createContact(State.contact).then((result) => {
            if(result){
                navigate('/contacts/list',{replace:true})
            }
        }).catch((err) => {
            setState({
                ...State,
                errormessage:err.message
            })
            navigate(`/contacts/add`,{replace:false})
        });

        
    }
    let { loading, contact, errormessage, groups } = State
    return (
        <>
            <section className='add-contact p-3'>
                <div className='container'>
                    <div className='row'>
                        <div className='col'>
                            <p className='h4 text-primary fw-bold'>Create Contact</p>
                            <p className='fst-italic'>Nithish adsjhfgasnasfag g fgasjdf asidgagdfyhhfiawgyfudw as fwuyfgdsgfsggfjw fgweefjwfghdasgfywggfjasjfgyuedhjafjasgfasfjadsgfjgsjfjhfgasgfjsdfhgajfsjdgfhsdfhagdjfhsadf s fsgfjhsag fsas fy wefg w egfsdgfiuawe gfigaew fweuffwe f wef weyfwe    egf ua ef a</p>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-4'>
                            <form onSubmit={submitform}>
                                <div className='mb-2'>
                                    <input
                                        required={true}
                                        name='name'
                                        value={contact.name}
                                        onChange={uPdateContact}
                                        type='text' className='form-control' placeholder='name' />
                                </div>
                                <div className='mb-2'>
                                    <input
                                        required={true}
                                        name='photo'
                                        value={contact.photo}
                                        onChange={uPdateContact}
                                        type='text' className='form-control' placeholder='Photo URl' />
                                </div>
                                <div className='mb-2'>
                                    <input
                                        required={true}
                                        name='mobile'
                                        value={contact.mobile}
                                        onChange={uPdateContact}
                                        type='Number' className='form-control' placeholder='Mobile' />
                                </div>
                                <div className='mb-2'>
                                    <input
                                        required={true}
                                        name='email'
                                        value={contact.email}
                                        onChange={uPdateContact}
                                        type='email' className='form-control' placeholder='Email' />
                                </div>
                                <div className='mb-2'>
                                    <input
                                        required={true}
                                        name='company'
                                        value={contact.company}
                                        onChange={uPdateContact}
                                        type='text' className='form-control' placeholder='Company' />
                                </div>
                                <div className='mb-2'>
                                    <input
                                        required={true}
                                        name='title'
                                        value={contact.title}
                                        onChange={uPdateContact}
                                        type='text' className='form-control' placeholder='Title' />
                                </div>
                                <div className='mb-2'>
                                    <select className='form-control'>
                                        <option value="">Select Group</option>
                                        {
                                            groups.length > 0 &&
                                            groups.map(group => (
                                                 <option key={group.id} value={group.id}>{group.name}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className='mb-2'>
                                    <input type='Submit' className='btn btn-success' value="Create" />
                                    <Link to={'/contacts/list'} className='btn btn-dark ms-2'>Cancel</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default AddContact
