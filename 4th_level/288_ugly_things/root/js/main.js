import React from 'react';
import ReactDOM from 'react-dom';
import '../css/style.css';

// context
//    Things Array
//    Theme?
//    User?
//    BaseApiUrl?

const getThingsIntoContext = () => {
  console.log('getThingsIntoContext');
  // api call to get all things and load into array of objects
  // mutate all objects in array add other fields
}

const SmallThing = (id) => {
  console.log('SmallThing ' + id);
  // Smaller (uniform) size image
  // title
  // descriptions (may be more than one)
  // delete button
  //    get api key
  //    delete call to api
  //    getThingsIntoContext
  //    go back to list
  // click on small thing to render (just one) EditThing
  //    use array index number (somehow)
}

const ThingList = () => {
  console.log('ThingList');

  SmallThing()
  // add new thing button at top
  //    post thing to api
  //    getThingsIntoContext
  //    go back to list
  // array.map through things and for each thing render SmallThing
  // click on small thing to render (just one) EditThing
}

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

getThingsIntoContext();

ThingList();

NewThing(BaseThing());

EditThing(BaseThing());

ReactDOM.render(
  <>Hello World!!!</>,
  document.getElementById('root-div')
);