import React from 'react'

export default function Cell({ item, handleCellClick, rowindex, columnindex }) {

    const handleClick = () => {
        handleCellClick(rowindex, columnindex)
    }

    return (
        <div className='cell-item' onClick={handleClick}>
            {item}
        </div>
    )
}
