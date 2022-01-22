import { TableHead, TableRow, TableCell, Typography } from '@mui/material';
import React from 'react';

// const MptTableHeadComplex = ({ headerGroups, sxValues }) => {
//     return (
//         <TableHead>
//             {headerGroups.map((headerGroup, j) => (
//                 <React.Fragment key={"Fragment"}>
//                     <TableRow {...headerGroup.getHeaderGroupProps()}>
//                         {headerGroup.headers.map((column, i) => (

//                             <TableCell {...column.getHeaderProps()}
//                                 key={i + 5}
//                                 align="center"
//                                 sx={{ ...sxValues, borderBottom: 'solid 0px' }}
//                             >
//                                 {column.render('Header')}
//                                 {/* <div>{column.canFilter ? column.render('Filter') : null}</div> */}
//                             </TableCell>
//                         ))}
//                     </TableRow>
//                     <TableRow {...headerGroup.getHeaderGroupProps()} key={"str" + j + 15}
//                         sx={{ height: '0px', padding: 0, margin: 0 }}>
//                         {headerGroup.headers.map((column, i) => (

//                             <TableCell {...column.getHeaderProps()}
//                                 key={"type" + i + 29}
//                                 align="center"
//                                 sx={{ ...sxValues, height: '0px' }}
//                             >
//                                 <div>{column.canFilter ? column.render('Filter') : null}</div>
//                             </TableCell>
//                         ))}
//                     </TableRow>

//                 </React.Fragment>
//             ))}
//         </TableHead>
//     )
// }


const MptTableHeadComplex = ({ headerGroups, sxValues }) => {
    return (
        <TableHead>
            {headerGroups.map(headerGroup => (
                <TableRow {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (

                        <TableCell {...column.getHeaderProps()}

                            align="center"
                            sx={{ ...sxValues }}
                        >
                            {column.render('Header')}

                            <Typography component="div" sx={{ pt: '10px' }}>{column.canFilter ? column.render('Filter') : "\xA0"}</Typography>
                        </TableCell>
                    ))}
                </TableRow>

            ))}
        </TableHead>
    )
}

export default MptTableHeadComplex;
