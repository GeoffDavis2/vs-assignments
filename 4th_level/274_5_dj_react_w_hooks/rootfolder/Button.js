import React from 'react'

export const Button = (props) => <button onClick={props.buttonClickHandler} className="button">{props.label}</button>