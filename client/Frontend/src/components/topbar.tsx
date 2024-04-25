import { FC } from 'react';
import React from 'react';
import * as Icon from 'react-bootstrap-icons';
import '../index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const topbar: React.FC = () => {
    return (
        <div className='row topbar pt-2 pb-3'>
            <strong className='col-2 pt-2 ps-5'>
                <Icon.CcCircleFill className='ml-4 mr-1 ms-2' size={'1.75rem'} />
                <span className='ms-2'>ClarityUI</span>
            </strong>
            <div className='col-7 pl-5 pt-1'>
                <div className='col'>
                    <div className="input-group">
                        <span className="input-group-text">
                            <Icon.Search size={'1.25rem'} />
                        </span>
                        <input type="search" className="form-control" placeholder="Type to search" aria-label="Search" />
                    </div>
                </div>
            </div>
            <div className='col icons pt-1'>
                <Icon.Envelope className='mt-1' size={'1.25rem'} />
                <Icon.Bell className='mt-1' size={'1.25rem'} />
                <Icon.CCircleFill size={'1.5rem'} />
            </div>
        </div>
    );
};

export default topbar;
