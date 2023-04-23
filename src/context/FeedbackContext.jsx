import {createContext,useState,useEffect} from "react";
const FeedbackContext=createContext();

export const FeedbackProvider=({children})=>{
    const [isLoading,setIsLoading]=useState(true)
    const [feedback,setFeedback]=useState([])
    
    useEffect(()=>{
      fetchFeedback();
    },[])

    const fetchFeedback=async()=>{
      const response=await fetch("/feedback/?_sort=id&_order=desc");
      const data=await response.json();
      setIsLoading(false);
      setFeedback(data);
    }

    const [feedbackEdit,setFeedbackEdit]=useState([
      {
        item:{},
        edit:false,
      }
    ])
    
    //Edit feedback
    const updateFeedback= async (id,updatedItem)=>{
       const response=await fetch(`/feedback/${id}`,{
        method:"PUT",
        headers:{
           "Content-Type":"application/json",
        },
        body:JSON.stringify(updatedItem)
       })

       const data=await response.json();

        setFeedback(feedback.map((item)=>{
          return (item.id===id)?{...item,...data}:item;
        }));
    }

    //Delete Feedback
    const deleteFeedback = async(id) => {
        if (window.confirm("Are you sure you want to delete this feedback?")) {
          await fetch(`/feedback/${id}`,{method:"DELETE"});
          setFeedback(
            feedback.filter((item) => {
              return item.id !== id;
            })
          );
        }
    };
  
    //Add a new Feedback
    const addFeedback = async(newFeedback) => {
      const response=await fetch("/feedback",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(newFeedback)
      })

      const data=await response.json();
      setFeedback([data, ...feedback]);
    };
   
    //Edit the feeeback
    const editFeedback=(item)=>{
      setFeedbackEdit({
        item:item,
        edit:true,
      })
    }
    return <FeedbackContext.Provider value={{
        feedback:feedback,
        feedbackEdit:feedbackEdit,
        isLoading:isLoading,
        deleteFeedback:deleteFeedback,
        addFeedback:addFeedback,
        editFeedback:editFeedback,
        updateFeedback:updateFeedback,
    }}>{children}</FeedbackContext.Provider>

}

export default FeedbackContext;