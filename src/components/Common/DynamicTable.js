import { Table } from "react-bootstrap"
import { ReactComponent as UpArrowSVG } from "./icons/upArrow.svg"

const DynamicTable = ({
    tableMapper =[],
    sortColumns = [],
    currentlySorted = [],
    onSortClick,
    tableExtraActions=[],
    sortingColumnName = "",
    isLoading=false
})=>{
    const removeHeaders = ['id']
  
    const setupSortingHeaders = (headerInfo)=>{
        return(
            <>
                <span onClick={(event)=>{
                    onSortClick(event, headerInfo)
                }}
                className="pointer noWrap"
                >{headerInfo}</span>

                {headerInfo === sortingColumnName && (
                    <span
                        className="pointer noWrap"
                        onClick={()=>{
                            onSortClick({target: {innerText: headerInfo}}, headerInfo)
                        }}
                    >
                        {currentlySorted !=="" &&
                            (currentlySorted[headerInfo] === true ? (
                                <span className="p-2"><UpArrowSVG className="svg-s15 transition-arrow"/></span>
                            ):(
                                <span className="p-2"><UpArrowSVG className="svg-s15 transform-arrow transition-arrow"></UpArrowSVG></span>
                            ))
                        }
                    </span>
                )}
            </>
        )
    }

    const setupHeaders = (headerInfo) => {
        return sortColumns.includes(headerInfo) ? (<>{setupSortingHeaders(headerInfo)}</>):(<span>{headerInfo}</span>)
    }

    const tableBodyContent = ()=>{
        return (
            <>
                {tableMapper.map((bodyContent, index) => (
                    <tr key={`table-bodies-${index}`}>
                        {Object.keys(bodyContent).map((bodyDetail, colIndex)=> !removeHeaders.includes(bodyDetail) && (
                            <td key={`table-body-${colIndex}`} className="table-wrap">
                                {bodyContent[bodyDetail]}
                            </td>
                        ))}
                        {
                            tableExtraActions.map((action, index)=>(
                                <td
                                onClick={()=>{
                                    action.onClick(bodyContent?.id, bodyContent?.Status?.props?.status)
                                }}
                                key={`table-actions-${index}`}
                                className="tableActions"
                                style={{width:`${Math.floor(100/(tableExtraActions.length?tableExtraActions.length:1))}%`}}
                                >
                                    
                                    {action?.icon}
                                </td>
                            ))
                        }
                    </tr>
                ))}
            </>
        )
    }

    const loadTable = () =>(
        <>
            <Table responsive hover>
                <thead>
                    <tr>
                        {Object.keys(tableMapper[0]).map((headerInfo, index)=>!removeHeaders.includes(headerInfo) && (
                            <th key={`table-header=${index}`}>
                                {setupHeaders(headerInfo)}
                            </th>
                        ))}
                        <th className="table-wrap">
                           
                        </th>
                    </tr>
                </thead>
                
                <tbody>{tableBodyContent()}</tbody>
            </Table>
        </>
    )

    const noDataAvailable = () => (
        <>
            <div className="container content">
                {" "}
                {!isLoading && "No records to show"}
            </div>
        </>
    )
    
    return tableMapper  && tableMapper.length ? loadTable() : noDataAvailable()
   
    
}

export default DynamicTable