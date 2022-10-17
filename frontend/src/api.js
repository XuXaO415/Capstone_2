import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:7001";

class UrGuideApi {
    // store API token here 
    static token;

    /* Template for axios requests. User enters endpoint, data (optional), 
    method (optional), returns axios response data.
    */
    static async request(endpoint, data = {}, method = "GET") {
        console.debug("API Call:", endpoint, data, method);

        const url = `${BASE_URL}/${endpoint}`;
        const headers = {
            Authorization: `Bearer ${UrGuideApi.token}`
        };
        const response = await axios({
            url,
            data,
            method,
            headers
        });
        const params = (method === "GET") ? data : {};
        console.debug("API Response:", response.data, params);

        try {
            return (await axios({
                url,
                method,
                data,
                params,
                headers
            })).data;
        } catch (err) {
            console.error("API Error:", err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    }

    // Individual API calls
    /* ************************************************************* */


    // Temporary API token 

}


export default UrGuideApi;