import {React , useState , useEffect, useRef} from 'react';
import {Line} from 'react-chartjs-2';
import { saveAs } from 'file-saver';  
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart } from 'react-chartjs-2'


const BarGraph = ({functions,graphingData}) => {


    let [data,setData] = useState([])
    let [time,setTime] = useState([])
    const chartRef = useRef(null)
    const imgRef = useRef(null)
    const [downloadImage,setImage] = useState(false)

    useEffect(() => {
  
        setData(prevArray => [...prevArray,graphingData["data"]])
        setTime(prevArray => [...prevArray,graphingData["time"]])

    },[graphingData])

    const clearGraph = function(){
      setData([])
      setTime([])
    }

    const downloadGraph = function(){
      chartRef.current.canvas.toBlob(function (blob) {
        saveAs(blob, "testing.png")
    })
    setImage(false)
    }

    
    // console.log(chartRef.current.canvas)
  return (

  <div className="bar-graph">


    <Line ref={chartRef}

    data = {{
        labels: time,
        datasets: [{
          label: "Y velocity",
          data: data,
          lineTension: 0.01,
          fill: false,
          borderColor: 'rgb(30, 215, 96)',
          backgroundColor: 'transparent',
          pointBorderColor: 'rgb(30, 215, 96)',
          pointBackgroundColor: 'rgb(30, 215, 96)',

        }]
      }}
      height = {20}
      width = {20}
    options = {{
      animation : {onComplete:function(){const base64Image = chartRef.current.toBase64Image(); downloadImage && downloadGraph()
      }},
        maintainAspectRatio : false
    }}
    
    />

    <div style={{padding:"15px",margin:"auto",display:"flex",alignContent:"space-around"}}>
      <button onClick={()=>{functions["stop"]()}} style={{width:"50%",height:"4.5vh",marginRight:'20px'}}>Play/Stop</button>
      <button onClick={() => {functions["reset"]();clearGraph()}} style={{width:"50%",height:"4.5vh"}}>Reset</button>
      <button onClick={() => {setImage(true)}} style={{width:"50%",height:"4.5vh"}}>Download</button>

    </div>

  </div>
  
  );
}

export default BarGraph;

