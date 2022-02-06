class Utils{
    static storeTokenLocal = (data)=> {

        localStorage.setItem('AccessToken',data?.AuthenticationResult?.AccessToken)
        localStorage.setItem("RefreshToken",data?.AuthenticationResult?.RefreshToken)
    }

    static convertDatetime = (data)=>{
        const dateTime = data.split("T")
        let value = new Date(dateTime[0]).toLocaleDateString()
        value = value+ " " + tConvert(dateTime[1].split(".")[0])
        function tConvert (time) {
            // Check correct time format and split into components
            time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
          
            if (time.length > 1) { // If time format correct
              time = time.slice (1);  // Remove full string match value
              time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
              time[0] = +time[0] % 12 || 12; // Adjust hours
            }
        
            return time.join (''); // return adjusted time or original string
          }
          return value
    }
}

export default Utils