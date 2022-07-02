  function Video(props) {
    return (
      <>
        <video width="100%" height="720" controls >
                <source src={props.path} />
        </video>
      </>
    );
  }
  
  export default Video;
  