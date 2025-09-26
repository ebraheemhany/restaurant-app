import React, { useEffect } from 'react'
import { supabase } from '../../../supabaseClient';

export const TrackVisitor = () => {
    // add visitors
    useEffect(() => {
      const addVisitor = async () => {
        const { error } = await supabase
        .from("visitors")
        .insert([ { user_agent: navigator.userAgent }]);
    
        if (error) {
          console.error(error.message)
        }else {
          console.log("user Added")
        }
      };
      addVisitor();
    }, []);
  return (
  <></>
  )
}
