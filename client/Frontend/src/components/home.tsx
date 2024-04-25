/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import React, { Component, ReactNode } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HC_options from 'highcharts/modules/exporting';
import HC_export from 'highcharts/modules/export-data';
import { Table, Button, Card } from 'antd';
import * as Icon from 'react-bootstrap-icons';
import axios from 'axios';

interface trafficData {
  source: string;
  value: number;
}

interface Customer {
  name: string;
  email: string;
  city: string;
  amount: number;
}

interface State {
  chartOptions: Highcharts.Options;
  recentCustomers: Customer[];
  tableData: any[]; // Adjust this type according to your actual table data structure
}

const trafficData = [
  { source: 'Direct', value: 143382 },
  { source: 'Referral', value: 87974 },
  { source: 'Social Media', value: 45211 },
  { source: 'Twitter', value: 21893 }
];

const maxValue = Math.max(...trafficData.map(item => item.value));


const columns = [
  {
      title: 'State',
      dataIndex: 'state',
      render: (text) => {
          let color;
          if (text === 'Complete') {
              color = 'green';
          } else if (text === 'Canceled') {
              color = 'red';
          } else if (text === 'Pending') {
              color = 'yellow';
          }
          return <span style={{ color }}>{text}</span>;
      },
  },
  {
      title: 'Payment Method',
      dataIndex: 'paymentMethod',
  },
  {
      title: 'Value ($)',
      dataIndex: 'value',
  },
  {
      title: 'Date',
      dataIndex: 'date',
  },
  {
      title: 'Platform',
      dataIndex: 'platform',
  },
  {
      title: '',
      dataIndex: '',
      render: () => <Button type="link">...</Button>,
  },
];



class Home extends Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      chartOptions: this.generateChartOptions('12m'),
      recentCustomers: [],
      tableData: [],
    };
  }

  componentDidMount() {
    HC_options(Highcharts);
    HC_export(Highcharts);
    this.fetchRecentCustomers();
    this.fetchTableData();
  }

  componentDidUpdate() {
    HC_options(Highcharts);
    HC_export(Highcharts);
  }

  fetchRecentCustomers = async () => {
    try {
      const response = await axios.get<Customer[]>('http://localhost:3000/recent-customers');
      this.setState({ recentCustomers: response.data });
    } catch (error) {
      console.error('Error fetching recent customers data:', error);
    }
  };

  fetchTableData = async () => {
    try {
      const response = await axios.get<any[]>('http://localhost:3000/table');
      this.setState({ tableData: response.data });
    } catch (error) {
      console.error('Error fetching table data:', error);
    }
  };

  generateChartOptions = (timeRange: string): Highcharts.Options => {
    let numDataPoints: number;
    let xAxisCategories: string[] = [];
    switch (timeRange) {
      case '6m':
        numDataPoints = 6;
        xAxisCategories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
        break;
      case '30d':
        numDataPoints = 30;
        xAxisCategories = Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`);
        break;
      case '7d':
        numDataPoints = 7;
        xAxisCategories = Array.from({ length: 7 }, (_, i) => `Day ${i + 1}`);
        break;
      case '12m':
      default:
        numDataPoints = 12;
        xAxisCategories = [
          'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
          'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];
        break;
    }

    const fakeSalesData = Array.from({ length: numDataPoints }, (_, i) => {
      const baseSales = Math.sin(i * Math.PI / 6) * 500 + 500;
      const randomNoise = Math.random() * 200 - 100;
      return baseSales + randomNoise;
    });

    const fakeProfitData = Array.from({ length: numDataPoints }, (_, i) => {
      return i * 100 + 500;
    });

    return {
      chart: {
        type: 'line',
        marginLeft: 100
      },
      title: {
        text: 'Sales Report',
        align: 'left',
        x: 100
      },
      xAxis: {
        categories: xAxisCategories,
        title: {
          text: 'Time'
        }
      },
      yAxis: {
        title: {
          text: 'Amount'
        }
      },
      series: [{
         name: 'Sales',
        data: fakeSalesData
      },
       {
        name: 'Total Profit',
        data: fakeProfitData
      }],
      exporting: {
        enabled: true,
        buttons: {
          contextButton: {
            menuItems: ['downloadPDF']
          }
        }
      },
      credits: {
        enabled: false
      }
    };
  }

  handleTimeRangeChange = (timeRange: string) => {
    const newChartOptions = this.generateChartOptions(timeRange);
    this.setState({ chartOptions: newChartOptions });
  }

  render(): ReactNode {
    const { recentCustomers, tableData } = this.state;

    return (
        <div className='Main-Comp'>
        <div className='row'>
            <strong>Hey Mariana - <span className='ml-2 des'>here's what's happening with your store today</span> </strong>
        </div>
        <div className='row first-comp mt-3 col-11'>
            {/* Dashboard cards or other components */}
        </div>
        <div className='row mt-4'>
            <div className='col-8 time'>
                <div className='row justify-content-end mt-2'>
                    <button className='col-2 btn-des' onClick={() => this.handleTimeRangeChange('12m')}>12 Months</button>
                    <button className='col-2 btn-des' onClick={() => this.handleTimeRangeChange('6m')}>6 Months</button>
                    <button className='col-2 btn-des' onClick={() => this.handleTimeRangeChange('30d')}>30 Days</button>
                    <button className='col-2 btn-des' onClick={() => this.handleTimeRangeChange('7d')}>7 Days</button>
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={this.state.chartOptions}
                    />
                </div>
            </div>
            <div className='col-4'>
                <div className="traffic-sources p-3 bg-white rounded shadow-sm">
                <h6 className="font-weight-bold text-uppercase mb-3">Traffic Sources</h6>
<div className="mb-2 text-muted">Last 7 Days</div>
{trafficData.map((data, index) => (
<div key={index} className="mb-3">
  <div className="d-flex justify-content-between mb-1">
    <span>{data.source}</span>
    <span>{data.value.toLocaleString()}</span>
  </div>
  <div className="progress" style={{ height: '20px' }}>
    <div
      className="progress-bar"
      role="progressbar"
      style={{ width: `${(data.value / maxValue) * 100}%`}}
      aria-valuenow={data.value}
      aria-valuemin="0"
      aria-valuemax={maxValue}
    />
  </div>
</div>
))}
                </div>
            </div>
        </div>
        <div className='row mt-4'>
            <div className='col-8 time'>
                <div className='mt-2' style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <h2>Transactions</h2>
                    <div>
                        <Button type="text">See All Transactions
                            <Icon.ChevronRight className='ml-2' size={'1.25rem'} />
                        </Button>
                    </div>
                </div>
                <Table dataSource={tableData} columns={columns} showHeader={false} />
            </div>
            <div className='col-4'>
                <Card title="Recent Customers" bordered={false} className="recent-customers">
                    <p>Lorem ipsum dolor sit ametis.</p>
                    <ul className="list-group">
                        {recentCustomers.map((customer, index) => (
                            <li className="list-group-item" key={index}>
                                <div className="customer-info">
                                    <div className="fw-bold">{customer.name}</div>
                                    {customer.email}
                                </div>
                                <div className="customer-details">
                                    <span>{customer.city}</span>
                                    <span className="badge">{customer.amount}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <a href="#" className="card-link">See all customers</a>
                </Card>
            </div>
        </div>
    </div>
    );
  }
}

export default Home;
