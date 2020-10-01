import React from "react";
import { Field, reduxForm } from "redux-form";

const StreamForm = (props) => {
  const onSubmit = (formValues) => {
    props.onSubmit(formValues);
    // We'll use this later if onSubmit of form we want to sent the form values somewhere besides
    //    our Redux store, which 'redux-form' is already doing for us
  };

  return (
    <form className="ui form error" onSubmit={props.handleSubmit(onSubmit)}>
      <Field name="title" label="Enter title" component={renderInput} />
      <Field name="description" label="Enter description" component={renderInput} />
      {/* Field components must be some other component/fnc that MUST return some JSX */}
      <button className="ui button primary">Submit</button>
    </form>
  );
};

const fieldsConfig = {
  // our form field(s) configuration object
  title:{
    type: 'input',
    label: 'Enter title'
  },
  description: {
    type: 'input',
    label: 'Enter description'
  }
}

const renderError = ({ error, touched }) => {
  if (touched && error) {
    return <div className="ui error message">{error}</div>;
  }
  return null;
};

const renderInput = ({ input, label, meta }, ) => {
  console.log(input, label, meta )
  // in this case I destructured out the import parts of the "field"/"state"/"props" of this fnc call that redux-form would automatically make avalaible as properties to each instance of a field we want to render to the screen that calls this function in its "component={renderInput}" property
  const className = `field ${meta.error && meta.touched ? "error" : ""}`;
  return (
    <div className={className}>
      <label htmlFor={label}>{label}</label>
      <input id={label} {...input} />
      {renderError(meta)}
    </div>
  );
};

const validate = (formValues) => {
  // Condensed version of code below
  const errors = {}
  for (const formField in fieldsConfig) {
    if (!formValues[formField]) {
      errors[formField] = `Enter a ${formField}`;
    }
  }  

  return errors;

  // formValues are simply the input values that a user attempts to sumbit from our form -- in our case a stream title and description
  // Now validate inputs and return an errors object that is either empty or contains some properties
  // const errors = {};

  // if (!formValues.title) {
    // only runs if user did not enter a title
    // the name of the property we add to the errors object must match the name of the same property on the <Field name="title"/> tag above for the validate fnc to properly attach any newly thrown errors
    // errors.title = "Please enter a title";
  // }

  // if (!formValues.description) {
    // only runs if user did not enter a description
    // the name of the property we add to the errors object must match the name of the same property on the <Field name="description"/> tag above for the validate fnc to properly attach any newly thrown errors
    // errors.description = "Please enter a description";
  // }

  // If "errors" object is empty, the form is fine to submit
  // If "errors" object contains *any* properties, redux-form assumes the form is invalid -- we can render errors from "meta" object on the field/props object we call form component rendering fncs with
  // return errors;
};

export default reduxForm({
  validate,
  form: "createEditStreamForm",
  fields: Object.keys(fieldsConfig),
})(StreamForm);
