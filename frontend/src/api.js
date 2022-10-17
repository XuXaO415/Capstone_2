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

    static async getCurrentUser(username, data) {
        let res = await this.request(`users/${username}`, data, "GET");
        return res.user;
    }

    static async login(data) {
        let res = await this.request(`login`, data, "POST");
        return res.token;
    }

    static async signup(data) {
        let res = await this.request(`signup`, data, "POST");
        return res.token;
    }

}

/* ************************************************************* */


// Temporary API token for testing -- CHANGE THIS LATER ONCE EVERYTHING IS WORKING!
UrGuideApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
    "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
    "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";


export default UrGuideApi;