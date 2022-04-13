import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import {FaRetweet} from "react-icons/fa";
import MaterialTable from 'material-table';


const useStyles = (theme) => ({
    root: {
        //width: '100%',
        },
      container: {
        maxHeight: 400,
       
      },
  });
  
  function createData(title, url, likes, date) {
    return { title, url, likes, date };
  }

  

  function getData(id){
    const icons_obj1 ={
        id : 1,
        news_name: 'BBC News',
        percentage: 50
    }

    const icons_obj2 ={
        id : 2,
        news_name: 'CNN',
        percentage: 20
    }

    const icons_obj3 ={
        id : 3,
        news_name: 'Euro News',
        percentage: 10
    }

    const icons_obj4 ={
        id : 4,
        news_name: 'abc News',
        percentage: 9
    }

    const icons_obj5 ={
        id : 5,
        news_name: 'The Post',
        percentage: 7
    }

    const icons_obj6 ={
        id : 6,
        news_name: 'N.Y. Times',
        percentage: 5
    }

    const info_icons = [icons_obj1, icons_obj2, icons_obj3, icons_obj4, icons_obj5, icons_obj6];

    const rows1 = [
        createData('UK vaccine effectiveness...', 'https://www.google.com', 50, "24.02.21"),
        createData('Police in New York creates...', 'https://www.google.com', 35, "12.03.21"),
        createData('US city lost in caos because...', 'https://www.google.com', 24, "24.09.21"),
        createData('Taliban forces take capital...', 'https://www.google.com', 67, "06.04.21"),
        createData('COVID vaccine requirement...', 'https://www.google.com', 49, "10.12.21"),
        createData('Earthquake strikes city...', 'https://www.google.com', 24, "29.10.21"),
        createData('Justice department helps...', 'https://www.google.com', 37, "18.10.21"),
        createData('Flight carrying 15900 tons of...', 'https://www.google.com', 24, "24.12.21"),
        createData('Tropical storm hits bay in...', 'https://www.google.com', 67, "11.08.21"),
        createData('Poweful earthquake hits...', 'https://www.google.com', 49, "12.02.21"),
        createData('Earthquake strikes city...', 'https://www.google.com', 24, "29.10.21"),
        createData('Justice department helps...', 'https://www.google.com', 37, "18.10.21"),
        createData('Flight carrying 15900 tons of...', 'https://www.google.com', 24, "24.12.21"),
        createData('Tropical storm hits bay in...', 'https://www.google.com', 67, "11.08.21"),
        createData('Poweful earthquake hits...', 'https://www.google.com', 49, "12.02.21"),
      ];

    const rows2 = [
        createData('COVID vaccine requirement...', 'https://www.facebook.com', 51, "24.02.21"),
        createData('Tropical storm hits bay in...', 'https://www.facebook.com', 35, "12.03.21"),
        createData('Poweful earthquake hits...', 'https://www.facebook.com', 24, "24.09.21"),
        createData('Flight carrying 15900 tons of...', 'https://www.facebook.com', 67, "06.04.21"),
        createData('Justice department helps...', 'https://www.facebook.com', 49, "10.12.21"),
        createData('Earthquake strikes city...', 'https://www.facebook.com', 24, "29.10.21"),
        createData('Taliban forces take capital...', 'https://www.facebook.com', 37, "18.10.21"),
        createData('US city lost in caos because...', 'https://www.facebook.com', 24, "11.08.21"),
        createData('Police in New York creates...', 'https://www.facebook.com', 67, "06.04.21"),
        createData('UK vaccine effectiveness...', 'https://www.facebook.com', 49, "18.10.21"),
      ];

    const rows3 = [
        createData('Flight carrying 15900 tons of...', 'https://www.twitter.com', 60, "18.10.21"),
        createData('COVID vaccine requirement...', 'https://www.twitter.com', 35, "06.04.21"),
        createData('Poweful earthquake hits...', 'https://www.twitter.com', 24, "11.08.21"),
        createData('Justice department helps...', 'https://www.twitter.com', 67, "18.10.21"),
        createData('Taliban forces take capital...', 'https://www.twitter.com', 49, "29.10.21"),
        createData('UK vaccine effectiveness...', 'https://www.twitter.com', 24, "10.12.21"),
        createData('Earthquake strikes city...', 'https://www.twitter.com', 37, "06.04.21"),
        createData('Tropical storm hits bay in...', 'https://www.twitter.com', 24, "24.09.21"),
        createData('US city lost in caos because...', 'https://www.twitter.com', 67, "12.03.21"),
        createData('Police in New York creates...', 'https://www.twitter.com', 49, "24.02.21"),
      ];

      const rows4 = [
        createData('Police in New York creates...', 'https://www.instagram.com', 76, "18.10.21"),
        createData('US city lost in caos because...', 'https://www.instagram.com', 35, "11.08.21"),
        createData('COVID vaccine requirement...', 'https://www.instagram.com', 24, "06.04.21"),
        createData('Justice department helps...', 'https://www.instagram.com', 67, "29.10.21"),
        createData('Flight carrying 15900 tons of..', 'https://www.instagram.com', 49, "18.10.21"),
        createData('US city lost in caos because...', 'https://www.instagram.com', 24, "10.12.21"),
        createData('Taliban forces take capital...', 'https://www.instagram.com', 37, "24.09.21"),
        createData('Tropical storm hits bay in...', 'https://www.instagram.com', 24, "06.04.21"),
      ];

      const rows5 = [
        createData('COVID vaccine requirement...', 'https://www.pinterest.com', 55, "24.02.21"),
        createData('US city lost in caos because...', 'https://www.pinterest.com', 35, "12.03.21"),
        createData('Taliban forces take capital...', 'https://www.pinterest.com', 24, "06.04.21"),
        createData('UK vaccine effectiveness...', 'https://www.pinterest.com', 67, "24.09.21"),
        createData('Earthquake strikes city...', 'https://www.pinterest.com', 49, "10.12.21"),
        createData('Justice department helps...', 'https://www.pinterest.com', 24, "18.10.21"),
 
      ];

      const rows6 = [
        createData('Justice department helps...', 'https://www.youtube.com', 53, "18.10.21"),
        createData('COVID vaccine requirement...', 'https://www.youtube.com', 35, "11.08.21"),
        createData('Poweful earthquake hits...', 'https://www.youtube.com', 24, "06.04.21"),
        createData('Police in New York creates...', 'https://www.youtube.com', 67, "29.10.21"),
        createData('Taliban forces take capital...', 'https://www.youtube.com', 49, "18.10.21"),

      ];
      
      let info=null;

      switch(id){
          case 1:
               info={
                  id: 1,
                  news_name: 'BBC News',
                  links: rows1,
                  percentage: icons_obj1.percentage
              }
              return info;
          case 2:
                info={
                    id: 2,
                    news_name: 'CNN',
                    links: rows2,
                    percentage: icons_obj2.percentage
                }
                return info;
          case 3:
                info={
                    id: 3,
                    news_name: 'Euro News',
                    links: rows3,
                    percentage: icons_obj3.percentage
                }
                return info;
          case 4: 
                info={
                    id: 4,
                    news_name: 'abc News',
                    links: rows4,
                    percentage: icons_obj4.percentage
                }
                return info;
          case 5:
                info={
                    id: 5,
                    news_name: 'The Washington Post',
                    links: rows5,
                    percentage: icons_obj5.percentage
                }
                return info;
          case 6:
                info={
                    id: 6,
                    news_name: 'New York Times',
                    links: rows6,
                    percentage: icons_obj6.percentage
                }
                return info;

      }

  }
  

