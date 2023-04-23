import FeedbackItem from "./FeedbackItem";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";
import {useContext} from "react"
import Spinner from "./shared/Spinner"
import FeedbackContext from "../context/FeedbackContext"

function FeedbackList() {
  const {feedback,isLoading}=useContext(FeedbackContext);

  if (!isLoading && (!feedback || feedback.length === 0)) {
    return <div>No Feedback Yet</div>;
  } 
  else if(isLoading) return <Spinner/>
  else return (
      <div className="feedback-list">
        <AnimatePresence>
          {feedback.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <FeedbackItem
                key={item.id}
                item={item}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    );
}

FeedbackList.propTypes = {
  feedback: PropTypes.array,
};
export default FeedbackList;
