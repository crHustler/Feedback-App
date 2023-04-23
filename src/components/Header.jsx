import PropTypes from 'prop-types'

function Header({text,bgColor,textColor}) {
  const curStyle={
    color:textColor,
    backgroundColor:bgColor,
  }
    return (
      <header>
          <div className="container header" style={curStyle}>
              <h1>{text}</h1>
          </div>
      </header>
    );
  }

Header.defaultProps={
  text:"Feedback-UI",
  bgColor:"rgba(0,0,0,0,4)",
  textColor:"#ff6a95",
}

Header.propTypes={
  text:PropTypes.string,
}

export default Header;
  