import React, { useMemo } from 'react'
import { usePagination, useTable } from 'react-table'
import MOCK_DATA from './MOCK_DATA.json'
import { COLUMNS } from './columns'
import './Table.css'

export const PaginationTable = () => {
  const columns = useMemo(() => COLUMNS, [])
  const data = useMemo(() => MOCK_DATA, [])

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    previousPage,
    nextPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
    gotoPage,
    pageCount,
    setPageSize,
    prepareRow
  } = useTable({
    columns,
    data
},
usePagination)
    const {pageIndex, pageSize} = state
  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
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
      </table>
      <div>
        <span>
            Page {' '}
            <strong>
                {pageIndex + 1} of {pageOptions.length}
            </strong>
        </span>
        <span>
            Go to Page {' '}
            <input type='number' defaultValue={pageIndex+1}
            onChange = {e=>{
                const pageNumber = e.target.value ? Number(e.target.value)-1 :0
                gotoPage (pageNumber)
            }}/>
        </span>
        <select value={pageSize} onChange={e => setPageSize(Number(e.target.value))}>
          {
            [10,22,50].map(pageSize =>(
                <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                </option>
            ))
          }
        </select>
        <button onClick={()=>gotoPage(0)}disabled = {!canPreviousPage}> {'<<'} </button>
        <button onClick={()=> previousPage()}disabled = {!canPreviousPage}>previousPage</button>
        <button onClick={()=> nextPage()}disabled = {!canNextPage}>nextPage</button> 
        <button onClick={()=>gotoPage(pageCount-1)}disabled = {!canNextPage}> {'>>'} </button>

      </div>
    </>
  )
}