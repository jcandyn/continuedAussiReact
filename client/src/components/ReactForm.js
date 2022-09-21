
import React from 'react'


class ReactFormLabel extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <label htmlFor={this.props.htmlFor}>{this.props.title}</label>
    )
  }
}

class ReactForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      email: '',
      subject: '',
      message: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    $(document).ready(function () {
      $('select').material_select();
    });
  }
  handleChange = (e) => {
    let newState = {}

    newState[e.target.name] = e.target.value

    this.setState(newState)
  }


  handleSubmit = (e, message) => {
    e.preventDefault()

    let formData = {
      formSender: this.state.name,
      formEmail: this.state.email,
      formSubject: this.state.subject,
      formMessage: this.state.message
    }

    if (formData.formSender.length < 1 || formData.formEmail.length < 1 || formData.formSubject.length < 1 || formData.formMessage.length < 1) {
      return false
    }

    $.ajax({
      url: '/some/url',
      dataType: 'json',
      type: 'POST',
      data: formData,
      success: function (data) {
        {
          this.setState({
            firstName: '',
            lastName: '',
            email: '',
            subject: '',
            message: ''
          })
        }
      },
      error: function (xhr, status, err) {
        console.error(status, err.toString())
        alert('There was some problem with sending your message.')
      }
    })

    this.setState({
      firstName: '',
      lastName: '',
      email: '',
      subject: '',
      message: ''
    })
  }

  render() {
    return (
      <div className="container">
        <form className='react-form' onSubmit={this.handleSubmit}>
          <div class="input-field col s12">
            <select>
              <option value="" disabled selected>Choose your option</option>
              <option value="1">Option 1</option>
              <option value="2">Option 2</option>
              <option value="3">Option 3</option>
            </select>
            <label>Materialize Select</label>
          </div>

          <fieldset className='form-group'>
            <ReactFormLabel htmlFor='formName' title='Full Name:' />

            <input id='formName' className='form-input' name='name' type='text' required onChange={this.handleChange} value={this.state.name} />
          </fieldset>

          <fieldset className='form-group'>
            <ReactFormLabel htmlFor='formEmail' title='Email:' />

            <input id='formEmail' className='form-input' name='email' type='email' required onChange={this.handleChange} value={this.state.email} />
          </fieldset>

          <fieldset className='form-group'>
            <ReactFormLabel htmlFor='formSubject' title='Subject:' />

            <input id='formSubject' className='form-input' name='subject' type='text' required onChange={this.handleChange} value={this.state.subject} />
          </fieldset>

          <fieldset className='form-group'>
            <ReactFormLabel htmlFor='formMessage' title='Message:' />

            <textarea id='formMessage' className='form-textarea' name='message' required onChange={this.handleChange}></textarea>
          </fieldset>

          <div className='form-group'>
            <input id='formButton' className='btn' type='submit' placeholder='Send message' />
          </div>
        </form>
      </div>
    )
  }
}

export default ReactForm