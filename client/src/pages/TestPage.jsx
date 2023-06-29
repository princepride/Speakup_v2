import LoopTypography from '../components/LoopTypography.jsx'

function TestPage() {
  let visible = true;
  let loopBody = ["Loading.","Loading..","Loading...","Loading....","Loading....."];
  let timeInterval = 1000
  return (
    <LoopTypography 
    visible={visible}
    loopBody={loopBody}
    timeInterval = {timeInterval}
  />
  )

}

export default TestPage