import { DatewiseData } from './../../models/datewise-data';
import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../../services/data-service.service';
import { GoogleChartInterface } from 'ng2-google-charts';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {

  country_array: string[] = [];
  result_object = {};
  selected_country: string;

  loading=true;

  tot_confirmed: number;
  tot_active: number;
  tot_recovered: number;
  tot_deaths: number;
  datewisedata;
  selected_country_datewise: DatewiseData[];
  datatable:any[] = [];

  lineChart: GoogleChartInterface = {
    chartType: 'LineChart'
  }
  columnChart: GoogleChartInterface = {
    chartType: 'ColumnChart'
  }

  constructor(private dataservice: DataServiceService) { }

  ngOnInit(): void {

    this.dataservice.getdatewisedata().subscribe({

      next: (result) => {

        this.datewisedata = result;
        console.log('entered graph')
        this.updatelinechart('China');

      },

      error: () => (console.log("error in fetching countrywise data in country component")),
      complete: () => {console.log("succefully in fetching country wise data in country component")
                
                  this.loading=false;}

    })
    // subscribe close of datewise 



    this.dataservice.getglobaldata().subscribe({

      next: (result) => {

        this.country_array = Object.keys(result)
        // console.log(this.country_array)
        this.result_object = result;
        // console.log(this.result_object)
        console.log('entered non graph')


      },

      error: () => (console.log("error in fetching data in country component")),
      complete: () => {console.log("succefully in fetching data in country component")
    
    this.loading=false;
  }

    })

  }

  update_country(country: string) {
    console.log("name of country is  ", country)
    this.selected_country = country;
    let selected_country_details = this.result_object[country];

    this.tot_confirmed = selected_country_details.confirmed;
    this.tot_active = selected_country_details.active;
    this.tot_recovered = selected_country_details.recovered;
    this.tot_deaths = selected_country_details.deaths;
    // console.log(this.tot_active);

    this.selected_country_datewise = this.datewisedata[country];
    console.log("carray of country date wise    ", this.selected_country_datewise)
    console.log(typeof (this.selected_country_datewise))

    this.updatelinechart(country);


  }

  updatelinechart(country) {
    console.log("country name is in udateline chart   ", country)
    // console.log("ashish raj", this.selected_country_datewise)
    let quest = this.datewisedata[country]

    console.log("datatype of queest is" + typeof (quest))

    //  this.datatable = [];
    this.datatable.push(['Cases', 'Dates'])

    quest.forEach((ele) => {

      this.datatable.push([ele.cases, ele.date])

    })

    console.log('quest', quest)
    // for(let ele of this.selected_country_datewise)
    // {
    //   datatable.push([ele.cases, ele.date])

    // }

    this.columnChart = {
      chartType: 'ColumnChart',
      dataTable: this.datatable,
      //firstRowIsData: true,
      options: {
        height: 500
      },
    }

    this.lineChart = {
      chartType: 'LineChart',
      dataTable: this.datatable,
      //firstRowIsData: true,
      options: {
        height: 500
      },
    };
    console.log(this.lineChart.dataTable)



  }

}

