  function Video(props) {
    return (
      <>
        <video width="100%" height="720" controls >
                <source src={props.path} type="video/mp4" />
        </video>
      </>
    );
  }
  
  export default Video;
  