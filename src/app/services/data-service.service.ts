import { DatewiseData } from './../models/datewise-data';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { GlobalDataSummary } from '../models/global-data';



@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  private url = `https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/04-03-2020.csv`;
  //  private url = `https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/07-02-2020.csv`;
  //  private url = `https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/07-10-2020.csv`;

  private datewise_url = `https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv`;

  constructor(private http: HttpClient) { }

  getdatewisedata() {

    return this.http.get(this.datewise_url, { responseType: 'text' }).pipe(

      map((result) => {
        // console.log(result)
        let rows = result.split('\n');
        let maindata = {};
        let header = rows[0];

        let dates = header.split(/,(?=\S)/)

        dates = dates.slice(4)
        rows = rows.splice(1)
        // console.log(dates)
        rows.forEach((row) => {

          let cols = row.split(/,(?!\s)/)
          let country_name = cols[1]
          cols = cols.splice(4)
          // console.log(country_name, cols)
          maindata[country_name] = [];
          cols.forEach((value, index) => {

            let dw: DatewiseData = {

              country: country_name,
              cases: +value,
              date: new Date(Date.parse(dates[index]))
            }
            maindata[country_name].push(dw);


          })




        })
        // rows loop 

        // console.log(maindata)



        return maindata


      })
      // map 

    )
    // pipe 



  }






  getglobaldata() {
    return this.http.get(this.url, { responseType: 'text' }).pipe(

      map((result) => {


        let raw = {};

        let rows = result.split('\n');
      
        rows = rows.slice(1);

        rows.forEach((row) => {
          let col = row.split(/,(?!\s)/);
        
          let cs = {
            country: col[3],
            confirmed: +col[7],
            deaths: +col[8],
            recovered: +col[9],
            active: +col[10]

          };

          let temp: GlobalDataSummary = raw[cs.country];
          if (temp) {
            // temp.active =temp.active+cs.active;
            temp["active"] = temp["active"] + cs["active"];
            temp.recovered = temp.recovered + cs.recovered;
            temp.deaths = temp.deaths + cs.deaths;
            temp.confirmed = temp.confirmed + cs.confirmed;

            raw[cs.country] = temp;

          }
          else {
            raw[cs.country] = cs;
          }


        })

        // console.log(raw)


        return raw
      })




    )
  }



}
