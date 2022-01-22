import React from 'react';

export const SelectColumnFilter = ({
    column: { filterValue, setFilter, preFilteredRows, id },
}) => {
    // Calculate the options for filtering
    // using the preFilteredRows
    const options = React.useMemo(() => {
        const options = new Set()
        preFilteredRows.forEach(row => {
            options.add(row.values[id])
        })
        return [...options.values()]
    }, [id, preFilteredRows])

    // Render a multi-select box
    return (
        <select
            value={filterValue}
            onChange={e => {
                setFilter(e.target.value || undefined)
            }}
        >
            <option value="">All</option>
            <option value={true}>True</option>
            <option value={false}>False</option>

        </select>
    )
}
