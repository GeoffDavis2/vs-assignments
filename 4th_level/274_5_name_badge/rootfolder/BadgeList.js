import React from 'react';

export const BadgeList = (props) => <>
    {props.badgeList.map((badge, i) =>
        <div className='badge' key={i}>
            <div className='badge-header' style={{ backgroundColor: i % 2 ? 'Blue' : 'Red' }}>Badge:</div>
            <div className='badge-field'>Name: {badge.firstName} {badge.lastName}</div>
            <div className='badge-field'>Phone: {badge.phone}</div>
            <div className='badge-field'>Place of birth: {badge.birthPlace}</div>
            <div className='badge-field'>Favorite Food: {badge.favFood}</div>
            <div className='badge-field'>Email: {badge.email}</div>
            <div className='badge-desc'>{badge.desc}</div>
        </div>
    )}
</>