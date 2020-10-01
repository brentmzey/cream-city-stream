import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Modal from "../Modal";
import history from "../../history";
import { fetchStream, deleteStream } from "../../actions";

const StreamDelete = ({ match, stream, fetchStream, deleteStream }) => {
  useEffect(() => {
    fetchStream(match.params.id);
  }, [match.params.id, fetchStream]);

  const renderActions = () => {
    return (
      // <span>
      <React.Fragment>
        <button onClick={() => deleteStream(match.params.id)} className="ui medium red button">
          Delete
        </button>
        <Link to="/" className="ui medium button">
          Cancel
        </Link>
      </React.Fragment>
      // </span>
    );
  };

  const renderContent = () => {
    if (!stream) {
      return "Are you sure you want to delete this stream?";
    }
    return `Are you sure you want to delete the stream with the title: "${stream.title}"?`;
  };

  return (
    <Modal
      header="Delete Stream"
      content={renderContent()}
      actions={renderActions()}
      onDismiss={() => history.push("/")}
    />
  );
};

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream, deleteStream })(StreamDelete);
