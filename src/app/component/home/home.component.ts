import { GlobalDataSummary } from './../../models/global-data';
import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../../services/data-service.service';
import { GoogleChartInterface } from 'ng2-google-charts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  data: GlobalDataSummary[] = [];
  tot_confirmed = 0;
  tot_active = 0;
  tot_recovered = 0;
  tot_deaths = 0;
  loading=true;

  pieChart: GoogleChartInterface = {
    chartType: 'PieChart'
  }
  columnChart: GoogleChartInterface = {
    chartType: 'ColumnChart'
  }



  constructor(private dataservice: DataServiceService) { }

  initChart(case_type: string) {

    let datatable2 = []
    datatable2.push(['country', case_type])

    console.log(case_type)


    this.data.forEach((ele) => {

      let value: Number;

      if (case_type == 'c') {

        if (ele.confirmed > 5000) {
          value = ele.confirmed;
        }

      }

      if (case_type == 'r') {

        if (ele.recovered > 2000) {
          value = ele.recovered;
        }

      }

      if (case_type == 'd') {

        if (ele.deaths > 2000) {
          value = ele.deaths;
        }

      }

      if (case_type == 'a') {

        if (ele.active > 1000) {
          value = ele.active;
        }

      }
      console.log(case_type)


      datatable2.push([ele.country, value])

    })
    // end of For each loop 

    // console.log(datatable2)

    this.columnChart = {
      chartType: 'ColumnChart',
      dataTable: datatable2,
      //firstRowIsData: true,
      options: {
        height: 500
      },
    }

    this.pieChart = {
      chartType: 'PieChart',
      dataTable: datatable2,
      //firstRowIsData: true,
      options: {
        height: 500
      },
    };
    console.log(this.columnChart.dataTable)



  }
  // initchart close 


  updatechart(type) {

    console.log(type)
    // console.log("in updatechart function  ")
    let k = type.value
    console.log('value of k is ' + k)
    this.initChart(k);

  }
  // updatechart close 




  ngOnInit(): void {

    this.dataservice.getglobaldata()
      .subscribe(
        {
          next: (result) => {

            for (let country in result) {

              this.data.push(result[country])

            }

            this.data.forEach((cases) => {

              if (!isNaN(cases.confirmed)) {
                this.tot_confirmed += cases['confirmed'];
                this.tot_active += cases.active;
                this.tot_recovered += cases.recovered;
                this.tot_deaths += cases.deaths;
              }
            })

            //  console.log(result)
            console.log(this.data)
            this.initChart('c');
            // this.initChart('d');
            this.loading=false;




          },

          complete: () => (console.log("complete")),
          error: () => (console.log("error caught while fetching data"))
        }

      )
  }
  // ngonit close




}





// for( let country in result)
// {
//   // console.log(country)
//   console.log(result[country])
//   this.data.add(result[country])
//   i=i+1~

// }
// console.log(this.data[0])
