import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchStreams } from "../../actions";

const StreamList = ({ currentUserId, isLoggedIn, streams, fetchStreams }) => {
  useEffect(() => {
    fetchStreams();
  }, [fetchStreams]);

  const renderAdmin = (stream) => {
    if (stream.userId === currentUserId) {
      return (
        <div className="right floated content">
          <Link to={`/streams/edit/${stream.id}`} className="ui mini yellow button">
            Edit
          </Link>
          <Link to={`/streams/delete/${stream.id}`} className="ui mini orange button">
            Delete
          </Link>
        </div>
      );
    }
  };

  const renderList = () => {
    return streams.map((stream) => {
      return (
        <div className="item" key={stream.id}>
          {renderAdmin(stream)}
          <i className="large middle aligned icon camera" />
          <div className="content">
            <Link to={`/streams/${stream.id}`} className="header">
              {stream.title}
            </Link>
            <div className="description">{stream.description}</div>
          </div>
        </div>
      );
    });
  };

  const renderCreate = () => {
    if (isLoggedIn) {
      return (
        <div>
          <Link to="/streams/new" className="ui right floated button primary">
            Create a stream
          </Link>
        </div>
      );
    }
  };

  return (
    <div>
      <h2>Streams</h2>
      <div className="ui celled list">{renderList()}</div>
      {renderCreate()}
    </div>
  );
};

const mapStateToProps = ({ auth: { userId, isLoggedIn }, streams }) => {
  return { currentUserId: userId, isLoggedIn, streams: Object.values(streams) };
};

export default connect(mapStateToProps, { fetchStreams })(StreamList);
