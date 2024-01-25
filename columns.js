import {format} from 'date-fns'
import { ColumnFilter } from './ColumnFilter'
export const COLUMNS =[
    {
        Header : 'id',
        Footer : 'id',
        accessor : 'id',
        Filter : ColumnFilter,
        disableFilters: true
    },
    {
        Header : 'First Name',
        Footer : 'First Name',
        accessor : 'first_name',
        Filter : ColumnFilter
    },
    {
        Header : 'Last Name',
        Footer : 'Last Name',
        accessor : 'last_name',
        Filter : ColumnFilter
    },
    {
        Header : 'Date Of Birth',
        Footer : 'Date Of Birth',
        accessor : 'date_of_birth',
        Cell : ({value}) => {return format(new Date (value), 'dd/MM/yyyy')},
        Filter : ColumnFilter
    },
    {
        Header : 'Phone',
        Footer : 'Phone',
        accessor : 'phone',
        Filter : ColumnFilter
    },
    {
        Header : 'Country',
        Footer : 'Country',
        accessor : 'country',
        Filter : ColumnFilter
    }
] 

export const GROUPED_COLUMNS = [  
    {
        Header : 'id',
        Footer : 'id',
        accessor : 'id'
    },
    {
        Header : 'Name',
        Footer : 'Name',
        columns: [
            {
                Header : 'First Name',
                Footer : 'First Name',
                accessor : 'first_name'
            },
            {
                Header : 'Last Name',
                Footer : 'Last Name',
                accessor : 'last_name'
            }
        ]
    },
    {
        Header : 'Info',
        Footer : 'Info',
        columns : [
            {
                Header : 'Date Of Birth',
                Footer : 'Date Of Birth',
                accessor : 'date_of_birth'
            },
            {
                Header : 'Phone',
                Footer : 'Phone',
                accessor : 'phone'
            },
            {
                Header : 'Country',
                Footer : 'Country',
                accessor : 'country'
            }
        ]
    }
]