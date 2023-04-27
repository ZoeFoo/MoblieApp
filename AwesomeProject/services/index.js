const getBusStopDetail = async (busStopId) => {
    try {
        const response = await fetch(`https://data.etabus.gov.hk/v1/transport/kmb/stop/${busStopId}`, {
            method: 'GET',
        });
        return await response.json();
    } catch (e) {
        console.log(e)
    }
}

const getBusStopETA = async (busStopId) => {
    try {
        const response = await fetch(`https://data.etabus.gov.hk/v1/transport/kmb/stop-eta/${busStopId}`, {
            method: 'GET',
        });
        return await response.json();
    } catch (e) {
        console.log(e)
    }
}


export default {
    getBusStopDetail,
    getBusStopETA,
}