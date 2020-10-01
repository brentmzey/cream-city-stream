import React from "react";
import { connect } from "react-redux";
import { createStream } from "../../actions";
import StreamForm from "./StreamForm";

const StreamCreate = (props) => {
  const onSubmit = (formValues) => {
    props.createStream(formValues);
    // We'll use this later if onSubmit of form we want to sent the form values somewhere besides
    //    our Redux store, which 'redux-form' is already doing for us
  };

  return (
    <div>
      <h3>Create a stream:</h3>
      <StreamForm onSubmit={onSubmit} />
    </div>
  );
};

export default connect(null, { createStream })(StreamCreate);
