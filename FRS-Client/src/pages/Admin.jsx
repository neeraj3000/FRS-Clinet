import Sidebar from "../components/Sidebar";
import Charts from "../components/charst";

function Admin(){
    return(
        <div>
        <h1  style={{ paddingTop: '100px', textAlign: 'center' }}>Student Attendance Charts</h1>
            <Charts />
            <Sidebar/>
        </div>
    )
}
export default Admin;