import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ContactService } from '../Services/ContactService';


const ViewContact = () => {
  let { contactId } = useParams();
  let [State, setState] = useState({
    loading: false,
    contact: {},
    errormessage: '',
    group: {}
  })
  useEffect(() => {
    setState({

      ...State,
      loading: true
    })

    ContactService.getContact(contactId).then(response => {
      ContactService.getGroup(response.data).then(groupresponse => {
        setState({
          ...State,
          loading: false,
          contact: response.data,
          group: groupresponse.data
        })
      })
    })
      .catch(error => {
        setState({
          ...State,
          loading: false,
          errormessage: error.message
        })
      })
  }, [contactId])
  let { loading, contact, errormessage, group } = State
  return (
    <>
      <section>
        <div className='view-contact-intro'>
          <div className='container'>
            <div className='row'>
              <div className='col'>
                <p className='h3 text-success fw-bold'>View Contact</p>
                <p className='fst-italic'>Nithish hgasdhgjas sahdjashjdagsd  Sdvahdvasvdjasddgsdvjsdjasvcdjasvdhjds gsafdghasvdghv sghdaghfsdgh</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {
        Object.keys(contact).length > 0 && Object.keys(group).length > 0 &&
        <section>
          <div className='view-contact'>
            <div className='container mt-5'>
              <div className='row align-items-center'>
                <div className='col-md-4'>
                  <img src={contact.photo} alt="" height="200px" width="200px" />
                </div>
                <div className='col-md-8'>
                  <ul className='list-group'>
                    <li className='list-group-item list-group-item-action'>
                      Name: <span className='fw-bold'>{contact.name}</span>
                    </li>
                    <li className='list-group-item list-group-item-action'>
                      Mobile: <span className='fw-bold'>{contact.mobile}</span>
                    </li>
                    <li className='list-group-item list-group-item-action'>
                      Email: <span className='fw-bold'>{contact.email}</span>
                    </li>
                    <li className='list-group-item list-group-item-action'>
                      Company: <span className='fw-bold'>{contact.company}</span>
                    </li>
                    <li className='list-group-item list-group-item-action'>
                      Title: <span className='fw-bold'>{contact.title}</span>
                    </li>
                    <li className='list-group-item list-group-item-action'>
                      Group: <span className='fw-bold'>{group.name}</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className='row mt-2'>
                <div className='col'>
                  <Link to={'/contacts/list'} className='btn btn-warning'>Back</Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      }
    </>
  )
}

export default ViewContact
