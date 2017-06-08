import React, { Component } from 'react';
import { Form, Grid, Button } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import classnames from 'classnames';

class ContactForm extends Component {

  componentWillReceiveProps = (nextProps) => { // Receive Contact data Asynchronously
    const { contact } = nextProps;
    if(contact._id !== this.props.contact._id) { // Initialize form only once
      this.props.initialize(contact)
    }
  }  

  renderField = ({ input, label, type, meta: { touched, error } }) => (
    <Form.Field className={classnames({error:touched && error})}>
      <label>{label}</label>
      <input {...input} placeholder={label} type={type}/>
      {touched && error && <span className="error">{error.message}</span>}
    </Form.Field>
  )

  render() {
    const { handleSubmit, pristine, submitting, loading } = this.props;

    return (      
      <Grid centered columns={2}>
        <Grid.Column>
          <h1 style={{marginTop:"1em"}}>{this.props.contact._id ? 'Kontakt editieren' : 'Kontakt hinzufügen'}</h1>
          <Form onSubmit={handleSubmit} loading={loading}>
            <Form.Group widths='equal'>
              <Field name="name.first" type="text" component={this.renderField} label="Vorname"/>
              <Field name="name.last" type="text" component={this.renderField} label="Nachname"/>
            </Form.Group>
            <Field name="phone" type="text" component={this.renderField} label="Telefon"/>
            <Field name="email" type="text" component={this.renderField} label="E-Mail"/>
            <Button primary type='submit' disabled={pristine || submitting}>Save</Button>
          </Form>
        </Grid.Column>
      </Grid>
    )
  }
}

const validate = (values) => {
  const errors = {name:{}};
  if(!values.name || !values.name.first) {
    errors.name.first = {
      message: 'Bitte einen Vornamen eingeben'
    }
  }
  if(!values.phone) {
    errors.phone = {
      message: 'Bitte ihre Telefonnummer eintragen'
    }
  } else if(!/^\+(?:[0-9] ?){6,14}[0-9]$/.test(values.phone)) {
    errors.phone = {
      message: 'Telefonnummer muss im internationalen Format angegeben werden'
    }
  }
  if(!values.email) {
    errors.email = {
      message: 'Bitte E-Mail Adresse eingeben'
    }
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = {
      message: 'Ungültige E-Mail Adresse'
    }
  }
  return errors;
}


export default reduxForm({form: 'contact', validate})(ContactForm);