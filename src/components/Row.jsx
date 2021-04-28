import React from 'react'
import Cell from './Cell'

export default function Row({ row, rowIndex, handlecellclick }) {

    const cells = row.map((cellValue, i) => (
        <Cell
            item={cellValue}
            key={i}
            rowindex={rowIndex}
            columnindex={i}
            handleCellClick={handlecellclick}
        />
    ))

    return (
        <div className='row-item' >
            {cells}
        </div>
    )
}
