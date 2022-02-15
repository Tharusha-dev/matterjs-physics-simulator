import {React , useState, useEffect} from 'react';
import BarGraph from './BarGraph';
import GraphProperties from './GraphProperties';



function ChatsMenu({graphSelect,functions,graphingData}) {

    const [isTabOopen, setOopenTab] = useState(1);


    // useEffect(()=>{
        
    // })

    return (

    <div className='graphs-menu'>

        <div className="graphs-tabs-pane">

            <div className="property-tab-button" style = {
                {backgroundColor: isTabOopen == 1 ? 'rgb(80, 79, 79)' : 'rgb(53, 53, 53)', borderBottom : isTabOopen == 1 ? 0 : '2px solid black'}} 
                onClick= {() => {setOopenTab(1);console.log(isTabOopen)}}>Graph</div>

            <div className="property-tab-button" style = {
                {backgroundColor: isTabOopen == 2 ? 'rgb(80, 79, 79)' : 'rgb(53, 53, 53)', borderBottom : isTabOopen == 2 ? 0 : '2px solid black'}} 
                onClick= {() => {setOopenTab(2);console.log(isTabOopen)}}>Graph Properties</div>

        </div>

        <div className="charts-tab">

        {/* <BarGraph  Index={isTabOopen == 2 ? 1 : 0} testP={testS ? 5 : 10}/>
        <GraphProperties Index={isTabOopen == 1 ? 1 : 0}/> */}

    
        {isTabOopen == 1 && <BarGraph functions = {functions} graphingData={graphingData}  /> }
        {isTabOopen == 2 && <GraphProperties graphSelect={graphSelect}/>}

        </div>
        
    </div>

    );
}

export default ChatsMenu;
