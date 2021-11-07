
  
  const BaseThing = () => {
    console.log('BaseThing');
    // states
    //    imgUrl state
    //    title state
    //    descs state (array or object of strings)
    // handleChange
    // image (large size)
    //    from imgUrl state
    // image url
    //    name = imgUrl state
    //    onChange = handleChange(e=>handleChange(e))
    // title
    //    title = imgUrl state
    //    onChange = handleChange(e=>handleChange(e))
    // descriptions
    //    descs = imgUrl state
    //    onChange = handleChange(e=>handleChange(e))
  }
  
  const NewThing = BaseThing => {
    console.log('NewThing');
    console.log(BaseThing);
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
    //    key/id from api
    //        only for developemnt
    //        comment out when not needed
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
  