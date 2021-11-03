export const Person = (props) => <div
    className={props.person.takenCareOf ? 'person case-closed' : 'person'}
    onClick={() => props.handleClick(props.person.id)}
>
    <img src={props.person.image} alt='' className='person-image' />
    <h3 className='name'>{props.person.name}</h3>
</div>