import { Injectable } from "@angular/core";

const aqi = {
    PM10 : {
        param:'PM10',
        values:[
            {
                type:'Good',
                min:0,
                max:50,
                avg:6.25
            },
            {
                type:'Satisfactory ',
                min:51,
                max:100,
                avg:12.5
            },
            {
                type:'Moderately polluted',
                min:101,
                max:250,
                avg:18.75
            },
            {
                type:'Poor',
                min:251,
                max:350,
                avg:25
            },
            {
                type:'Very poor',
                min:351,
                max:430,
                avg:31.25
            },
            {
                type:'Severe',
                min:430,
                max:4300,
                avg:37.5
            }
        ]
    },
    'PM2.5' : {
        param:'pm2.5',
        values:[
            {
                type:'Good',
                min:0,
                max:30,
                avg:6.25
            },
            {
                type:'Satisfactory ',
                min:31,
                max:60,
                avg:12.5
            },
            {
                type:'Moderately polluted',
                min:61,
                max:90,
                avg:18.75
            },
            {
                type:'Poor',
                min:91,
                max:120,
                avg:25
            },
            {
                type:'Very poor',
                min:121,
                max:250,
                avg:31.25
            },
            {
                type:'Severe',
                min:250,
                max:4300,
                avg:37.5
            }
        ]
    },
    NO2: {
        param:'NO2',
        values:[
            {
                type:'Good',
                min:0,
                max:40,
                avg:6.25
            },
            {
                type:'Satisfactory ',
                min:41,
                max:80,
                avg:12.5
            },
            {
                type:'Moderately polluted',
                min:81,
                max:180,
                avg:18.75
            },
            {
                type:'Poor',
                min:181,
                max:280,
                avg:25
            },
            {
                type:'Very poor',
                min:281,
                max:4000,
                avg:31.25
            },
            {
                type:'Severe',
                min:401,
                max:430,
                avg:37.5
            }
        ]
    },
    OZONE : {
        param:'o3',
        values:[
            {
                type:'Good',
                min:0,
                max:50,
                avg:6.25
            },
            {
                type:'Satisfactory ',
                min:51,
                max:100,
                avg:12.5
            },
            {
                type:'Moderately polluted',
                min:101,
                max:168,
                avg:18.75
            },
            {
                type:'Poor',
                min:169,
                max:208,
                avg:25
            },
            {
                type:'Very poor',
                min:209,
                max:748,
                avg:31.25
            },
            {
                type:'Severe',
                min:749,
                max:4300,
                avg:37.5
            }
        ]
    },
    CO:{
        param:'co',
        values:[
            {
                type:'Good',
                min:0,
                max:1,
                avg:6.25
            },
            {
                type:'Satisfactory ',
                min:1.1,
                max:2.0,
                avg:12.5
            },
            {
                type:'Moderately polluted',
                min:2.1,
                max:10,
                avg:18.75
            },
            {
                type:'Poor',
                min:10,
                max:17,
                avg:25
            },
            {
                type:'Very poor',
                min:18,
                max:34,
                avg:31.25
            },
            {
                type:'Severe',
                min:35,
                max:4300,
                avg:37.5
            }
        ]
    },
    SO2:{
        param:'so2',
        values:[
            {
                type:'Good',
                min:0,
                max:40,
                avg:6.25
            },
            {
                type:'Satisfactory ',
                min:41,
                max:80,
                avg:12.5
            },
            {
                type:'Moderately polluted',
                min:81,
                max:380,
                avg:18.75
            },
            {
                type:'Poor',
                min:381,
                max:800,
                avg:25
            },
            {
                type:'Very poor',
                min:801,
                max:1600,
                avg:31.25
            },
            {
                type:'Severe',
                min:1601,
                max:4300,
                avg:37.5
            }
        ]
    },
    NH3 : {
        param:'NH3',
        values:[
            {
                type:'Good',
                min:0,
                max:200,
                avg:6.25
            },
            {
                type:'Satisfactory ',
                min:201,
                max:400,
                avg:12.5
            },
            {
                type:'Moderately polluted',
                min:401,
                max:800,
                avg:18.75
            },
            {
                type:'Poor',
                min:801,
                max:1200,
                avg:25
            },
            {
                type:'Very poor',
                min:1201,
                max:1800,
                avg:31.25
            },
            {
                type:'Severe',
                min:1801,
                max:4300,
                avg:37.5
            }
        ]

    },
    PB:{
        param:'Pb',
        values:[
            {
                type:'Good',
                min:0,
                max:0.5,
                avg:6.25
            },
            {
                type:'Satisfactory',
                min:0.5,
                max:1.0,
                avg:12.5
            },
            {
                type:'Moderately polluted',
                min:1.1,
                max:2.0,
                avg:18.75
            },
            {
                type:'Poor',
                min:2.1,
                max:3.0,
                avg:25
            },
            {
                type:'Very poor',
                min:3.1,
                max:3.5,
                avg:31.25
            },
            {
                type:'Severe',
                min:3.6,
                max:4300.0,
                avg:37.5
            }
        ]
    }
}

const avgAqi = {
    Good:50,
    Satisfactory:100,
    'Moderately polluted':150,
    Poor:200,
    'Very poor':250,
    Severe:300
}

@Injectable({providedIn:'root'})
export class AQI{

    GetAqiStatus(params:{[key: string]:number}[]){          
        let res:string = '';
        params.forEach(p=>{
            if(Object.keys(aqi).indexOf(Object.keys(p)[0]) !== -1)
            {
                let vArray = aqi[Object.keys(p)[0]].values;
                vArray.forEach(v=>{
                    if(p[Object.keys(p)[0]] >= v.min && p[Object.keys(p)[0]] <= v.max){
                        res = v.type;
                    }
                })
            }
        })
        return res;
    }

    GetAvgAqi(params:{[key: string]:number}[]){
        let res:number = 0;
        params.forEach(p=>{
            if(Object.keys(aqi).indexOf(Object.keys(p)[0]) !== -1)
            {
                let vArray = aqi[Object.keys(p)[0]].values;
                vArray.forEach(v=>{
                    if(p[Object.keys(p)[0]] >= v.min && p[Object.keys(p)[0]] <= v.max){
                        res = res + v.avg;
                    }
                })
            }
        })
        if(res >= 0 && res <= 50){
            return {Result:res,Class:'Good'}
        }
        else if(res >= 51 && res <= 100){
            return {Result:res,Class:'Satisfactory'}
        }
        else if(res >= 101 && res <= 150){
            return {Result:res,Class:'Moderately_polluted'}
        }
        else if(res >= 151 && res <= 200){
            return {Result:res,Class:'Poor'}
        }
        else if(res >= 201 && res <= 250){
            return {Result:res,Class:'Very_poor'}
        }
        else{
            return {Result:res,Class:'Severe'}
        }       
    }


}
