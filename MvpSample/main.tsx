import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import IMvpRecord from './IMvpRecord';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { LineChart, lineElementClasses } from '@mui/x-charts/LineChart';


interface IProperties {
    elements: Array<IMvpRecord>;
}

const getRandomNumber = (min: number, max: number): number => {
    return Math.random() * (max - min) + min;
};

const App = (props: IProperties) => {
    const elements =
        props.elements != undefined &&
        props.elements.map((element) => {

            const uData = [getRandomNumber(1,4) * 1000, getRandomNumber(4, 10) * 1000, 2000, 2780, getRandomNumber(1, 4) * 1000];
            const pData = [getRandomNumber(2,5) * 1000, getRandomNumber(4, 10) * 1000, 9800, 3908, getRandomNumber(2, 4) * 1000];
            const amtData = [getRandomNumber(1,3) * 1000, getRandomNumber(4, 10) * 1000, 0, 2000, getRandomNumber(1, 7) * 1000];
            const xLabels = [
              'Julio',
              'Agosto',
              'Septiembre',
              'Octubre',
              'Diciembre'
            ]
            

            return (
                <Card sx={{ maxWidth: 500 }}>
                    <CardHeader
                        avatar={
                            <Avatar alt={element.bit_fullname}
                              src={element.bit_photourl} sx={{ width: 180, height: 180}}>
                            </Avatar>
                        }
                        action={
                            <IconButton aria-label="settings">
                                <MoreVertIcon />
                            </IconButton>
                        }
                        titleTypographyProps={{fontSize: 22}}
                        subheaderTypographyProps={{fontSize: 14}}
                        title={element.bit_fullname}
                        subheader={element.bit_position}
                    />
                    <CardContent>
                        <LineChart
                            width={500}
                            height={300}
                            series={[
                                { data: uData, label: 'pre', area: true, stack: 'total', showMark: false },
                                { data: pData, label: 'vir', area: true, stack: 'total', showMark: false },
                                {
                                    data: amtData,
                                    label: 'sum',
                                    area: true,
                                    stack: 'total',
                                    showMark: false,
                                },
                            ]}
                            xAxis={[{ scaleType: 'point', data: xLabels }]}
                            sx={{
                                [`& .${lineElementClasses.root}`]: {
                                    display: 'none',
                                },
                            }}
                        />
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            Se muestran los resultados de sesiones realizadas mediante Sessionize.com
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Compartir</Button>
                        <Button size="small">Ir a Sessionize.com</Button>
                    </CardActions>
                </Card>
            );
        });

    return (
        <div
            className="ms-Grid"
            dir="ltr"
            style={{
                padding: "10px",
                border: "2px solid #F4F6F6",
                width: "100%",
            }}
        >
            {elements}
        </div>
    );
};


export default App;


