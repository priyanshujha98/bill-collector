import React from 'react';
import { Pagination } from 'react-bootstrap';

export const PaginationModule = (props)=>{
    const incrementPageNo = ()=>{
        if(props.pageNo + 1 <=  props.totalCount){
            props.onChange(props.pageNo + 1)
        }
    }

    const decrementPageNo = () => {
        if(props.pageNo-1 >0){
            props.onChange(props.pageNo-1)
        }
    }

    const totalCount = (props.totalCount ? props.totalCount: 0)

    return (
        <Pagination size='sm' sm={1}>
            <Pagination.Item>{props.pageNo}</Pagination.Item>
            &nbsp;&nbsp;<span> of {totalCount} Pages</span>&nbsp;&nbsp;
            <Pagination.Prev onClick={decrementPageNo}/>
            <Pagination.Next onClick={incrementPageNo}/>
        </Pagination>
    )
}