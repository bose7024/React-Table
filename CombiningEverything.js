import React, { useMemo } from 'react'
import { useFilters, useGlobalFilter, usePagination, useRowSelect, useSortBy, useTable } from 'react-table'
import MOCK_DATA from './MOCK_DATA.json'
import { GROUPED_COLUMNS } from './columns'
import './Table.css'
import { GlobalFilter } from './GlobalFilter'
import { ColumnFilter } from './ColumnFilter'
import { Checkbox } from './CheckBox'

export const CombiningEverything = () => {
  const columns = useMemo(() => GROUPED_COLUMNS, [])
  const data = useMemo(() => MOCK_DATA, [])
  const defaultColumn = React.useMemo(
    ()=>({
        Filter: ColumnFilter
    }),[]
  )
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    state,
    setGlobalFilter,
    page,
    previousPage,
    nextPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
    selectedFlatRows,
    prepareRow
  } = useTable({
    columns,
    data,
    defaultColumn
  }, useFilters,useGlobalFilter,useSortBy,usePagination,useRowSelect,
    (hooks) =>{
        hooks.visibleColumns.push((columns)=>{
            return [
                {
                    id:'selection',
                    Header:({getToggleAllRowsSelectedProps})=>(
                        <Checkbox{...getToggleAllRowsSelectedProps()}/>
                    ),
                    Cell:({row}) => (
                        <Checkbox{...row.getToggleRowSelectedProps()}/>
                    )
                },
                ...columns,
            ]
        })
    }
  )
  
  const {globalFilter} = state
  const {pageIndex, pageSize} = state

  return (
    <>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter}/>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>{
                    column.render('Header')}
                    <div>{column.canFilter ? column.render('Filter'): null}</div>
                    <span>
                        {
                            column.isSorted
                            ? column.isSortedDesc
                            ?' 🔽'
                            : ' 🔼'
                            : ''
                        }
                    </span>
                    </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
        <tfoot>
          {footerGroups.map(footerGroup => (
            <tr {...footerGroup.getFooterGroupProps()}>
              {footerGroup.headers.map(column => (
                <td {...column.getFooterProps()}>{column.render('Footer')}</td>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
      <div>
        <span>
            Page { ' '}
            <strong>
                {pageIndex + 1} of {pageOptions.length}
            </strong>
        </span>
        <span>
            Go to Page {' '}
            <input type = 'number' defaultValue={pageIndex+1}
            onChange={e=>{
                const pageNumber = e.target.value ? Number(e.target.value)-1 :0
                gotoPage(pageNumber)
            }}
            />
        </span>
            <select value={pageSize} onChange={e => setPageSize(Number(e.target.value))} >
            {
                [10,15,50].map(pageSize =>(
                    <option key={pageSize} value = {pageSize}>
                        Show {pageSize}
                    </option>
                ))
            }
            </select>
            <button onClick={()=>gotoPage(0)}disabled = {!canPreviousPage}>{'<<'}</button>
            <button onClick={()=>previousPage()}disabled = {!canPreviousPage}>previousPage</button>
            <button onClick={()=>nextPage()}disabled = {!canNextPage}>nextPage</button>
            <button onClick={()=>gotoPage(pageCount-1)}disabled = {!canNextPage}>{'>>'}</button>
        
      </div>
      <pre>
        <code>
          {JSON.stringify(
            {
              selectedFlatRows: selectedFlatRows.map((row) => row.original),
            },
            null,
             2
          )}
        </code>
      </pre>
    </>
  )
}