class NewsTable extends React.Component {
    constructor(props){
        super(props);
        
    }

    render(){
        const { classes } = this.props;
        const info = getData(this.props.id_news);
        console.log('aqui desde news table');
        console.log(this.props);
        console.log(info);
        const colors =["#CB2424", "#8B0B0B", "#038CED", "#3ABEC7", "#ACACAC", "#3B8820"];

                

    return (
        
        <div>
           
            {
                
            <TableContainer  className={classes.container}>
                <Paper>
                <Table className={classes.root} stickyHeader aria-label="sticky table" >
                    <TableHead>
                        <TableRow>
                            <TableCell align="left" colSpan={4}>
                            <i class="fas fa-circle" style={{color:colors[info.id-1]}}></i>&nbsp; 
                                {info.id}. {info.news_name} - {info.percentage} %
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {info.links.map((row, index) => (
                        <TableRow key={index}>
                            <TableCell component="Link" scope="row">
                                <span style={{color: "Dodgerblue"}}>
                                    <i class="fab fa-twitter"></i>&nbsp; 

                                </span>
                               
                                <Link href={row.url}>
                                    {row.title}
                                </Link>
                                
                            </TableCell>
                            <TableCell align="right">
                                <i class="far fa-heart"></i>&nbsp; 
                                
                                {row.likes}
                            </TableCell>
                            <TableCell align="right">
                                <FaRetweet/> &nbsp; 
                                {row.likes-10}
                            </TableCell>
                            <TableCell align="right">{row.date}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </Paper>
            </TableContainer>
                     }
            {

            /*
            <MaterialTable
                title={
                    info.id+". "+ info.news_name+ " - " +info.percentage + "%"}

                columns={[
                    { title: 'Name', field: 'name' },
                    { title: 'Surname', field: 'surname' },
                    { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
                    {
                    title: 'Birth Place',
                    field: 'birthCity',
                    lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
                    },
                ]}
                data={[
                    { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
                    { name: 'Zerya Betül', surname: 'Baran', birthYear: 2017, birthCity: 34 },
                ]}        
                options={{
                    sorting: true,
                    filtering:false,
                    paging: false
                }}
                />
            
            */}
            
        </div>
    )

    }
    
}

export default withStyles(useStyles) (NewsTable);
