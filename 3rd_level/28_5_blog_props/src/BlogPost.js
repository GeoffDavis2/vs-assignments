import React from 'react';

const BlogPost = ({blog: {title, subTitle, author, date}}) =>
<div className='blog-post'>
    <h2>{title}</h2>
    <h3>{subTitle}</h3>
    <p>Posted by {author} on {date}</p>
    <hr/>
</div>

export default BlogPost;