// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';
import * as Icon from 'react-bootstrap-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css'
 class sidemenu extends Component {
  render() {
    return (
      <div className='col-2 sidemenu-design'>
        <div className='btn btn-sm col'>
                <Icon.Plus className=' mt-2 mb-2 mr-3'size={'1.5rem'}/>
                <span className='mr-3'>Connect New Account</span>
        </div>
        <div className='row mt-3'>
                <div className= 'col'>
                <Icon.HouseDoor className='  mt-1 mr-3'size={'1.05rem'}/>
                <span className='ms-1'>Dashboard</span>
                </div>
        </div>
        <div className='row mt-4 heading'>
            ANALYTICS
        </div>
        <div className='row mt-3'>
                <div className='col'>
                <Icon.BarChart className='  mt-1 mr-3'size={'1.05rem'}/>
                <span className='ms-1'>Performance</span>
                </div>
        </div>
        <div className='row jar mt-3'>
                <div className='col'>
                <Icon.Cursor className='  mt-1 mr-3'size={'1.05rem'}/>
                <span className='ms-1'>HotJar</span>
                </div>
                <div className='col new'>
                    NEW
                </div>
        </div>
        <div className='row mt-4 heading'>
            Support
        </div>
        <div className='row mt-3'>
                <div className='col'>
                <Icon.BarChart className='  mt-1 mr-3'size={'1.05rem'}/>
                <span className='ms-1'>Tickets</span>
                </div>
        </div>
        <div className='row mt-3'>
                <div className='col'>
                <Icon.Cursor className='  mt-1 mr-3'size={'1.05rem'}/>
                <span className='ms-1'>Agent</span>
                </div>
        </div>
        <div className='row mt-3'>
                <div className='col'>
                <Icon.PersonPlus className='  mt-1 mr-3'size={'1.05rem'}/>
                <span className='ms-1'>Customer</span>
                </div>
        </div>
        <div className='row mt-4 heading'>
            Shop
        </div>
        <div className='row mt-3'>
                <div className='col'>
                <Icon.FileBarGraph className='  mt-1 mr-3'size={'1.05rem'}/>
                <span className='ms-1 mt-3'>Products</span>
                </div>
        </div>
        <div className='row mt-3'>
        <div className='col'>
                <Icon.Bell className='  mt-1 mr-3'size={'1.05rem'}/>
                <span className='ms-1'>Orders</span>
                </div>
        </div>
        <div className='row mt-3'>
        <div className='col'>
                <Icon.Receipt className='  mt-1 mr-3'size={'1.05rem'}/>
                <span className='ms-1'>Report</span>
                </div>
        </div>
      </div>
    )
  }
}

export default sidemenu
