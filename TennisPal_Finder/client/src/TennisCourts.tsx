import CourtsMap from './CourtsMap'
import './TennisCourts.css'

const TennisCourts = () => {
  return (
    <div style={{backgroundColor: "#f0f0f0", height: "100vh"}}>
      <h2>Tennis Courts Near You</h2>
      <div className='map-container'>
        <CourtsMap></CourtsMap>
      </div>
    </div>
  )
}

export default TennisCourts
