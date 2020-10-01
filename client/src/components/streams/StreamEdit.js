import _ from "lodash";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchStream, editStream } from "../../actions";
import StreamForm from "./StreamForm";

const StreamEdit = ({ match, stream, fetchStream, editStream }) => {
  useEffect(() => {
    fetchStream(match.params.id);
    // console.log(props);
  }, [match.params.id, fetchStream]);

  const onSubmit = (changedFormValues) => {
    editStream(match.params.id, changedFormValues);
  };

  // console.log(props);
  if (!stream) {
    return (
      <div>
        <h4>Loading</h4>
      </div>
    );
  }
  return (
    <div>
      <h3>Edit this Stream:</h3>
      <StreamForm onSubmit={onSubmit} initialValues={_.pick(stream, "title", "description")} />
      {/* could also use the pick function from "lodash" as above or regular object creation syntax =>  { title: stream.title, description: stream.description }  */}
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream, editStream })(StreamEdit);
