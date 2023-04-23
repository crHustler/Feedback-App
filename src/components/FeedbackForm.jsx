import { useState,useEffect } from "react";
import Card from "./shared/Card"
import Button from "./shared/Button"
import RatingSelect from "./RatingSelect"
import {useContext} from "react";
import FeedbackContext from "../context/FeedbackContext";

function FeedbackForm() {
  const [text,setText]=useState('')
  const [disabled,setDisabled]=useState(true)
  const [message,setMessage]=useState('')
  const [rating,setRating]=useState(10)

  const {addFeedback,feedbackEdit,updateFeedback}=useContext(FeedbackContext);

  const handleSubmit=(e)=>{
    e.preventDefault();
    if(text.trim().length>=10){
      const newFeedback={
        text:text,
        rating:rating,
      }
      if(feedbackEdit.edit===true){
        updateFeedback(feedbackEdit.item.id,newFeedback);
      }
      else addFeedback(newFeedback);
      setText("");
    }
  }

  useEffect(()=>{
    if(feedbackEdit && feedbackEdit.edit === true){
      setDisabled(false);
      setText(feedbackEdit.item.text);
      setRating(feedbackEdit.item.rating);
    }
  },[feedbackEdit])
  const handleTextChange=(e)=>{
    if(text===''){
      setMessage(null);
      setDisabled(true);
    }
    else if(text!=='' && (text.trim()).length<10){
      setMessage("Text must be atleast 10 characters long");
      setDisabled(true);
    }
    else{
      setMessage(null);
      setDisabled(false);
    }
    setText(e.target.value);
  }
  return (
    <Card>
        <form onSubmit={handleSubmit}>
            <h2>How would you rate your service with us?</h2>
            <RatingSelect select={(rating)=>setRating(rating)}/>
            <div className="input-group">
                <input onChange={handleTextChange} type="text" placeholder="Write a review" value={text}/>
                <Button type="submit" version="secondary" isDisabled={disabled}>Send</Button>
            </div>
            {message && <div className="message">{message}</div>}
        </form>
    </Card>
  );
}

export default FeedbackForm;
