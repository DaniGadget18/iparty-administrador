import { Component, OnInit } from '@angular/core';
import {ChatService} from '../../../services/chat.services';
import {ApiServices} from '../../../services/api.services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {


  fondo: HTMLElement;
  constructor( public apiservices: ApiServices ) {
    this.fondo = document.getElementById('body');
    this.fondo.style.background = '#f2edf3';
    this.apiservices.obtenerTotalComentarios().subscribe();
    this.apiservices.obtenerReservacionesDia().subscribe();
    this.apiservices.obtenerPromedioRanking().subscribe();
    setTimeout( () => {
      console.log('entro');
      this.apiservices.obtenerComentariosPorRanking().subscribe();
      this.apiservices.obtenerReservaciones7dias().subscribe();
    }, 20);
    this.apiservices.obtenerEventosProximos().subscribe();
  }

  ngOnInit() {
  }

  date: Date = new Date();

  visitSaleChartData = [{
    label: 'CHN',
    data: [20, 40, 15, 35, 25, 50, 30, 20],
    borderWidth: 1,
    fill: false,
  },
    {
      label: 'USA',
      data: [40, 30, 20, 10, 50, 15, 35, 40],
      borderWidth: 1,
      fill: false,
    },
    {
      label: 'UK',
      data: [70, 10, 30, 40, 25, 50, 15, 30],
      borderWidth: 1,
      fill: false,
    }];

  visitSaleChartLabels = ["2013", "2014", "2014", "2015", "2016", "2017"];

  visitSaleChartOptions = {
    responsive: true,
    legend: false,
    scales: {
      yAxes: [{
        ticks: {
          display: true,
          min: 0,
          stepSize: 20,
          max: 80
        },
        gridLines: {
          drawBorder: false,
          color: 'rgba(235,237,242,1)',
          zeroLineColor: 'rgba(235,237,242,1)'
        }
      }],
      xAxes: [{
        gridLines: {
          display:false,
          drawBorder: false,
          color: 'rgba(0,0,0,1)',
          zeroLineColor: 'rgba(235,237,242,1)'
        },
        ticks: {
          padding: 5,
          fontColor: "#9c9fa6",
          autoSkip: true,
        },
        categoryPercentage: 0.4,
        barPercentage: 0.4
      }]
    }
  };

  visitSaleChartColors = [
    {
      backgroundColor: [
        'rgb(255,74,34)',
        'rgb(255,74,34)',
        'rgb(255,74,34)',
        'rgb(255,74,34)',
        'rgb(255,74,34)',
        'rgb(255,74,34)',
      ],
      borderColor: [
        'rgba(154, 85, 255, 1)',
        'rgba(154, 85, 255, 1)',
        'rgba(154, 85, 255, 1)',
        'rgba(154, 85, 255, 1)',
        'rgba(154, 85, 255, 1)',
        'rgba(154, 85, 255, 1)',
      ]
    },
    {
      backgroundColor: [
        'rgba(254, 112, 150, 1)',
        'rgba(254, 112, 150, 1)',
        'rgba(254, 112, 150, 1)',
        'rgba(254, 112, 150, 1)',
        'rgba(254, 112, 150, 1)',
        'rgba(254, 112, 150, 1)',
      ],
      borderColor: [
        'rgba(254, 112, 150, 1)',
        'rgba(254, 112, 150, 1)',
        'rgba(254, 112, 150, 1)',
        'rgba(254, 112, 150, 1)',
        'rgba(254, 112, 150, 1)',
        'rgba(254, 112, 150, 1)',
      ]
    },
    {
      backgroundColor: [
        'rgba(177, 148, 250, 1)',
        'rgba(177, 148, 250, 1)',
        'rgba(177, 148, 250, 1)',
        'rgba(177, 148, 250, 1)',
        'rgba(177, 148, 250, 1)',
        'rgba(177, 148, 250, 1)',
      ],
      borderColor: [
        'rgba(177, 148, 250, 1)',
        'rgba(177, 148, 250, 1)',
        'rgba(177, 148, 250, 1)',
        'rgba(177, 148, 250, 1)',
        'rgba(177, 148, 250, 1)',
        'rgba(177, 148, 250, 1)',
      ]
    },
  ];

  barChartData = [{
    label: 'Comentarios por ranking',
    data: this.apiservices.numeroComentarios,
    borderWidth: 1,
    fill: false
  }];

  barChartLabels = this.apiservices.calificaciones;

  barChartOptions = {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    },
    legend: {
      display: false
    },
    elements: {
      point: {
        radius: 0
      }
    }
  };

  barChartColors = [
    {
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ]
    }
  ];

  areaChartData = [{
    label: '# of Votes',
    data: this.apiservices.reservaciones,
    borderWidth: 1,
    fill: true
  }];

  areaChartLabels = this.apiservices.fechas;

  areaChartOptions = {};

  areaChartColors = [
    {
      borderColor: 'rgba(255,99,132,1)',
      backgroundColor: 'rgba(255,99,132,.2)'
    }
  ];


}
