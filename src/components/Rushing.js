import React from 'react';
import MaterialTable from 'material-table';

import { forwardRef } from 'react';
 
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
 
const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };
 
export default function Rushing() {
  
  function columns(){
    return(
      [
        {
          title: "Player",
          field: "Player"
        },
        {
          title: "Team",
          field: "Team",
        },
        {
          title: "Pos",
          field: "Pos",
        },
        {
          title: "Att/G",
          field: "Att/G"
        },
        {
          title: "Att",
          field: "Att",
        },
        {
          title: "Yds",
          field: "Yds"
        },
        {
          title: "Avg",
          field: "Avg",
        },
        {
          title: "Yds/G",
          field: "Yds/G",
        },
        {
          title: "TD",
          field: "TD"
        },
        {
          title: "Lng",
          field: "Lng",
        },
        {
          title: "1st",
          field: "1st"
        },
        {
          title: "1st%",
          field: "1st%",
        },
        {
          title: "20+",
          field: "20+"
        },
        {
          title: "40+",
          field: "40+"
        },
        {
          title: "FUM",
          field: "FUM"
        }
      ]
    )
    
  }

  return (
    <MaterialTable
      icons={tableIcons}
      title="Football Rushing"
      columns={columns()}
      options={{
        exportButton: true,
        exportCsv: (columns, data) => {
          const query = window.state; 
          
          let params = new URLSearchParams();
          params.set('offset', (query.page + 1));
          params.set('limit', query.pageSize);
          params.set('search', query.search);
          
          if(query.orderBy){
            params.set('sort_field', query.orderBy.field);
            params.set('sort_direction', query.orderDirection);
          }
          
          let url = 'http://localhost:3001/rushings/download_csv.csv?'+ params.toString();
          
          window.location.href = url;
        }
      }}
      data={query =>
        new Promise((resolve, reject) => {
          window.state = query; 
          let params = new URLSearchParams();
          params.set('offset', (query.page + 1));
          params.set('limit', query.pageSize);
          params.set('search', query.search);
          
          if(query.orderBy){
            params.set('sort_field', query.orderBy.field);
            params.set('sort_direction', query.orderDirection);
          }
          
          let url = 'http://localhost:3001/rushings?'+ params.toString();
          
          fetch(url)
              .then(response => response.json())
              .then(result => {
                resolve({
                  data: result.data,
                  page: result.page - 1,
                  totalCount: result.total,
                })
              })
        
        })
      }
    />
  )
}
