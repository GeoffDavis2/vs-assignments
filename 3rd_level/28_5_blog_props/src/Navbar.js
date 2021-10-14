import React from 'react';

const Navbar = ({ menuItems }) => {
    // console.log(menuItems);
    return (
        <React.Fragment>
            {menuItems.map(item => <div key={item.text} className={item.style}>{item.text}</div>)}
        </React.Fragment>
    )
}

export default Navbar;