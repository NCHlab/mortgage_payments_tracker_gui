export const DefaultColumnFilter = ({
    column: { filterValue, preFilteredRows, setFilter },
}) => {
    const count = preFilteredRows.length

    return (
        <input
            className="header_filter_width"
            sx={{ width: '70px' }}
            value={filterValue || ''}
            onChange={e => {
                setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
            }}
            placeholder={`Search ${count} rows`}
        />
    )
}
