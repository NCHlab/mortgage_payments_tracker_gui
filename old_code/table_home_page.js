<Grid item xs={12} md={6} key="note.id4">
    <Card elevation={12} >
        <CardHeader title="User" />
        <CardContent>
            <TableContainer >
                <Table size="small" aria-label="simple table">
                    <TableHead>
                        <TableRow >
                            <TableCell sx={{ width: '100px' }}>Dessert</TableCell>
                            <TableCell align="left">Calories</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ p: 0, '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell sx={{ width: '100px' }} component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="left">{row.calories}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </CardContent>
    </Card>
</Grid>