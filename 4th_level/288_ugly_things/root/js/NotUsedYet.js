
  
  const NewThing = BaseThing => {
    // BaseThing "wrapped with"...
    //    add thing button
    //        post to api
    //        getThingsIntoContext
    //        go back to list
  }
  
  const EditThing = BaseThing => {
    console.log('EditThing');
    console.log(BaseThing);
    // BaseThing "wrapped with"...
    //    delete thing button
    //        delete from api
    //        getThingsIntoContext
    //        go back to list
    //    update thing button
    //        push to api
    //        get data from api for thing
    //        re-generate just the applicable object in things array
    //        DON'T go back to list, stay here
    //    next thing button
    //        get array index for current object
    //        get next index number (min of currId+1 and array.length-1)
    //        load editThing using next index number
    //    prev thing button (state or context) for array index number
    //        get array index for current object
    //        get prev index number (max of currId-1 and 0)
    //        load editThing using next index number
  }
  