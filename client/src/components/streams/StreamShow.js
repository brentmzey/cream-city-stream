import React, { useEffect, useRef } from "react";
import flv from "flv.js";
import { connect } from "react-redux";
import { fetchStream } from "../../actions";

const StreamShow = ({ match, stream, fetchStream }) => {
  const videoRef = useRef();
  // const [player, setPlayer] = useState(null);

  useEffect(() => {
    // first always attempt to fetch the corresponding stream for this page
    fetchStream(match.params.id);
    // console.log("stream id changed and first useEffect ran");;
  }, [match.params.id, fetchStream]);

  useEffect(() => {
    // Attempt to properly display video player EVERY TIME the StreamShow component (re)renders (i.e. no dependency array)
    let player = null;
    // Build video player only if video player NOT already instantiated AND the stream is fetched
    if (player || !stream) {
      return;
    }
    // Contacting the RTMP server
    player = flv.createPlayer({
      type: "flv",
      url: `http://localhost:8000/live/${match.params.id}.flv`,
    });
    player.attachMediaElement(videoRef.current);
    player.load();
   
    // Cleanup function to stop our app/FLV from continually trying to reach & download stream when component is unmounted from the screen
    return () => {
     if(player){
       player.destroy()
     }
    };
  });

  if (!stream) {
    return (
      <div>
        <h3>Loading</h3>
      </div>
    );
  }

  return (
    <div>
      <video ref={videoRef} style={{ width: "100%" }} controls />
      <h1>{stream.title}</h1>
      <h5>{stream.description}</h5>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream })(StreamShow);
